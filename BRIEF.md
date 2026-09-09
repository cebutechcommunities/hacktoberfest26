# Hacktoberfest Cebu 2026 — Open Assembly

## Project

A welcoming public website that explains Hacktoberfest and open source, documents Cebu's participation through real people and projects, introduces the October 2026 gatherings, and connects visitors to Cebu's communities after the event through Cebby.

Audience: newcomers, students, developers, designers, writers, mentors, volunteers, community organizers, and supporters.

Outcome: visitors understand the celebration, find a meaningful way to participate, know what to expect, and have a next step after October.

## Direction approved in conversation

The user agreed to Open Assembly and requested a high-fidelity visual mockup before implementation. The following aesthetic settings translate that accepted direction into a concrete first proposal; they have not been individually reviewed.

- Tone: conversational with restrained playfulness. Invite curiosity with direct, specific language.
- Aesthetic: controlled maximalism in the hero; editorial restraint for information. Use expressive typography, assembled graphic pieces, photography, and clear rules.
- Audience relationship: peer. Make room for different skills and levels of experience.
- Sensory ambition: resonant. Visitors should recognize a real local community they can join.

## Synthesis

The page uses warm ivory, near-black, vivid orange, and selective moss green. Large condensed type anchors an assembled hero with archive photography and an open-door graphic. Quieter editorial sections explain the celebration, introduce Cebu's history, and help newcomers find a place. The dark date section gives the four gatherings clear emphasis. A distinct Cebby section creates a route to continued participation.

Working headline: “Learn. Build. Find your people.”

## Confirmed and unconfirmed content

User-provided dates: October 3, 10, 18, and 25, 2026.
Calendar weekdays: Saturday, Saturday, Sunday, Sunday.

The four gathering titles and summaries are announced in `lib/content.ts`: Opening Ceremony; Meetup: Open Source AI Models & Harnesses; Meetup: Deployment Day; Awarding Ceremony & VIP Dinner. Venues, times, registration details, fees, speakers, and sponsors remain unconfirmed. Calendar entries remain date holds, not reservations.

The global 2026 program emphasizes shared learning and open-source AI rather than PR counting. Cebu continues the broader spirit of open source. Do not promise PR rewards or invent local competition rules.

2025 archive project names and photo sources were verified on the existing Cebu site: Totoo Ba Ito?, Barangay Konek, and Quiz Attack. Referenced photography in the generated concept may be altered by image generation; production must use the original photographs.

## Homepage shape

Value-first October leads: newcomers, especially people new to Cebu, should understand what they can learn, do, and find across the month before exploring the archive.

1. Hero: October invitation, concrete learning and community payoff, and date navigation.
2. This October / 2026: the four announced gatherings, calendar links, and truthful logistics status.
3. Find your people: come curious, make something, pass it on — how to show up throughout October.
4. The idea: a short introduction to Hacktoberfest and the 2026 open-source AI context.
5. Built here: 2025 projects, awards, and credits, followed by community-in-motion archive proof.
6. Beyond October: continued involvement through Cebby's events and calendar.
7. FAQ: first-timer questions, followed by a concise footer.

Before October, prioritize preparation and joining. During October, prioritize the next gathering and updates. After October, prioritize the archive, resources, projects, and continued community participation.

## References

- https://hf.cebutechcommunities.org/ — existing Cebu content and 2025 project photographs.
- https://hacktoberfest.com/ — current global mission and 2026 context.
- https://hacktoberfest.com/questions/ — explanation of the move away from PR counting.
- https://getcebby.com/ — community event discovery and community links.
- https://getcebby.com/calendar — existing calendar subscription entry point.

## Exclusions

- Generic SaaS feature-card layouts, glass effects, purple gradients, and decorative 3D objects.
- Invented community stories, attendees, statistics, testimonials, or 2026 partners.
- Treating archival photos as evidence of the future event.
- Unsupported claims that registration or a data integration is live.
- A finished-event page that provides no clear way to stay involved.

## Deliverable

`mockups/open-assembly-homepage.png` is a static image-generation concept, not an implemented website.
`mockups/open-assembly-prompt.md` preserves the exact image prompt and reference sources.

## Open decisions

- Typography readability and density after visual review.
- Detailed program and practical information for each date.
- Additional documented history beyond 2025.
- Whether the first Cebby connection uses links alone or also displays events.
- Original photo selection and mobile layout in the implementation phase.

## Feedback after the first mockup

The user likes the mockup overall, wants some copy adjustments, and is uncertain about the editorial appearance because the organizers are tech organizations. The condensed typography and editorial language remain subject to review; the first image is not a final visual approval.

The user is also thinking about two related projects:
- Cebu Tech Communities: the stated vision is to show what is happening with Cebu's tech community organizations today.
- Cebu Today: a separate project idea whose intended audience and purpose still need clarification.

Keep Hacktoberfest's introduction, local event history, October participation, and post-event resources central. The relationship among the broader community site, Cebby, and Cebu Today is being discussed; no decision has been made to merge projects or expand this implementation to those sites.
