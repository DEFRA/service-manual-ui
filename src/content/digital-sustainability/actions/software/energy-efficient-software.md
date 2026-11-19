---
title: "3b. Develop energy-efficient software"
caption: "Software"
description: "Energy-efficient software delivers the functionality users need while using as little energy as possible."
layout: section
sectionNav: nav-ds-software
customNav: nav-digital-sustainability
headerServiceName: Digital sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Digital sustainability"
    href: /digital-sustainability
  - text: "Digital sustainability actions"
    href: /digital-sustainability/actions
  - text: "Software"
    href: /digital-sustainability/actions/software
  - text: "3b. Develop energy-efficient software"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** custom software on and off the Core Delivery Platform (CDP), including internal tools. On CDP, the frontend template renders pages on the server, so much of points (i) and (iii) is already done for you.

**Lead role families:** Software and Architecture

---

## (i) Develop pages using progressive enhancement

Progressive enhancement is a way of building websites and applications so that core content and functions work in HTML alone. You then build enhancements on top.

It reduces reliance on heavy JavaScript and processing in the browser, so it uses less energy.

Defra's [software development standards](/software-development#approved-technologies-and-languages) say to build pages with the GOV.UK Frontend Nunjucks templates and vanilla JavaScript, which is plain JavaScript without a framework. They rule out frontend frameworks such as React or Vue. Following them takes you most of the way.

For the design side, see [design for text-based journeys](/digital-sustainability/actions/journeys-and-processes/lightweight-pages-and-documents).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, developing software for progressive enhancement brings co-benefits in terms of:

- performance: faster load times and less network use, especially on low-bandwidth connections
- inclusion: services work on older devices, with assistive technologies and for users with poor connections or limited data allowances

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Trade-offs from developing software for progressive enhancement may include:

- development time: it takes extra design and development effort to separate core and enhanced functions
- flexibility: progressive enhancement may sometimes rule out complex, interactive frontend experiences as the default

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Build a robust frontend using progressive enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement) (GOV.UK Service Manual)
- [Ensure layouts work for different devices and requirements](https://www.w3.org/TR/web-sustainability-guidelines/#ensure-layouts-work-for-different-devices-and-requirements) (W3C Web Sustainability Guidelines, guideline 3.10)

</div>
</details>

---

## (ii) Optimise code

Optimising code means changing software to make it more efficient without changing what it does. Refactoring means restructuring code without changing what it does. It makes code more efficient over time.

Use code reviews to find obsolete code and features, and remove them regularly, so the codebase does not build up unnecessary complexity. Use a profiler, a tool that measures where code spends time and resources, to find the most costly parts. Fix those first.

Optimised code uses less processor (CPU), memory and network, so it uses less energy.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Optimising code brings co-benefits in terms of:

- performance: code runs faster with less delay
- cost: more efficient use of compute cuts infrastructure costs
- maintainability: refactoring reduces technical debt and stops inefficient legacy patterns building up

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Optimising code may bring trade-offs such as:

- development time: optimising means extra engineering effort, profiling and ongoing work alongside feature delivery
- reuse: over-optimising can make code harder to read and maintain, and slow developers down
- defects: poorly managed refactoring can introduce bugs or regressions

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

The W3C [Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/) set out ways to optimise code for the web, including:

- [Minify and remove unused code](https://www.w3.org/TR/web-sustainability-guidelines/#minify-and-remove-unused-code) (guideline 3.2)
- [Modularize bandwidth-heavy components](https://www.w3.org/TR/web-sustainability-guidelines/#modularize-bandwidth-heavy-components) (guideline 3.3)
- [Avoid redundancy and duplication in code](https://www.w3.org/TR/web-sustainability-guidelines/#avoid-redundancy-and-duplication-in-code) (guideline 3.4)
- [Ensure code follows good semantic practices](https://www.w3.org/TR/web-sustainability-guidelines/#ensure-code-follows-good-semantic-practices) (guideline 3.6)

Also read [SUS03-BP03 Optimize areas of code that consume the most time or resources](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_software_a4.html) (Amazon Web Services). It covers using profilers and code review to find and fix the most resource-hungry code.

</div>
</details>

---

## (iii) Use server-side rendering

Server-side rendering (SSR) builds a web page on a server before sending it to the user's browser. In client-side rendering (CSR), the browser gets raw data from a server and builds the page on the user's device.

Server-side rendering can reduce data transfer and the JavaScript the browser has to run, which can reduce energy use.

CDP's frontend template already renders pages on the server. If you build elsewhere, follow the same approach.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, server-side rendering can bring co-benefits such as:

- speed: pages load faster at first, especially on lower-powered devices
- accessibility and resilience: content is available to users even if JavaScript fails

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Trade-offs from server-side rendering may include:

- displaced energy use: more computing on the server, which may shift energy use to backend infrastructure
- complexity: you may need caching and scaling to keep performance up at high traffic

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Use server-side rendering for high-traffic pages](https://patterns.greensoftware.foundation/development/web-performance/use-server-side-rendering) (Green Software Foundation)

</div>
</details>

---

## (iv) Use caching and content delivery networks

Caching stores frequently used data in a temporary store, the cache, so it can be reached faster. You can cache in:

- the browser
- content delivery networks (CDNs)
- application programming interfaces (APIs), the way systems ask each other for data

Caching cuts repeated processing and data transfer, so it uses less energy.

A content delivery network is a network of servers that caches static content as close to users as possible. In some cases, this shortens the distance data travels and lowers the energy the network uses.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, caching and content delivery networks can bring co-benefits in terms of:

- user experience: pages and API responses load faster
- scaling: backend systems carry less load, so they scale better
- resilience: content delivery networks spread content across many servers, which improves availability

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Trade-offs may include:

- complexity: caching layers, such as content delivery networks and distributed caches, add infrastructure to manage
- duplication: a poorly configured content delivery network can duplicate content and increase the overall footprint
- dependencies: a content delivery network adds an infrastructure layer and a dependency on a third-party provider

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Cache static data](https://patterns.greensoftware.foundation/development/data-handling/cache-static-data) (Green Software Foundation)
- [Use content delivery networks (CDNs) when beneficial](https://www.w3.org/TR/web-sustainability-guidelines/#use-content-delivery-networks-cdns-when-beneficial) (W3C Web Sustainability Guidelines, guideline 4.10)

</div>
</details>

---

## (v) Use lazy loading

Lazy loading waits to load resources on a page until they are needed, for example when users scroll to them.

This makes the first page load smaller and cuts data transfer, so it uses less energy.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, lazy loading brings co-benefits in terms of:

- performance: pages load faster
- inclusion: a better experience for mobile users and on low-bandwidth connections

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Optimize media to reduce resource use](https://sustainablewebdesign.org/guidelines/2-9-optimize-media-to-reduce-resource-use/) (Sustainable Web Design)

</div>
</details>

---

## How to measure this

To measure the impact of software, read [measuring the impact of software](/digital-sustainability/measure/software).
