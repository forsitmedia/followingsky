# Content and image updates

The property collection contains seven listings, including The Green House in Vila Utopia. See `PROPERTY-WORKFLOW.md` for the current page map and the local working briefs for source and publication details. Ivone Machado and the Porsche 911 Carrera are the available art and luxury collections. Event enquiries remain available; event films and original event photography are coming soon.

Sofia Mendes, Léna Duvivier, Collector Watch, Rare Design Piece, and the three brand collaborations are previews. Their cards have no links or enquiry buttons and show **Coming soon — Not yet available on the site**. Existing unfinished detail URLs display the same status. Previous draft layouts remain available in Git history.

## Replace preview images

Temporary photos are stored in `assets/images/placeholders/`. Replace a file with your real JPG using the same filename to update all of its appearances together. Keep reasonably sized files, ideally 1200–1600 pixels wide. Preview photos are illustrative and are not photographs of an available product or an artist’s own work.

| File | Used for |
| --- | --- |
| `porsche-911.jpg` | Porsche card, detail page, homepage luxury tile |
| `collector-watch.jpg` | Upcoming watch selection |
| `design-piece.jpg` | Upcoming design selection |
| `artist-sofia.jpg` | Upcoming Sofia profile |
| `artist-lena.jpg` | Upcoming Léna profile |
| `gourmet.jpg` | Upcoming caviar collaboration |
| `chocolate.jpg` | Upcoming chocolate collaboration and homepage brand tile |
| `candles.jpg` | Upcoming candle collaboration |
| `image-unavailable.svg` | Automatic fallback if any site image fails to load |

The homepage poster, `assets/images/hero-poster.jpg`, is a frame from the existing `video/houses.mp4`. Riverfront Duplex’s hero uses its real photo `9.jpg` in place of the missing `7.jpg`.

## Publish a collection when ready

1. Add the real content and photographs to its detail page.
2. Replace the static availability message with a real detail link on its listing card.
3. Remove `is-unavailable` from the card and remove any preview labels once the images are real.
4. Remove `noindex` from the detail page when it is ready to appear in search.
5. Add a video player only when a real, working video is available.

Artist cards are in `arts.html`; luxury cards are in `luxury-assets.html`; brand cards are in `collaborations.html`; homepage features are in `index.html`. Shared availability styles are in `assets/css/site-status.css`. The fallback handler in `assets/js/image-fallbacks.js` also supports an optional `data-fallback="path/to/photo.jpg"` on individual images.

## Preview photo sources

These Unsplash photos are stored locally so the preview cards do not depend on external image links.

| File | Source |
| --- | --- |
| `porsche-911.jpg` | [Melvin Bertelkamp / Unsplash](https://unsplash.com/photos/yySiLnj2BJs) |
| `collector-watch.jpg` | [Unsplash photo](https://images.unsplash.com/photo-1523170335258-f5ed11844a49) |
| `design-piece.jpg` | [Unsplash photo](https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0) |
| `artist-sofia.jpg` | [Unsplash photo](https://images.unsplash.com/photo-1578301978162-7aae4d755744) |
| `artist-lena.jpg` | [Unsplash photo](https://images.unsplash.com/photo-1513364776144-60967b0f800f) |
| `gourmet.jpg` | [Unsplash photo](https://images.unsplash.com/photo-1414235077428-338989a2e8c0) |
| `chocolate.jpg` | [Unsplash photo](https://images.unsplash.com/photo-1549007994-cb92caebd54b) |
| `candles.jpg` | [Unsplash photo](https://images.unsplash.com/photo-1603006905003-be475563bc59) |
