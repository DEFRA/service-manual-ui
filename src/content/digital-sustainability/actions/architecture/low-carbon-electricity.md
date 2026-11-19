---
title: "5c. Shift cloud demand to match the availability of low carbon electricity"
caption: "Architecture"
description: "'Carbon aware' digital services are able to respond to shifts in the carbon intensity of the electricity grid, and schedule and run cloud workloads at times and in places when more renewable energy is available."
layout: section
sectionNav: nav-ds-architecture
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
  - text: "Architecture"
    href: /digital-sustainability/actions/architecture
  - text: "5c. Shift cloud demand to match the availability of low carbon electricity"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
<div class="govuk-inset-text">

Shifting cloud workload locations may not always be possible due to contractual and/or data sovereignty reasons.

</div>

**Lead role families:** Architecture, IT Operations

**Likely co-benefits:** Cost

---

### (i) Shift workloads in time

The UK electricity grid tends to have its highest mix of renewable electricity late at night and early in the morning, as well as on bright, windy, days.

Where possible, shift non-critical workloads (like AI training, batch processing, or data backups) to times when renewable energy availability peaks and grid carbon intensity is lowest.

This is often called ‘temporal demand shifting.’

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more on this point</span></summary>
<div class="govuk-details__text">

- [Carbon aware AI scheduling,](https://patterns.greensoftware.foundation/operations/carbon-aware-ai-scheduling/) Green Software Foundation

</div>
</details>

See also [5a. Design workloads for modularity, portability and flexibility](/digital-sustainability/actions/architecture/flexible-workloads)

---

## (ii) Shift workload location

The proportion of renewable energy available on the electricty grid varies significantly between UK regions, depending on methods of local electricity generation and distribution between regions.

Where possible, shift workloads from regions with a lower proportion of renewables available to one where they are higher.

This is often called ‘spatial demand shifting.’

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more on this point</span></summary>
<div class="govuk-details__text">

- [Carbon Intensity Dashboard,](https://dashboard.neso.energy/) National Energy System Operator

</div>
</details>
