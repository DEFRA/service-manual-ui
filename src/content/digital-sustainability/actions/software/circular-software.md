---
title: "3a. Apply the principles of circularity to software"
caption: "Software"
description: "For software, embracing the principles of circularity means saving resources and avoiding waste by sharing and reusing existing components where possible, as well as responsibly retiring software at the end of its life."
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
  - text: "3a. Apply the principles of circularity to software"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Lead role families:** Software, Architecture

**Likely co-benefits:** Cost, development time, accessibility

---

## (i) Build software with existing components where possible

Building software by making use of existing components means assembling and integrating pre-tested libraries and modules rather than writing code from scratch.

This approach avoids the unnesessary duplication of effort and resource consumption associated with developing and testing new components that could have been reused from another project.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

### Government Digital Service (GDS) Components

Government Digital Service have created a number of components that can be used by services across government.

- [GOV.UK Forms](https://www.forms.service.gov.uk/) is a platform to create accessible online forms for GOV.UK pages
- [GOV.UK Notify](https://www.notifications.service.gov.uk/) is a platform to to send emails, text messages and letters to users
- [GOV.UK One Login](https://www.sign-in.service.gov.uk/) lets users prove identity and sign in to services
- [GOV.UK Forms](https://www.payments.service.gov.uk/) is a platform to to enable users to pay for things on services

### Shared components in Defra

If you are working on a Defra service, there are a there are a set of [common tools](/architecture-and-software-development/defra-forms) which can be used to build services. These include:

- [Defra Forms](/architecture-and-software-development/defra-forms) to build accessible, GOV.UK-styled forms for your digital service at Defra
- [Defra Customer Identity](/architecture-and-software-development/defra-customer-identity) to allow users to sign in once and access multiple Defra services
- [Defra Interactive Maps](/architecture-and-software-development/defra-accessible-maps) to build lightweight, accessible maps for frontend applications

### Other UK Government materials

- The [Gov Reuse Library](https://reuselibrary.service.justice.gov.uk/) provides a library of reusable government components from a range of departments.

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability benefits, building with existing components brings co-benefits in terms of:

- Development Time: Developers avoid repeating unnecessary work, speeding up delivery
- Lower costs: Shorter development cycles reduce overall project labor and resource expenses
- Maintainability: Use of standard tools and components helps provide for ease of iteration and future maintainability

### Trade-offs

Building with shared components can bring trade-offs such as:

- Time: Upfront effort required to find or adapt existing components
- Dependencies: Reusing components from a shared library can bring dependency risks (such as external code quality, updates, licensing)
- Governance: Open sourcing code requires ongoing governance

</div>
</details>

---

## (ii) Develop new software components with reuse in mind

Developing software with reuse in mind could mean writing code that is designed to perform a particular function that is modular, independent and self-contained.

If you are developing new software components, then do so with reuse in mind. Where possible, think about how easy the code will be to refactor and update.

For services following the Agile lifecyle, the Service Standard requires that [code is made open source and reusable](https://www.gov.uk/service-manual/technology/making-source-code-open-and-reusable/), so that it is available to reuse and be built upon. This means writing code in the open from the start, and publishing code under an open license where appropriate.

In addition, software components can also be shared via a component library. Libraries can help teams make use of things created for other projects.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

### UK Government materials

The GOV.UK Service Manual provides guidance on how code can be made [open & reusable.](https://www.gov.uk/service-manual/technology/making-source-code-open-and-reusable/)

### GOV.UK Service Standard, Point 13

Point 13 of the GOV.UK Service Standard sets out the requirement for government services to ['Use and contribute to open standards, common components and patterns'](https://www.gov.uk/service-manual/service-standard/point-13-use-common-standards-components-patterns/)

</div>
</details>

---

## (iii) Use low and no-code approaches where appropriate

Low-code or no-code are methods of designing and developing apps using visual interfaces, drag-and-drop components, and automated code generation instead of the need to writing code from scratch.

These approaches can save resources through reduced development effort and rework, and also improve efficiency where platforms optimise shared infrastructure.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Low-code vs. no-code app development,](https://www.microsoft.com/en-us/power-platform/products/power-apps/topics/low-code-no-code/low-code-no-code-development-platforms/) Microsoft
- [What is low-code/no-code?](https://www.sap.com/uk/resources/what-is-low-code-no-code/) SAP

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Building with low and no-code approaches brings co-benefits in terms of:

- Development Time: Faster delivery and enables broader participation from other roles on teams that don't have specialist software skills
- Lower costs: Shorter development cycles reduce overall project labor and resource expenses

### Trade-offs

Low and no-code approaches can come with trade-offs such as:

- Reduced control: Reduced control over performance, architecture, and energy efficiency
- Increased compute usage: Platform abstraction and runtime overhead can increase compute usage

</div>
</details>

---

## (iv) Ensure software is decommissioned at the end of life

Decommissioning software is the structured, secure process of retiring legacy, redundant, or obsolete applications.

Unused or legacy applications still require active server instances, cooling, and background processing whether on-premises or in the cloud.

Decommissioning software that is no longer needed or used frees up infrastructure

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, decommissioning software when no longer needed brings co-benefits in terms of:

- Cost: Reduced costs associated with maintaining software unnecessarily
- Security: Reduced security risks from eliminating unmaintained systems

</div>
</details>
