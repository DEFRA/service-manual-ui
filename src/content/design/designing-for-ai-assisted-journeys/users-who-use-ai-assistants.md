---
title: Users who use AI assistants with your service
caption: Designing for AI-assisted journeys
description: 'Some users ask an AI assistant in their browser or productivity tools to read, explain or summarise what is on screen while they use your service.'
layout: section
sectionTitle: Design
sectionNav: nav-design
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: Digital service manual
    href: /service-manual
  - text: Design
    href: /design
  - text: Designing for AI-assisted journeys
    href: /design/designing-for-ai-assisted-journeys
  - text: Users who use AI assistants with your service
---

## Who these users are

These are people using your service with an AI assistant alongside it. The assistant may be built into their browser, operating system or work tools. They might ask it questions like:

- “What does this map show for my location?”
- “What does this result mean for my application?”
- “Summarise what this page is telling me.”

Some users may rely on an assistant because the service is complex, because they are short of time, or because it helps them with access needs.

## What changes for these users

A service can be fully usable by people but not reliably understood by an assistant. Assistants build their understanding from the page structure, the accessibility tree and, in some cases, screenshots.

Not all assistants use screenshots. Those that rely only on the page structure and accessibility tree will find map-based services hard to read, because much of what a map shows is drawn visually rather than written into the page.

With maps and other complex visuals, an assistant may know a map is on the page without reliably understanding:

- which layer is switched on
- what each colour in the legend means
- where the map is centred and which location is selected
- what an information panel says, or when it has changed

Assistants may also miss content that changes after the page loads, such as a results panel that updates as the user interacts. The assistant may still answer confidently, so the user cannot tell it is wrong.

## Risks to users and your service

- **Wrong interpretation:** results may be applied to the wrong place or layer.
- **Loss of trust:** conflicting answers between the assistant and the service undermine confidence.
- **Delay and support costs:** corrections and queries create rework for users and your team.

## What you should do

Treat AI assistants as one more context of use, like a browser, device or assistive technology.

### Build on your accessibility work

- Make sure screen reader users get the key facts on the page, such as the active layer, the selected location and the result. AI assistants that read the page structure will then get them too. Test this with screen reader users, not just with AI tools.
- Build with progressive enhancement, so each page makes sense from its HTML alone, and results are not only created by scripts.
- Make sure important information is available as text in the page, not only drawn on a map or in a chart.
- When content on the page changes, make sure the change is announced to screen readers. Your developers can do this with an ARIA live region.

### Route complex analysis to the right tools

- Point users and tools to any service specific structured data, on the [Data Services Platform](https://environment.data.gov.uk), for detailed map analysis.
- Make clear in your content that the data provided by the service is the authoritative one.

## How to test

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Test your service with AI assistants
    </span>
  </summary>
  <div class="govuk-details__text">
    <ol class="govuk-list govuk-list--number"><li>Use a test environment with no real personal data. Many AI assistants send what is on screen to the company that runs them.</li><li>Choose 2 or 3 assistants your users are likely to have, including any built into Defra or partner organisations' standard browsers and tools.</li><li>Complete your key tasks with the assistant open.</li><li>Ask the assistant to describe what the page is showing, such as the result, selected location or active layer.</li><li>Change what is on screen, for example select a new location or switch a layer, and ask again.</li><li>Compare the assistant's answers with what the service shows, and record any mismatches.</li><li>Repeat a key task with JavaScript turned off, to check the core content and results are still in the page.</li><li>Add this to your browser and device testing, and repeat after significant releases.</li></ol>
  </div>
</details>

## Related guidance

- [Test for accessibility](/accessibility/test-for-accessibility)
- [Service manual: Building a robust frontend using progressive enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement)
- [Service Standard point 5: Make sure everyone can use the service](https://www.gov.uk/service-manual/service-standard/point-5-make-sure-everyone-can-use-the-service)
