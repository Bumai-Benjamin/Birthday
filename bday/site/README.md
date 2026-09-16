# Happy Birthday, Tatiana — Interactive Digital Card

A single-page, no-dependency interactive birthday website. She types her
name to unlock it, opens a wax-sealed envelope, then scrolls freely through
a song, a photo, a message, a flower, and a wish — in any order, any
number of times.

Everything is plain **HTML, CSS, and JavaScript** — no build step, no
frameworks required to run.

## Files

- `index.html` — structure for every section of the card
- `style.css` — theme, layout, and all animations
- `script.js` — the interactive logic (name check, envelope, vinyl player,
  candles, confetti)
- `assets/photo.jpg` — the photo shown in the "Our Moment" section
- `assets/song.mp3` — the song that plays on the vinyl player

## Personalizing it

- **Name check**: the unlock word is set in `script.js`, in `checkName()`
  (`name === 'tatiana'`).
- **Letter & message**: edit the text inside `#screen-envelope` and the
  "little note" section in `index.html`.
- **Photo**: replace `assets/photo.jpg` with your own image (same
  filename, or update the `src` in `index.html`).
- **Song**: replace `assets/song.mp3` with your own track (same filename,
  or update the `src` on the `<audio>` tag), and the `track-title` /
  `track-artist` text in the vinyl section.
- **Colors**: the whole palette is defined as CSS variables at the top of
  `style.css` under `:root`.

## Running it locally

Open `index.html` directly in a browser, or use the VS Code "Live Server"
extension for live-reload while editing.

## Publishing it for free

This is a fully static site, so you can host it for free with:

- **GitHub Pages** — enable Pages on this repo (Settings → Pages → deploy
  from branch).
- **Netlify** — drag-and-drop the project folder onto
  [Netlify Drop](https://app.netlify.com/drop) for an instant live URL.
- **Vercel** — `vercel deploy` from the project folder.
