# Turn the home page into the 2026 recap

Plan for [#5](https://github.com/cebutechcommunities/hacktoberfest26/issues/5). Status: awaiting lead approval and source material. This phase changes documentation only. No 2026 photos, results, gathering accounts or supporter claims have been supplied or filled in.

## Decisions for a lead

1. Which photo set can you provide for publication?
   - **A)** Five original 2026 photos: one hero and one from each of the four gatherings (recommended).
   - **B)** Nine original 2026 photos: one hero and two from each gathering.
   For every photo, provide the file or a downloadable original, its placement/date, a factual caption, the photographer's exact visible credit and a source/credit link if available. Confirm permission to publish. Alt text will describe only the supplied photo and caption. No generated or retouched attendees, stock substitutes or reused 2025 photos.
2. How should the four gathering accounts be presented?
   - **A)** Keep each existing gathering title with one lead-written sentence about what actually happened (recommended).
   - **B)** Provide a corrected title with that sentence for each gathering.
   Supply all four sentences, keyed to **October 3, 10, 18 and 25, 2026**. Existing titles are Opening Ceremony; Meetup: Open Source AI Models & Harnesses; Meetup: Deployment Day; Awarding Ceremony & VIP Dinner. Planned program text is not evidence of what happened. Do not supply attendance numbers, venues or outcomes unless confirmed and intended for publication.
3. How should the winning projects be ordered?
   - **A)** In the lead's official award/presentation order (recommended).
   - **B)** Alphabetically by project name, without implying a ranking.
   Supply the complete 2026 winner list: **project name, team name or credited members, exact award name(s), and repository URL for every winner**. Mark the list complete and give its official order for A. No count, award category, team or project is assumed from 2025. Winner photos are not required in addition to the selected photo set.
4. How should confirmed 2026 supporters be credited?
   - **A)** By their confirmed roles/tiers, in the lead's supplied order (recommended).
   - **B)** In one alphabetical list without tiers.
   Supply the complete 2026 organizer/supporter names, public links, roles/tiers for A, and the exact names or groups to thank. Text credits suffice; no new logo assets are required. The existing 2025 credits cannot establish 2026 involvement.

Reply on #5 with picks such as `1A 2A 3A 4A` **and the requested source material**, then return the card to Todo. Returning it without picks accepts the recommended presentation choices; it does not supply missing facts. Build only when the complete source package is available from a lead (`OWNER`, `MEMBER` or `COLLABORATOR`). If material is missing, record the specific content blocker and hand off without populating a partial or fabricated recap.

## What changes

- Make `/` and its `/2026` alias a past-tense 2026 story: hero, gathering record, photo gallery, winning projects, supporters and thanks, using the editorial structure of `/2025`.
- Preserve October 3, 10, 18 and 25 with one factual lead-provided account each; remove attendance FAQ, Register links, calendar downloads, participation invitations and sign-up prompts from both recap routes and their chrome.
- Show only supplied 2026 photographs with visible credits beside each image, and winners with team, award and repository links. Keep 2025 content separate and unchanged.
- Finish with the existing Cebu Tech Communities Facebook link for future updates and a `/2025` archive link; add no form or 2027 dates, program or promises.
- Keep warm paper, near-black, vermilion and moss, readable typography and real photos; support mobile layouts, keyboards and reduced motion without new dependencies.

## Tasks

1. **Write recap regression checks first.** Files: `tests/site.test.mjs` and, if useful for a stable archive comparison, a fixture under `tests/fixtures/`. Replace homepage promotional expectations with assertions for both aliases: four dated records and supplied summaries, the exact supplied winner set with teams/awards/repos, the supplied photo set with visible credits, valid section links, no registration/calendar/sign-up/attending FAQ, and the stay-in-touch and `/2025` links. Capture the current `/2025` content, navigation, metadata and credit/link records before implementation, then verify they remain unchanged; retain API, calendar, join and other existing coverage. Proof: the new recap assertions fail against the current build while existing out-of-scope checks pass.
2. **Add the supplied 2026 records without changing shared event data.** Files: `lib/content.ts`, `lib/supporters.ts`, `public/images/2026/*`. Add separate recap records keyed to the existing gathering IDs/dates, photo paths/captions/credits/source links, winners and confirmed supporters. Record the lead source in comments. Leave `gatherings`, 2025 projects/activities and all 2025 supporter exports intact, so API/calendar/archival consumers keep their data. No empty public sections or sample winners/photos. Proof: route assertions match the complete approved source package and existing API/calendar tests still pass.
3. **Compose the recap and its scoped presentation.** Files: `app/page.tsx`, `components/site-chrome.tsx`, new `components/recap-photo.tsx` and `components/recap-supporters.tsx`, `app/globals.css`; keep `app/2026/page.tsx` as its existing re-export. Add opt-in recap Header/Footer navigation, leaving their default/archive rendering unchanged. Use recap-scoped styles, stable `#oct-03`, `#oct-10`, `#oct-18`, `#oct-25` anchors, the supplied images with adjacent visible credit text/source links, winner details, supporters and thanks. Preserve incoming archive navigation anchors: `#october` for gatherings, `#story` for winners, `#community` for supporters and `#participate` for staying in touch. Remove the old homepage participation, archive-photo/project teasers, community board and attending FAQ. Proof: both routes render the same recap, `/2025` comparison passes, and browser checks at 375px and desktop show legible credits, keyboard-accessible links, no overflow and appropriate reduced-motion behavior.
4. **Align homepage search and social text with the recap.** Files: `lib/seo.ts`, `app/page.tsx`, `tests/site.test.mjs`. Give the home page explicit recap metadata, social image/alt from the supplied hero, and structured data describing the completed edition using only approved facts. Remove promotional registration wording from its metadata and JSON-LD; retain canonical `/` for both aliases and the four historical dates. Keep root-layout defaults and `/2025` metadata behavior intact to avoid changes to unrelated pages. Proof: HTTP tests inspect rendered title/description, Open Graph/Twitter tags, canonical aliases and JSON-LD, and preserve existing `/2025` expectations.
5. **Verify and document the completed change.** Files: `README.md`, this plan, and ignored `.symphony/*` handoff files. Update the content map for the recap and record the lead's decisions/source references before building. Run `npm run check`, `npm run lint`, `npm run build`, then `npm test`; review `git diff origin/main` and untracked files, including confirmation that `/2025`, `/join`, the events API and calendar implementation have no changes. Proof: all four commands pass, scoped browser checks pass, and the workpad records the evidence. Prepare the host's build handoff; do not commit, push or deploy.

Plan-phase validation uses the same four required commands against the unchanged site. A passing baseline is not evidence that the recap has been built.
