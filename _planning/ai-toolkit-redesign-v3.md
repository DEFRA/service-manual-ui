# AI digital toolkit redesign v3: plan of attack

A reviewable record of the design decisions on this experimental branch
before any pages move. Open as a draft pull request so reviewers can see
the thinking, not just the diff.

## What I'm holding the design to

These are the principles a world-class government interaction designer
would push hardest on for a page like this. I will refer back to them
when making each call.

- **One primary action per page.** "Start now" stays the hero CTA on
  the landing. Everything else is visually and semantically secondary.
- **Tasks beat types.** Group pages by what a practitioner is trying to
  do, not by the shape of the content. "Build with AI" beats
  "Guidance" because the user is choosing a task, not a content type.
- **Shallow choices, deep detail.** The landing shows four cards with a
  one-line teaser each. Everything else lives one click down. No
  maturity tags, no per-page descriptions, no kitchen-sink lists on the
  landing.
- **Familiar patterns over invention.** Use the GOV.UK topic-page
  pattern, the existing two-thirds layout, the existing section nav,
  the existing card styles. No new colours, no new fonts, no new
  components.
- **A single canonical home per piece of content.** Nothing appears in
  two task groups, or in a task card and the navigation chrome and a
  signpost. Duplicate paths kill scanability.

## Cognitive load: the headline change

| Today | Redesigned |
|---|---|
| Hero CTA | Hero CTA (unchanged) |
| Three cards labelled by content shape: Guidance, Tools, Patterns. "Guidance" is a weak catch-all. | Four cards labelled by user task: Build with AI, Build responsibly, Run your service, Learn from others. No catch-all. |
| Each card lists what's inside in one line. | Each card lists what's inside in one line. |
| User must mentally translate their task to a content shape before clicking. | User picks a task directly. |
| Kanban of in-flight projects below. | Kanban stays. |
| Contact box at the bottom. | Contact box at the bottom, plus a signpost block to the AI Hub for cross-surface content (prompts, tools radar, training, governance for all staff). |

The page footprint is roughly the same. The qualitative win is the
fewer mental translation steps before a click.

## Tools: where it goes and why

Tools is the question that doesn't have a tidy answer. A model
selection tool serves "Build with AI" but also "Build responsibly". A
radar entry on an evaluation framework arguably serves all four task
groups. Forcing Tools into one group misleads users.

Three options, with my call:

1. **Fifth card on the landing.** Rejected. Breaks the 2x2 grid,
   pushes scanning past Miller's comfortable chunk size, and
   contradicts the brief's signpost direction.
2. **Inside "Build with AI".** Rejected. Implies tools are only for
   building, when several radar entries (Langfuse, observability
   patterns) are operational, not delivery.
3. **Signposted to the AI Hub from the landing's signpost block, with
   the existing `/ai-toolkit/tools/*` pages staying in the repo and
   reachable by direct URL.** Proposed.

Why option 3:

- It matches the brief's stated direction.
- It is honest about the cross-cutting nature of tools.
- It keeps the existing radar entries reachable so no link rot, no
  loss of work.
- It puts Tools on the cross-surface index where it belongs (the AI
  Hub serves all staff, not just practitioners building services).

The catch: option 3 only works if Tools also comes out of the
toolkit's top navigation chrome. Today the customNav on every toolkit
page lists "Tools" as a peer to Guidance, Patterns and Projects. If the
landing signposts users to the AI Hub for tools while the top nav of
every page sends them to the internal radar, we contradict ourselves.

The fix: replace the four current top-nav items (Guidance, Tools,
Patterns, Projects) with the four new task groups on every toolkit
page. This is mechanical, around 50 files, same shape as the
"From the field" to "Projects" rename in PR #116. I will flag this as
part of the prompts and tools open decision rather than ship it
silently.

## The new four-task IA: proposed mapping

Each group becomes a card on the landing and a section landing page
with its own left sub-nav.

### Build with AI

Day-to-day work of designing, prompting, building, integrating and
evaluating.

- `patterns/` and its four sub-pages
- `guidance/workflow`, `writing-good-prompts`, `generating-requirements`,
  `feature-development`, `rules-for-ai`, `mcp-servers`
- `guidance/choosing-models`, `four-pillars`, `cost-and-tokens`,
  `setting-up-your-project`, `working-mindset`
- `guidance/training-and-resources`
- Agentic guidance (status: improving — use existing `mcp-servers`
  plus a new agentic index page)
- Tooling standards (status: to build, stub only)
- Technical wiki (status: to build, stub only)

### Build responsibly

The duty of care: legal, ethical, secure, transparent, sustainable.

- `guidance/security` (security guardrails)
- `guidance/ethics`
- `guidance/sustainability`
- `guidance/information-governance`
- `guidance/pii-and-data-handling`
- DPIA guidance (status: to build, stub only)
- ATRS transparency guidance (status: to build, stub only)
- Governance map (status: live per the brief, but I can't find a page
  for it in the repo — flagged as open decision below)

### Run your service

What happens after the service is built and is in users' hands. All
four items are "to build" per the brief.

- Observability standards (stub)
- Service wrapper (stub)
- Release management (stub)
- Lifecycle operations (stub)

### Learn from others

The lived experience of Defra teams.

- Case studies (the three NRF and PLP write-ups)
- Lessons learned (code quality, governance, output validation)
- Projects kanban (open question whether the live kanban lives here or
  stays as a standalone block on the landing)

Case studies and lessons learned are currently in `_archive/` after
PR #116. The brief lists them as "live". I will not restore them from
archive without your confirmation, since their removal was a deliberate
content-design call you made last week.

## What I need from you before I touch any pages

1. **Case studies and lessons learned.** Restore from `_archive/` so
   they can power "Learn from others", or were you thinking of
   different content for that group?
2. **Top navigation chrome.** Replace the four current toolkit nav
   items with the four new task groups on every page, so the landing
   and the chrome agree? If yes, this is a mechanical pass. If no, the
   landing and the rest of the site will disagree about how the toolkit
   is organised.
3. **Governance map.** Listed in the brief as live under "Build
   responsibly" but I cannot find a page for it. Is this an existing
   page renamed, a page that's coming, or content the AICE team is
   producing now?
4. **Projects kanban placement.** Stay where it is on the landing
   (below the four task cards), or move into "Learn from others" as
   the current state of in-flight work alongside past outcomes?
5. **Stub pattern.** Proposed: a one-paragraph stub saying "We are
   working on this guidance. Email the AI Capability and Enablement
   team to be added to the update list." Acceptable, or do you have a
   different stub convention?

## Commit plan once those are answered

Each commit is independently reviewable.

1. This plan doc (already)
2. Four new section landing pages, frontmatter and section nav only,
   no body yet
3. Re-cut existing pages: update each affected page's frontmatter
   sectionNav and breadcrumb to sit under its new group
4. Rewrite `ai-toolkit.md` landing: four task cards replace the three
   type-based cards
5. SharePoint AI Hub signpost block on the landing
6. Top-nav rename across all toolkit pages, if approved in
   answer to question 2
7. Honest stubs for the "to build" pages
8. Restore case studies and lessons learned from `_archive/`, if
   approved in answer to question 1, and wire into "Learn from others"
9. Remove the old `guidance.md` catch-all landing
10. PR description finalised, including the open prompts and tools
    decision and the cross-surface ownership flag

## What this branch will not do

- Touch the hero or Start now button. Both stay byte-for-byte.
- Touch the triage flow under `/ai-toolkit/triage/*`.
- Touch any page outside `/ai-toolkit/*`.
- Settle the prompts and tools ownership question. It stays flagged.
- Add new colours, fonts or components.
- Show maturity tags on the landing. They will only appear on section
  pages, per the brief.
- Delete the existing `/ai-toolkit/tools/*` or `/ai-toolkit/prompt-library`
  content. Both stay reachable by direct URL until the AI Hub move is
  fully agreed.

## Reference files still needed

When Bidds shares them, please drop them into this branch or paste the
relevant content here and I will refine the plan and the
implementation against them.

- AI toolkit landing redesign mockup v3 (HTML)
- Defra AI information architecture sitemap v3 (PNG)
- AI content split working matrix v3 (XLSX)

Without them I will build to the brief and the GOV.UK topic-page
pattern. With them I will reconcile any visual or ownership
differences before merging.
