---
title: Users who delegate tasks to AI agents
caption: Designing for AI-assisted journeys
description: 'Some users, including individuals, businesses and public bodies, use AI agents to complete tasks for them. Agents can repeat those tasks quickly and at scale.'
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
  - text: Users who delegate tasks to AI agents
---

## Who these users are

AI agents are systems that perform tasks on behalf of people. Browser agents can visit your service and gather what they need by inspecting the page structure, interpreting the accessibility tree and, in some cases, analysing screenshots.

Agent-enabled tools are already being used across public and professional sectors to help prepare, check and process applications and other casework.

Most of these users are legitimate. Agents can help people work through complex processes more efficiently, especially in systems under pressure. This is a positive development that services should support.

## What changes for these users

Agents change the scale of demand. A journey designed for one person making one request may behave very differently when an agent can repeat searches or generate many requests quickly.

Current browser agents can already complete many multi-step journeys, including those with search boxes, forms and interactive steps. They may still misread complex visuals, but they can often work around them.

What limits the risk today is mainly how few people use agents, and how slow and costly each agent run is. Both are changing quickly. Assume demand from agents will grow, and plan for it now.

Industries leaning into automation may also expect government data to be available in ways that suit automated workflows.

Service flooding is already a concern across government. The Information Commissioner's Office has warned that AI-generated Freedom of Information requests are increasing request volumes. Service flooding is when automated requests arrive in such volume that they affect how a service operates. This can mean:

- the service being taken down, as in a denial of service
- slower performance for everyone
- unmanageable volumes of data being requested
- more work for teams wherever the process still needs manual checks

## Risks to users and your service

- **Service flooding:** high-volume automated requests affect performance or availability for everyone.
- **Manual overload:** automated demand overwhelms steps that still need people.
- **Scraping:** data is harvested at scale in ways it was not designed for.
- **Excluding legitimate users:** blocking all automation also blocks people using agents as productivity tools.

## What you should do

### Welcome legitimate automation

- Do not exclude agents by default. Many will be productivity tools for your users.
- Decide which tasks suit automation, and which still need a person to use the full service journey.
- Be explicit about which APIs, feeds or structured data routes are appropriate for automation.

### Offer structured routes

- Accept structured inputs, such as uploaded files in standard formats, so people with access needs and agents can skip hard-to-use interactive steps.
- Where you have them, point automated users to APIs and data services rather than your user interface.
- You may hear about ways for AI agents to connect to a service directly, such as [Model Context Protocol (MCP)](/ai-toolkit/tools/model-context-protocol). MCP is being trialled at Defra and is not approved for general use. Talk to the AI Capability and Enablement team before you plan anything like this.
- Give the essential information from your map as text or a list, as the [Accessibility](/accessibility) section requires. This also helps agents read it.
- Each time you reduce friction, add proportionate controls in the same release. Before you launch a structured input, API or accessibility change that makes automation easier, agree the demand your team can handle and put matching controls in place.

### Monitor demand

- Monitor request volumes for signs of automation, scraping or repeated high-volume demand.
- Ask your developers how they will spot automated traffic, such as bursts of requests, sequences of nearby locations, or the same request repeated many times. Your security colleagues can advise on bot detection.
- Agree with operational teams what level of demand they can handle. [Non-functional requirements](/business-analysis/non-functional-requirements) and [Operational service readiness](/delivery-groups/follow-delivery-governance/assurance/operational-service-readiness) cover performance, reliability and running the live service.

### Build proportionate controls

- Plan controls now, rather than waiting for demand to arrive, particularly where downstream work is manual or only partly automated.
- Consider human-in-the-loop checks for high-volume or high-impact requests, so teams are protected while users still get a good service.
- Agree controls with your team, such as limits on how many requests one user can make, registration for high-volume use, or a human check on high-impact requests.
- Look at behaviour, such as request volume and patterns, rather than blocking all automation.
- Keep controls proportionate, so legitimate users and agents are not blocked.

## How to test

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Check how agent-friendly your service is
    </span>
  </summary>
  <div class="govuk-details__text">
    <ol class="govuk-list govuk-list--number"><li>Never let an agent submit a real application or request. Use a test environment.</li><li>In a test environment, ask a browser agent to complete your service's main task.</li><li>Note where it succeeds, where it fails and what it misunderstands.</li><li>Ask what would happen if the task were repeated 100 or 1,000 times, and who or what would feel it first.</li><li>For each barrier you plan to remove, decide which proportionate control you will add alongside it, such as a rate limit, an API key for high-volume use or a human check, and test that it works.</li><li>Repeat after accessibility or structural changes that could make the journey easier to automate, and check your controls still match the level of risk.</li></ol>
  </div>
</details>

## Related guidance

- [Security](/security)
- [Service Standard point 9: Create a secure service which protects users’ privacy](https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service)
- [Service Standard point 14: Operate a reliable service](https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service)
