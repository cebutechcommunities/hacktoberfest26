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
