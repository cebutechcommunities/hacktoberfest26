# Website first — September 9, 2026

Implement the accepted Open Assembly direction, with clearer tech-event typography and no invented program details. Preserve BRIEF.md and the original mockup.

## First release
- Home and /2026: event identity, introduction, original 2025 photography, the four user-provided October dates, participation, community activity, FAQ, and Cebby links.
- /2025: all four documented 2025 project award winners, both contribution award recipients, organizer credits, and links to the original 2020, 2021, 2023, 2024 project collections. This is not a claim of a complete migration of previous editions.
- Accessible mobile navigation, activity filters, and real ICS calendar downloads. Calendar holds are tentative, with no invented times or locations.
- Read-only public event JSON and OpenAPI documentation generated from the same event records as the website. No attendee records or write APIs.
- Registration and local venue/program details remain unannounced. Do not build fake forms, fake login, fake submission success, or fabricated social activity.

## Implementation
The Sites starter uses React/vinext and a Cloudflare-compatible Worker. Content stays in a small TypeScript module; fonts and photos are local. Keep future registration/authentication integration independent from the public site.

## Verification
Production build, TypeScript/lint checks, and HTTP checks of pages, links, event JSON, calendar headers/content, and unknown routes. Browser preview is opened for the user; automated browser QA has not been requested.

## Sources
- Existing project archive: https://hf.cebutechcommunities.org/projects
- Original photographs: https://hf.cebutechcommunities.org/images/winners/2025/{barangay-konek-team,totoo-ba-ito-team,quiz-attack-team}.jpg
- Global program: https://hacktoberfest.com/ (verified September 9, 2026)
- Community continuity: https://www.getcebby.com/ and https://www.getcebby.com/calendar/
- Cebby logo: unmodified SVG from https://www.getcebby.com/logo.svg, stored locally in `public/images/cebby/logo.svg` with its original proportions and purple fill.

Use CSS framing of original images. Do not regenerate or retouch real attendees. Attribute archival content visibly and keep source links.

## Original source supplied by the user
`/Users/dorelljames/Projects/community/hacktoberfest.jscebu.org` was inspected read-only. The original winner carousel, footer, year routes, and published MDX content verify awards, credits, and archive addresses. No credentials, backups, or private attendee records were accessed. Existing untracked AGENTS.md and __backups/ remain untouched.

Before replacing the original public domain with this site, select a stable origin for the old app and update legacy links. The current links point to the still-existing website; no new archive domain is assumed live.

## Social preview
The built-in image generation tool produced `public/og.png`. The prompt requested a warm ivory/vermillion/moss graphic, sturdy condensed type, an open doorway, the exact headline “MADE IN CEBU. OPEN TO EVERYONE.”, the event name, and the four October dates. Inspected for correct text. No generated people are used.

## Full 2025 community credits
The homepage, /2026, and /2025 share `components/supporter-credits.tsx` and `lib/supporters.ts`: 3 organizers/co-presenters, 7 gold sponsors, 2 silver sponsors, 11 community partners, and 6 additional supporting communities. All 29 named organizations remain visible, each with a link. The organizers use their unchanged original logos on a dark background for their light wordmarks.

The source of record is the union of the old site's rendered `app/components/home-sponsors.tsx`, `app/sponsor/sponsor-content.tsx`, and `app/components/home-partners.tsx`. Aliases (ETHPH, PizzaPy, PHPXCEBU, CEBUXD) are normalized without duplicating organizations. Sponsor tiers follow HomeSponsors. The old footer's unused GitHub partner entry points to JavaScript Cebu's GitHub account, so it is not evidence of separate GitHub sponsorship. The enspace venue mention in the early `docs/2025.md` draft does not appear in the final event/sponsor components and is not presented as confirmed 2025 support.

Links are preserved from the original sponsor source and organizer websites. On September 9, 2026, the legacy domains cebugamedev.org, web3cebu.org, and aicebu.org did not resolve; their links now use the Cebu Game Dev Facebook group, [Web3 Cebu's own LinkedIn profile](https://www.linkedin.com/company/web3cebu), and [AI Generation Cebu's calendar](https://luma.com/ai-generation-cebu). [WordPress Cebu's Meetup group](https://www.meetup.com/wordpresscebu/) supplies the missing WordPress community link. Facebook may require login; no private group content was accessed. React Cebu and GDG Cebu retain their responding official sites. These historical credits do not assert any organization's involvement in 2026.
