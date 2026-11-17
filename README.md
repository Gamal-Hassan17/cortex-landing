# Cortex landing page

Black page, Cortex blue and white. React + Vite, no other runtime dependencies.

```bash
npm install
npm run dev        # add ?skipboot to the URL to skip the intro while you work
npm run build
npm run preview
```

## Where things are

| What | Where |
| --- | --- |
| All the text on the page | `src/content.js` |
| Colors, fonts, spacing | top of `src/styles.css` (`:root`) |
| Scroll-driven hardware section | `src/components/Hardware.jsx` |
| Interactive app preview (sample data) | `src/components/AppPreview.jsx` |
| Hero, problem, system, how it works, security, final | `src/components/Sections.jsx` |
| Section order | `src/App.jsx` |

## How the hardware scroll works

The section is 560vh tall and its inner stage is `position: sticky`. While you scroll through it:

1. The four layers (`public/assets/hw/cover.png`, `sensor.png`, `esp.png`, `pcb.png`) are cut out of the exploded render. Each one sits at its original position in a 491 x 721 frame, so fully exploded they line up exactly like the render.
2. A single CSS variable `--e` (0 = assembled, 1 = exploded) is written on every animation frame. Each layer moves by `--d * (1 - --e)`, so they stack into the assembled device or spread apart.
3. The step (device, cover, sensor, ESP32, PCB + USB, back together) comes from the scroll position. The active layer glows, the others dim, and a label points at it.

To change the timing, edit `stepOf`, `explodeAt` and `MID` at the top of `Hardware.jsx`. To change how far each layer drops when assembled, edit `d` in `LAYERS`.

If you later get a real 3D model (GLB), you can swap the layers for a Three.js scene and keep the same scroll logic.

## Notes

- Fonts (Sora, Manrope, JetBrains Mono) load from Google Fonts in `index.html`.
- `og:image` in `index.html` is a relative path. Replace it with a full URL once the site is hosted, or social previews will not show it.
- The app preview uses sample data and says so on the page.

## Hosting on GitHub Pages

The repo includes `.github/workflows/deploy.yml`. Push to `main` and GitHub builds and publishes the site.
One-time setup: repo **Settings > Pages > Source: GitHub Actions**. The site appears at `https://<username>.github.io/<repo-name>/`.
All asset paths are relative (`base: './'` in `vite.config.js` and the `asset()` helper in `src/asset.js`), so it works under a sub-path.
