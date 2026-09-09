# Hacktoberfest Cebu 2026

The Open Assembly website: 2026 event dates, real Cebu community work, and a permanent 2025 highlights page with links to older editions.

## Local development

Requires Node 22.13+.

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run check
npm run lint
npm run build
npm test
```

The tests exercise the built Worker: public pages, archive credits, read-only event data, valid calendar holds, invalid dates, write rejection, and 404s. They require a successful build first.

## Content

- `lib/content.ts`: event dates, status, project highlights, community contributions, FAQ.
- `app/page.tsx`: the homepage (also available at `/2026`).
- `app/2025/page.tsx`: archival highlights and links to 2020, 2021, 2023, and 2024.
- `app/globals.css`: responsive design, local fonts, reduced-motion support.
- `public/images/2025`: original photos, visually framed with CSS.
- `/calendar.ics`: download all four tentative dates. `?date=2026-10-03` selects one.
- `/api/v1/events` and `/openapi.json`: public, read-only event information.

Registration, login, and social submission services are not connected. No attendee data is collected. Calendar downloads explicitly do not reserve a place. Current community updates are labelled 2025 archive and link to their real source.

## History and deployment

Original source: `/Users/dorelljames/Projects/community/hacktoberfest.jscebu.org`. Only public content and original media were reused; that checkout was not edited.

The Sites starter uses React/vinext and produces Cloudflare-compatible output. No D1, R2, identity provider, paid image service, or event-management backend is required for this first website.

Before pointing the existing event domain at this build, give the old app a permanent archive origin and update its links. No domain cutover is part of this build.

See `BRIEF.md` for the original direction and `IMPLEMENTATION.md` for scope, attribution, and follow-up boundaries. The original concept is in `mockups/`.

## Cloudflare Pages

Live site: https://hf26.cebutechcommunities.org

The original Pages address also works: https://hacktoberfest-cebu-2026.pages.dev

The custom domain is attached to the `hacktoberfest-cebu-2026` Pages project. Its proxied CNAME record is `hf26` → `hacktoberfest-cebu-2026.pages.dev` in the `cebutechcommunities.org` zone. The separate `hf.cebutechcommunities.org` archive keeps its existing destination.

The Pages configuration is in `cloudflare/pages/wrangler.jsonc`. It is separate from Vite's development Worker configuration and the existing Sites preview.

```sh
npm run check
npm run lint
npm run pages:build
npm test
npm run pages:dev
```

Once Wrangler is authenticated to the configured Cloudflare account, deploy the prepared build:

```sh
npm run pages:deploy
```

This is a direct-upload Pages project with production branch `main`. Each update requires building and deploying again; there is no automatic Git deployment. Credentials stay in Wrangler's local login or the `CLOUDFLARE_API_TOKEN` environment variable, never in the build or repository.

`scripts/prepare-pages.mjs` packages the built application into `dist/pages`: public assets at the root and a bundled server in Pages' `_worker.js`. Pages Functions serve the app routes, event API, and calendar downloads. `_routes.json` lets static assets bypass Functions. No database or other service binding is needed.

Bundling the complete server first preserves Vite's references between its server and SSR modules. Pages uses the same compatibility date as the existing vinext build. The preparation script also creates a local Pages configuration pointer so Wrangler does not pick up Vite's separate Worker deployment configuration.

References: [Pages advanced mode](https://developers.cloudflare.com/pages/functions/advanced-mode/), [direct upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), and [Function routing](https://developers.cloudflare.com/pages/functions/routing/).
