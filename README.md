# Markview — Developer Portfolio (Dark)

A complete, responsive portfolio at `/`, built with Next.js 16 App Router, React Server Components, TypeScript, and plain CSS. No remote fonts, images, or icon services. No existing framework needed to be retained or substituted.

## Run

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` then `npm start`.

## Verify

```sh
npm run typecheck
npm run lint
npx playwright install chromium
npm run build
npm start
# In another terminal, against the running production server:
npm run verify
```

The verification script checks the ticket's ten acceptance items and saves desktop/mobile screenshots in `artifacts/`. Set `BASE_URL` to test another server; pass a checklist id to verify one item.

## Personalize

The Alex Morgan biography, location, projects, and measurements are fictional demonstration copy, not claims about the repository owner. `alex@example.com` is a reserved example address. Replace those facts and the two mailto links in `app/page.tsx`, plus the metadata in `app/layout.tsx`, before using this as a personal portfolio. All layout and palette tokens live in `app/globals.css`.

The low-contrast `//` markers are decorative and hidden from assistive technology; actual heading text meets AA. Motion is limited to link and button states and removed for reduced-motion preferences.
