# Participant follow-ups — proposal for review

Purpose: help registered people prepare, find collaborators, and keep contributing without repeating onboarding. Email links return to the relevant project, request, gathering, or participant home. If authentication expires, verify the email and resume that destination; do not register them again.

This document specifies future behavior. The prototype only previews messages; it does not send, schedule, or store emails.

## Messages and triggers

| Message | Recipient and actual trigger | Proposed timing | Useful next action |
| --- | --- | --- | --- |
| You’re part of Hacktoberfest Cebu 2026 | Participant after registration is durably completed | Once immediately | Open October home; review dates and preparation |
| Your request is pending | Participant after a join request is recorded | Once per request | View or cancel the request; keep exploring |
| Someone wants to join your team | Organizer after a participant requests their team | Promptly; combine bursts for the same team | Review the introduction and accept/decline |
| You’ve joined the team | Requesting participant only after organizer acceptance | Once per acceptance | Open team and agree on a first contribution |
| An update on your team request | Requesting participant after a decline or team closure | Once, with neutral wording and approved explanation | Explore other open teams |
| A request needs your attention | Team organizer when a request remains pending | One reminder after 48 hours; organizer follow-up if still unanswered after five days | Respond to request; no invented acceptance |
| New ideas to explore this week | Subscribers when new published projects exist since their previous digest | One weekly edition; skip empty editions | Browse new ideas; state what help teams welcome |
| A team you might like to meet | Subscribers when an open team fits interests they explicitly supplied | At most weekly; combine with the digest when both apply | Inspect the match and choose whether to request |
| Getting ready for the next gathering | Participants who selected that gathering and enabled preparation emails | About three days before, once details are confirmed | Venue/time, accessibility, what to bring/install, costs and support |
| Plans changed for your gathering | Affected participants after an organizer publishes a material change | Promptly, even if optional digest/reminders are off | Read the confirmed change; update calendar |
| Keep building after the workshop | Attendees when the organizer publishes real resources; appropriate registered participants may receive a separately worded recap | Once within two days after resources are ready | Slides, repositories, exercises, next checkpoint |
| Ready for your next checkpoint? | Project organizers who explicitly entered the competition and have a real deadline | One reminder before that deadline; only if not already submitted | Submit the required update |
| Your past participation was reviewed | History-merge requester after a human decision | Once per decision | See merged records or the concrete next step needed |
| Your October, together | Participants after verified event outcomes and resources are available | One closing message | Their recorded contributions, published projects, resources, and continued Cebu community involvement |

## Truthful wording

- “We found a team you might like” means a suggestion, with a concrete reason and an invitation to inspect it. It does not mean the participant has joined.
- “You’ve joined the team” requires an accepted membership. A pending request is not membership.
- Participants can contribute to multiple projects. Suggestions do not stop solely because they joined one; preferences and recent responses should control them.
- Do not call someone a beginner from their registration history. Do not claim attendance from a registration record.
- “New this week” means projects first published during the stated time window, not edits, archived entries, or an arbitrary sample.
- Only send checkpoint/competition messages to actual entrants. Do not treat project creation as competition entry.
- If a merge needs more ownership evidence, say so without disclosing another email’s records.

## Preference and frequency proposal

Separate essential registration/account/review communications and material gathering changes from optional team emails, preparation/resources, weekly discovery, and suggested introductions. Show these choices during registration or on the participant home. Weekly discovery and suggestions start off in the mock and require opt-in.

Team activity must remain visible in the product if a participant turns off email. Optional emails need category-specific unsubscribe and a way to stop all optional follow-ups. No optional subscription should be restored merely because a person starts another project.

Combine discovery and suggestions into one weekly email when both are enabled. Prefer one useful event-preparation message over a daily countdown. Do not send repeated “you haven’t picked a team” nudges to people who chose to learn first. Do not send empty digests. Organizer reminders should be bounded and have a human escalation path.

## Future delivery requirements

Use recorded state changes to queue recipient-specific messages. Deduplicate by recipient, message type, and the actual event/request/membership/change revision; retries must not produce duplicates. Recheck preferences, team status, project visibility, and gathering facts before sending. Cancel obsolete pending-request reminders after acceptance, decline, or withdrawal. Track provider delivery outcomes separately from queued/sent status.

Deep links should preserve destination through sign-in and require authorization before showing participant data. Do not put email addresses or history into URLs. Recipients should see only the information needed to act; do not distribute attendee lists.

Before implementation, decide gathering selection/RSVP behavior, capture optional contribution interests, establish team organizer response responsibility, and confirm the program facts and competition rules. Historical-data ingestion remains a separate workstream.
