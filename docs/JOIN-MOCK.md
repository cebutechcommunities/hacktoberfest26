# Participant onboarding mock

Review at `/join`. This is a separate, unlinked prototype route; the public homepage retains its existing event information.

## Review paths

- Enter an email, simulate verification, confirm a name, and complete demo registration. The mock recognizes returning@example.com (case-insensitive, trimmed) as a sample historical match; other addresses get an inclusive welcome with an alternate-email recovery option. There is no newcomer/returning selector.
- A matched email shows explicitly illustrative attendance, registration, and project history. Either mode supports a simulated manual history-merge request.
- Explore October, then bring a new/existing project and create a team; browse/search sample ideas and request to join; or learn first.
- The participant home shows registration, next gathering, a date-hold download, preparation checklist, and team/request state.
- Restart clears the mock. Refresh also clears it. No participant details leave the page and no registration, project, merge request, or email is persisted or sent.

## Separate future work

Historical records will be supplied later. Inventory, consolidation, identity reconciliation, database design, and imports are a separate workstream. Do not infer real attendance or projects from the sample fixtures.

Production implementation also needs email authentication, durable records, manual merge review with ownership evidence, team invitations and approval handling. Competition entry remains separate; its rules and eligibility are unresolved. Venue/time/cost, workshop setup, and dinner access require confirmed organizer information.

The mock assumes join requests require team approval. It does not implement approval, actual invitations, competition entry, or historical-data ingestion.
