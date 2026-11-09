#!/usr/bin/env python3
"""Check Following Sky's local resources and incomplete content without dependencies."""

import argparse
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

VOID_TAGS = {
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr',
}
PLACEHOLDER_MEDIA = re.compile(r'VIDEO_ID_HERE|YOUR_VIDEO_ID|VIDEO_ID_PLACEHOLDER', re.I)
CSS_URL = re.compile(r'url\(\s*[\'"]?([^\'"\s)]+)', re.I)


class SitePage(HTMLParser):
    def __init__(self, page, root, issues):
        super().__init__(convert_charrefs=True)
        self.page = page
        self.root = root
        self.issues = issues
        self.stack = []
        self.references = 0

    def report(self, message):
        self.issues.append(f'{self.page.relative_to(self.root)}:{self.getpos()[0]}: {message}')

    def check_reference(self, value):
        if not value or value.startswith('#'):
            return
        if PLACEHOLDER_MEDIA.search(value):
            self.report(f'Placeholder media URL: {value}')
        try:
            parsed = urlsplit(value)
        except ValueError:
            self.report(f'Invalid URL: {value}')
            return
        if parsed.scheme or parsed.netloc or not parsed.path:
            return
        path = unquote(parsed.path)
        target = (self.root / path.lstrip('/') if path.startswith('/') else self.page.parent / path).resolve()
        self.references += 1
        if not target.is_relative_to(self.root):
            self.report(f'Reference outside the website: {value}')
        elif not target.is_file():
            self.report(f'Missing local file: {value}')
        elif target.stat().st_size == 0:
            self.report(f'Empty local file: {value}')

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        unavailable = 'is-unavailable' in attributes.get('class', '').split()
        inside_unavailable = unavailable or any(state for _, state in self.stack)
        if inside_unavailable and (
            (tag == 'a' and attributes.get('href'))
            or (tag in {'button', 'input', 'select', 'textarea'} and 'disabled' not in attributes)
            or 'onclick' in attributes
        ):
            self.report('Interactive content inside an unavailable preview')
        for name in ('src', 'poster', 'data-src', 'href'):
            self.check_reference(attributes.get(name, ''))
        for match in CSS_URL.finditer(attributes.get('style', '')):
            self.check_reference(match.group(1))
        if tag not in VOID_TAGS:
            self.stack.append((tag, unavailable))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        if self.stack and self.stack[-1][0] == 'style':
            for match in CSS_URL.finditer(data):
                self.check_reference(match.group(1))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    root = args.root.resolve()
    pages = sorted(root.glob('*.html'))
    if not pages:
        print(f'No HTML pages found in {root}', file=sys.stderr)
        return 1
    issues = []
    references = 0
    for page in pages:
        checker = SitePage(page, root, issues)
        checker.feed(page.read_text(encoding='utf-8'))
        references += checker.references
    if issues:
        print('\n'.join(issues), file=sys.stderr)
        print(f'FAILED: {len(issues)} issue(s) across {len(pages)} pages.', file=sys.stderr)
        return 1
    print(f'PASS: {len(pages)} pages; {references} local references; no missing/empty files, placeholder video IDs, or interactive unavailable previews.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
