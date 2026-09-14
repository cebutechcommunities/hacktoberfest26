# Participant onboarding mock

Review at `/join`. This is a separate, unlinked prototype route; the public homepage retains its existing event information.

## Experience

Registration happens once: enter email, simulate verification, confirm name, meet October, open participant home. The mock recognizes returning@example.com (case-insensitive, trimmed) as sample historical participation. Other addresses get an inclusive welcome and alternate-email recovery; no newcomer/returning selector.

Once registered, persistent navigation leads to My October, Explore projects & teams, Start a project, Gatherings & preparation, and Updates & email preferences. These are ongoing activities, not mutually exclusive onboarding paths. Learning is always welcome without a team.

Creating a project appends a new project and team. Participants can organize several projects, request several other teams, and join several teams after approval. Their existing work is retained. Created projects also appear in the demo directory. Duplicate requests are disabled. Only pending requests can be cancelled; cancelling one preserves all other projects and memberships.

“Simulate team approval” on My October turns one pending request into a membership. This is a demo control, not participant authority in the real product. The corresponding email preview changes from request receipt to acceptance only after this transition.

Updates offers team updates and preparation reminders, plus optional weekly project discovery and team suggestions. Previews respond to demo projects, requests, approvals, history-review requests, and preferences. Every preview is explicitly unsent; hypothetical owner requests, weekly additions, suggestions, and scheduling are labelled as sample scenarios. Email buttons return to the relevant mock view without registering again.

## Review sequence

1. Register, then start project A and project B from My October.
2. Browse teams and request Sakay and Pulong without leaving the directory.
3. Return home: both projects and both requests should remain.
4. Simulate approval for Sakay and cancel Pulong. Sakay membership and both projects remain.
5. Open Updates, preview the acceptance email, enable the weekly digest, and follow its project link. No registration repeats.
6. Restart clears everything. Refresh also clears the mock. No participant details leave the page and no registration, project, request, preference, or email is persisted or sent.

Validation: `node --experimental-strip-types --test tests/join-participation.test.mjs` covers accumulated contributions, independent approval/cancellation, duplicate/invalid requests, and reset. `npm test` runs both these tests and the existing site checks.

## Separate future work

Historical records will be supplied later. Inventory, consolidation, identity reconciliation, database design, and imports are a separate workstream. Do not infer real attendance or projects from sample fixtures.

Production needs email authentication, durable records, manual history review with ownership evidence, team invitations and organizer approval handling. Team departure, project editing/archival, organizer handover, and multiple competition entries need rules. Competition entry remains separate from general participation. Venue/time/cost, workshop setup, and dinner access require confirmed organizer information.

See `PARTICIPANT-FOLLOW-UPS.md` for the proposed email plan. No email integration or scheduler is included.
