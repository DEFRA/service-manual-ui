---
title: "3b. Develop energy-efficient software"
caption: "Software"
description: "Energy-efficient software is that developed to deliver the required functionality while reducing energy consumption as far as possible."
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
**Lead role families:** Software, Architecture

**Likely co-benefits:** Cost, user experience

---

## (i) Develop pages using progressive enhancement

Progressive enhancement is a way of building websites and applications where base functionality and core content works in HyperText Markup Language (HTML) alone. Enhancements are then built on top of this base.

Progressive enhancement reduces reliance on heavy JavaScript and client-side processing and so reduces energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- GOV.UK Service Manual, [Build a robust frontend using progressive enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement/)
- W3C, Web Sustainability Guidelines, [3.10 Ensure layouts work for different devices and requirements](https://www.w3.org/TR/web-sustainability-guidelines/#ensure-layouts-work-for-different-devices-and-requirements/)

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability benefits, developing software for progressive enhancement brings co-benefits in terms of:

- Performance: Faster load times and reduced network usage, especially on low-bandwidth connections
- Inclusivity: Services working on older devices, with assistive technologies and for users with poor network connections or limited data allowances.

### Trade-offs

Trade-offs from developing software for progressive enhancement may include:

- Development Time: Requiring additional design and development effort to separate core and enhanced functionality
- Flexibility: Progressive enhancement may sometimes limit the use of complex, interactive front-end experiences as the default option

</div>
</details>

See also: [2b. Design for lightweight digital pages, notifications and documents](/digital-sustainability/actions/journeys-and-processes/lightweight-pages-and-documents)

---

## (ii) Optimise code

Optimising code is the process of modifying software to improve its efficiency, without changing its functional behaviour.

Code reviews can identify where there is obsolete code, and Remove obsolete code and features regularly, rather than allowing the codebase to accumulate unnecessary complexity.

Optimising improves resource efficiency (Central Processing Unit (CPU), memory, network usage) and lowers energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

The [Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/) detail a number of actions that can be taken to optimise code, focused on web development. These include:

- 3.2 [Minify and remove unused code](https://www.w3.org/TR/web-sustainability-guidelines/#minify-and-remove-unused-code/)
- 3.3 [Modularize bandwidth-heavy components](https://www.w3.org/TR/web-sustainability-guidelines/#modularize-bandwidth-heavy-components/)
- 3.4 [Avoid redundancy and duplication in code](https://www.w3.org/TR/web-sustainability-guidelines/#avoid-redundancy-and-duplication-in-code/)
- 3.6 [Ensure code follows good semantic practices](https://www.w3.org/TR/web-sustainability-guidelines/#ensure-code-follows-good-semantic-practices/)

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Optimising code brings co-benefits in terms of:

- Performance: Faster execution times and reduced latency
- Lower costs: Reduced infrastructure costs through more efficient compute usage

### Trade-offs

Optimising code may bring trade-offs such as:

- Development time: Optimising may mean additional engineering effort, profiling, and ongoing optimisation work
- Re-use: Over-optimisation can reduce code readability, maintainability, and developer productivity

</div>
</details>

---

## (iii) Utilise server-side rendering where appropriate

Server-side rendering (SSR) renders a web page on a server before sending it to the user’s browser. This is in contrast to client-side rendering (CSR), where the browser gets raw data from a server to generate content on the user's device.

Server-side rendering can reduce network data transfer and lead to less JavaScript execution in the browser, and with it significant reductions in energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- Green Software Foundation, [Use server-side rendering for high-traffic pages](https://patterns.greensoftware.foundation/development/web-performance/use-server-side-rendering/)

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, server-side rendering can bring co-benefits such as:

- Speed: Improved initial page load performance, especially on lower-powered devices
- Accessibility and resilience: Content is available to users even if Javascript fails

### Trade-offs

Trade-offs from implementing server-side rendering may include:

- Displaced energy consumption: Increased server-side compute load, potentially shifting energy consumption to backend infrastructure
- Complexity: May introduce caching and scaling complexity to maintain performance at high traffic volumes

</div>
</details>

---

## (iv) Utilise caching where possible

Caching temporarily stores frequently accessed data in a designated area (the “cache”) to enable faster access to it. Caching can focus on:

- the browser
- Content Delivery Networks (CDN)
- Application Programming Interfaces (API)

Caching can reduce repeated data processing and transfer, leading to lower processing and energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- Green Software Foundation, [Cache static data](https://patterns.greensoftware.foundation/development/data-handling/cache-static-data/)

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, caching can bring co-benefits in terms of:

- User experience: Faster page load times and API responses
- Scalability: Better scalability through reduced loads on backend systems

### Trade-offs

Trade-offs from implementing caching may include:

- Complexity: Caching layers (such as content delivery networks and distributed caches) introduce additional infrastructure to manage

</div>
</details>

---

## (v) Utilise lazy loading

Lazy loading delays the loading of resources on pages until they are needed, such as when users scroll to them.

This approach reduces initial page load size and network transfer, and with it, lowers energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- Sustainable Web Design, [Optimize media to reduce resource use](https://sustainablewebdesign.org/guidelines/2-9-optimize-media-to-reduce-resource-use/)

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, lazy loading brings co-benefits in terms of:

- Performance: Improved performance, with pages faster to load
- Inclusivity: Improved experience for mobile users and low-bandwidth environments

### Trade-offs

Lazy loading may also :

- Reduced control: Reduced control over performance, architecture, and energy efficiency
- Dependencies: Potential dependency risks (external code quality, updates, licensing)

</div>
</details>

---

## (vi) Use content delivery networks where appropriate

Content delivery networks (CDNs) are a network of servers that cache static content and resources as close to users as possible.

In some cases, content delivery networks can reduce the distance data travels and lowers network energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- Web Sustainability Guidelines, 4.10 [Use content delivery networks (CDNs) when beneficial](https://www.w3.org/TR/web-sustainability-guidelines/#use-content-delivery-networks-cdns-when-beneficial/)

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, using content delivery networks brings co-benefits in terms of:

- Performance: Serving content closer to users can lead to faster load times
- Resilience: Enhanced resilience and availability through distributed infrastructure

### Trade-offs

Trade-offs coming from using content delivery networks may include:

- Duplication: Content duplication may lead to increase in overall footprint if poorly configured
- Dependencies: Content Delivery Networks introduce an additional infrastructure layer and dependency on third-party providers

</div>
</details>
