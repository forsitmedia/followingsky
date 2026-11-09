# Following Sky project instructions

## Read first

- Read `START-HERE.md`, `PROPERTY-WORKFLOW.md`, and `CONTENT-GUIDE.md` before adding or changing listings. These files preserve the user's decisions across chats. Inspect the current files and Git status for the latest state.
- The user's chosen workflow is AI-assisted intake: they send property links, folders, photos, long documents, and YouTube links; the agent extracts and prepares the listing. A property link is enough to begin. Keep this easy for the user. Do not introduce a CMS, admin dashboard, account, or manual entry form unless requested.
- When the user says "add this property" or provides property materials, follow `PROPERTY-WORKFLOW.md` without requiring them to repeat the site's background or fill in a template.

## Site context

- Following Sky is Sharon Portal's property and luxury lifestyle site, at `followingsky.com`. The repository is `forsitmedia/followingsky`; the publication branch is `main`.
- The site uses static HTML with mostly inline CSS/JavaScript, served through GitHub Pages. There is no package build step. New property pages currently need a corresponding card in `properties.html`.
- Preserve the established black/gold design, Cormorant Garamond headings, DM Sans text, navigation, responsive layout, galleries, and enquiry flows. Reuse the established property layout; the source map is in `PROPERTY-WORKFLOW.md`.
- Ivone Machado is the only available artist, appears first in Arts, and is featured on the homepage. Porsche is the only available luxury item. Other artists, watches, design items, and brand collaborations stay non-clickable with "Coming soon" / "Not yet available on the site" until real content is provided.
- Event enquiries are available; event portfolio media is pending. Keep real property videos. Never add dummy video IDs or unrelated clips.

## Property content rules

- Read all relevant source material, including long documents. Use appropriate document-reading skills when needed. Keep source references and a concise working brief in the local property inbox so another chat can continue.
- For a property URL, open and inspect the actual listing, extract its facts and description, and obtain the best accessible property photos from its gallery. Save selected images locally; rewrite the description in Following Sky's style while preserving facts. Follow the link-intake procedure in `PROPERTY-WORKFLOW.md`. Ask for files/screenshots only if particular material cannot be accessed or is insufficient.
- The user supplies their own YouTube Shorts and horizontal tours. Accept Shorts, watch, short-share, and embed URLs. Verify the property/video match, preserve the supplied orientation (usually 9:16 vertical or 16:9 horizontal), and embed responsively. Record each video's ID, source URL, orientation, and verification result in the brief. Omit the section when no video is supplied.
- Extract facts faithfully. Distinguish sale/rental, rental period, indoor/gross/plot areas, and room counts. Do not infer legal status, licences, investment returns, availability, exact addresses, or features from photos or unrelated listings.
- Write original property descriptions in Following Sky's established style. Read existing property descriptions as tone and structure references, then create fresh copy for the new property. Preserve source facts, but do not paste the source description verbatim or reuse another property's narrative.
- Ask a short, bundled question only for facts that materially affect the listing and cannot be resolved from the provided sources. Continue independent preparation while awaiting an answer.
- Retain original source files locally. Copy only selected public images/documents into published paths. `property-inbox/` holds local intake materials and is Git-ignored except for its README.
- Inspect photos, select a sensible cover, order the gallery, and use web-friendly copies with stable filenames. Hero images, gallery thumbnails, and lightbox sources must reference actual files. A listing with real photos must not silently show a generic fallback.
- Omit unsupported optional sections. Long descriptions should be readable paragraphs; documents should appear as public downloads only when intended for publication. Label illustrative photos clearly.
- Keep the listing card, detail page, filter location, metadata, and enquiry name consistent. Preserve existing URLs when updating listings.

## Verification and handoff

- Run `python3 scripts/check-site.py` and `git diff --check` after listing changes. These checks cover local references and unfinished content; use browser QA for layout and remote media.
- Preview with `python3 -m http.server 8765 --bind 127.0.0.1` when needed, reusing an existing server if available.
- Check desktop and mobile, images, gallery/lightbox, optional media, location filtering, and the contact form's property prefill. Do not submit live forms during QA.
- Update the working brief after preparing or publishing a listing; update the source map and content guide when their facts change. Keep these instructions concise and current.
- Honor the session's publication instructions. When push/publication is authorized, complete checks and commit/push the relevant changes without asking again. Describe whether the result is local, pushed, or verified live; a push alone does not verify deployment.
- Preserve unrelated user changes. Check the staged diff before committing, and never include raw inbox materials.
