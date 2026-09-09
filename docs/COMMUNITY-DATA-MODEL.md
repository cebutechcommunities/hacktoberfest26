# Community history, profiles, and discussion

Proposed direction, September 9, 2026. This is a source-code inventory and design outline, not an executed data migration. The live website still has no participant registration or discussion backend.

## Participant experience

Someone registers for this year's event, verifies their identity, and sees the historical records we can reliably associate with them. They can correct information, add a project update, preview a public profile, and choose what to publish. Registration finishes independently of those optional steps.

The public wall collects questions, project updates, and requests for collaborators associated with an edition or project. A published project update can appear on its project page, its author's profile, and the edition wall using the same underlying post. Private registration feedback remains private unless the author explicitly publishes it.

## Source inventory

Inspected source checkout: `/Users/dorelljames/Projects/community/hacktoberfest.jscebu.org`. No credentials, live participant records, Redis exports, or backups were accessed for this inventory.

| Source | Observed structure | Migration implication |
| --- | --- | --- |
| `content/projects/{year}/*.mdx` and `contentlayer.config.js:19` | Project documents with title, description, optional date, repository, URL, image, publication flag, and body | Preserve the year, original path, publication state, and content. The schema alone does not establish a person's ownership or attendance. |
| `app/api/submit-project/route.ts:74` | Redis `submission:{id}` objects, review lists, contact email, authenticated submitter email, team members, submission time, and hard-coded year 2025 | Keep submitter, contact, and credited team members distinct. Preserve pending/approved/rejected status. |
| `app/api/submit-contribution/route.ts:54` | Redis `contribution:{id}` objects, PR and project URLs, contribution type, description, contact and submitter emails, review status, year, and points | Preserve evidence and review state. A submitted contribution is not automatically verified, merged, or proof of attendance. |
| `app/api/submit-volunteer/route.ts:48` | Redis `volunteer:{id}` applications with contact information, requested role, skills, availability, motivation, review status, and year | Keep applications private. An application or approval alone does not establish completed volunteer service. |
| `app/components/home-registration.tsx:27` | Instructions to register with the global Hacktoberfest program and create a OneCebby account | A login account is not evidence of registration for a local event or attendance. |

The checkout contains 9 project files for 2020, 8 for 2021, 15 for 2023, 10 for 2024, and 2 for 2025. These are file counts, not published-project or participant totals; the 2025 files include a placeholder. No 2022 project directory was found. These gaps must not be interpreted as years without activity.

Outstanding inventory question: where are registration and check-in records for each edition held, and what does each source actually verify? Identity-provider exports, event-platform exports, and organizer spreadsheets need separate classification when available.

## Model boundaries

Use stable internal IDs. Email is a private identity attribute and matching signal, not the primary key or public profile address. Keep the API in one small deployment initially; this model does not require a service per capability.

| Records | Responsibility |
| --- | --- |
| Person, login identity, verified email, historical-record claim | Separate a participant from their authentication provider. Retain evidence and review state for identity links. |
| Public profile | Participant-controlled name, introduction, links, selected work, and visible history. Importing an account does not publish a profile. |
| Organization and organizer membership | Own events and restrict organizer access to the records they are responsible for. Cross-organization access is not implied by a shared person ID. |
| Event series, yearly edition, gathering | Represent Hacktoberfest Cebu, its 2026 edition, and individual October sessions separately. Count distinct editions when describing return participation. |
| Interest signup, registration, check-in | Preserve distinct facts and their source. Neither interest nor registration automatically becomes attendance. |
| Edition response | Store what someone wants from this year's event separately from their lasting profile. |
| Project and edition submission | A project can continue across years, while each edition keeps its original submitted description, team, and review outcome. Repository URLs alone are not universal identity keys. |
| Team, edition membership, contribution credit | Keep historical names/roles as recorded; distinguish proposed, confirmed, and disputed associations. Current maintenance membership does not rewrite earlier credits. |
| Contribution, award, volunteer application, recorded service | Preserve these as distinct records with evidence, dates, and visibility. Avoid replacing them with a single activity score. |
| Post, comment, moderation action | Associate a discussion with its organization, edition, and optionally project. Store author, original publication date, visibility, and moderation state. |
| Import batch, source record, source-to-target mapping | Track origin, source identifiers, original dates, checksum, interpretation, unresolved relationships, and import outcome. |

## Recognizing returning participants

1. Verify the current login identity and email before returning private historical information. The unauthenticated signup screen must not reveal whether an address appears in the archive.
2. Use a trusted provider subject or existing reliable account linkage where available. Treat unverified form emails and team-member mentions as candidate associations, not account ownership.
3. For trusted historical registrations, apply documented matching rules. Preserve conflicting or ambiguous matches for review. Do not merge people by name, or globally strip email dots or plus suffixes.
4. Let someone verify another address or request review to link earlier records. Current control of a recycled school/work address does not by itself resolve conflicting historical ownership.
5. Show a private preview containing the person's own information and appropriate public project details. Never reveal other team members' private contact information or organizers' internal notes through this preview.
6. Let the person confirm current details and explicitly select what goes public. Public data endpoints return approved public fields only, without private fields hidden merely by the frontend.

Use wording that the evidence supports: registered, checked in, submitted, verified contributor, or documented volunteer. Imported histories keep their original dates and display gaps honestly.

## Wall scope and maintenance

Start with edition questions, project updates, requests for help, and simple comment threads. Verified accounts can participate without publishing their entire personal profile. Each public post needs a participant-chosen public author identity.

The initial feature needs edit/delete controls, reporting, organizer hide/restore controls, basic posting limits, safe rendering, and an identifiable moderator for each enabled community. Public comments create an ongoing moderation responsibility even if infrastructure is managed.

An imported project can retain its historical public page without appearing as a new post today. Timeline and wall views should reuse source records and respect publication/moderation changes consistently. A registration response is not automatically a wall post.

## Migration sequence

1. Inventory every source and edition. Record coverage, identifiers, relationships, review states, visibility, and known uncertainties. Keep protected source exports outside Git and public assets.
2. Preserve source snapshots and create deterministic mappings into the new model. Keep unmappable fields in a protected source record or document why they are excluded; do not discard them silently.
3. Run imports into a separate local/staging database. Re-running the same batch must not create duplicates. A later import must not silently overwrite participant corrections or current project updates.
4. Reconcile source and target counts by edition, type, and status; inspect missing references, conflicts, and representative histories. Test identity separation, public-field filtering, historical team preservation, reruns, and corrections before cutover.
5. Pilot with 2025 records and 2026 signup/profile claiming. Extend to older editions after establishing their source coverage; earlier records remain eligible for import later.
6. Before production cutover, take a final source snapshot or reconcile changes made since the initial export. Assign one writer to each migrated feature, verify rollback and export paths, preserve old public URLs or provide redirects, and document the cutover.
7. Launch the wall once profile claiming, author identity, publication rules, and moderation are usable. Payments can be a later module tied to registration; they are not a prerequisite for the history migration.

The first reviewable implementation should prove one path: verify identity → recognize a prior participant → finish this year's signup → preview historical work → optionally publish a profile and one project update.

## Reference

[OWASP authentication guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) covers verified email use, identity identifiers, and generic authentication responses that do not disclose account existence.
