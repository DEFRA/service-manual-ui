---
title: "3a. Apply the principles of circularity to software"
caption: "Software"
description: "Reuse existing components, build new ones so others can reuse them, and retire software you no longer need. This saves resources and avoids waste."
layout: section
sectionNav: nav-ds-software
customNav: nav-digital-sustainability
headerServiceName: Sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Sustainability"
    href: /digital-sustainability
  - text: "Digital sustainability actions"
    href: /digital-sustainability/actions
  - text: "Software"
    href: /digital-sustainability/actions/software
  - text: "3a. Apply the principles of circularity to software"
---
<div class="app-applies-to">

**This action applies to:** custom software on and off the Core Delivery Platform (CDP), including internal tools. On CDP, the platform and Defra's common tools already give you shared components to build with.

**Lead role families:** Software and Architecture

</div>

---

## (i) Build software with existing components

Build with existing, tested libraries and modules rather than writing code from scratch. This avoids duplicating the effort and resources needed to develop and test components that already exist.

If you work on a Defra service, start with Defra's [common tools](/software-development#common-tools). These include:

- the [Core Delivery Platform (CDP)](/architecture-and-software-development/core-delivery-platform), Defra's internal development platform for building, deploying and running services
- [Defra Forms](/architecture-and-software-development/defra-forms) to build accessible, GOV.UK-styled forms
- [Defra Customer Identity](/architecture-and-software-development/defra-customer-identity) to let users sign in once and use several Defra services
- [Defra Interactive Map](/architecture-and-software-development/defra-accessible-maps) to build lightweight, accessible maps

The Government Digital Service (GDS) also provides components that services across government can use:

- [GOV.UK Forms](https://www.forms.service.gov.uk/) to create accessible online forms for GOV.UK pages
- [GOV.UK Notify](https://www.notifications.service.gov.uk/) to send emails, text messages and letters
- [GOV.UK One Login](https://www.sign-in.service.gov.uk/) to let users prove their identity and sign in
- [GOV.UK Pay](https://www.payments.service.gov.uk/) to let users pay for things

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, building with existing components brings co-benefits in terms of:

- development time: developers avoid repeating work, which speeds up delivery
- cost: shorter development cycles cut the cost of people and resources
- maintainability: standard tools and components make the service easier to iterate and maintain

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Building with shared components can bring trade-offs such as:

- time: it takes effort upfront to find or adapt existing components
- dependencies: components from a shared library can bring risks, such as external code quality, updates and licensing
- governance: open source code needs ongoing governance

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [GOV Reuse Library](https://reuselibrary.service.justice.gov.uk/) (Ministry of Justice): reusable government components from a range of departments

</div>
</details>

---

## (ii) Develop new software components with reuse in mind

If you develop new software components, design them for reuse: modular, independent and self-contained, each doing one job. Think about how easy the code will be to refactor and update.

The Service Standard says you must [make your source code open and reusable](https://www.gov.uk/service-manual/technology/making-source-code-open-and-reusable), so others can reuse it and build on it. Code in the open from the start and publish your code under an open licence. In Defra, store code in the [Defra GitHub organisation](https://github.com/DEFRA).

You can also share components through a component library, so other teams can use what you built.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, developing components with reuse in mind brings co-benefits in terms of:

- delivery time: other teams can build on tested components rather than start from scratch
- cost: reuse spreads the cost of building and testing across several services
- maintainability: modular, self-contained code is easier to test, update and replace

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- upfront effort: designing for reuse takes longer than building for a single service
- governance: shared components need owners, documentation and support, or they fall out of date
- over-engineering: building for uses that never arrive wastes effort and adds complexity

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Use and contribute to open standards, common components and patterns](https://www.gov.uk/service-manual/service-standard/point-13-use-common-standards-components-patterns) (GOV.UK Service Standard, point 13)

</div>
</details>

---

## (iii) Use low-code and no-code approaches when they fit

Low-code and no-code tools let you design and build apps with visual interfaces, drag-and-drop components and generated code. You write little or no code from scratch.

They can save resources by cutting development effort and rework. They can also be more efficient where the platform shares infrastructure between apps.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Building with low-code and no-code approaches brings co-benefits in terms of:

- development time: faster delivery, and people in the team without specialist software skills can take part
- cost: shorter development cycles cut the cost of people and resources

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Low-code and no-code approaches can come with trade-offs such as:

- reduced control: you have less control over performance, architecture and energy efficiency
- more compute: the platform's abstraction and runtime overhead can increase compute use

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Low-code versus no-code app development](https://www.microsoft.com/en-us/power-platform/products/power-apps/topics/low-code-no-code/low-code-no-code-development-platforms/) (Microsoft)
- [What is low-code and no-code](https://www.sap.com/uk/resources/what-is-low-code-no-code/) (SAP)

</div>
</details>

---

## (iv) Decommission software at the end of its life

Decommissioning is the structured, secure process of retiring legacy, redundant or obsolete applications. Unused applications still need running servers, cooling and background processing, whether on premises or in the cloud. Retiring software you no longer need frees up that infrastructure.

Plan the retirement. Tell users, move or archive any data and records you must keep, and check what else depends on the software. Then remove the infrastructure it ran on. For removing unused cloud resources, see [review and remove unused assets](/digital-sustainability/actions/architecture/cloud-provisioning) (5b).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, decommissioning software you no longer need brings co-benefits in terms of:

- cost: you stop paying to maintain software nobody uses
- security: removing unmaintained systems reduces security risks

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- records: decommissioning can lose audit history or records that must be kept, so archive them first
- effort: moving users, data and integrations to a replacement takes planning and time
- hidden dependencies: other systems may still rely on the software in ways nobody has written down

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Retiring your service](https://www.gov.uk/service-manual/agile-delivery/retiring-your-service) (GOV.UK Service Manual): how to wind down a service, tell users and look after their data
- [Moving away from legacy systems](https://www.gov.uk/service-manual/technology/moving-away-from-legacy-systems) (GOV.UK Service Manual): planning a replacement, including agreeing a date to turn the old system off
- [Secure sanitisation and disposal of storage media](https://www.ncsc.gov.uk/guidance/secure-sanitisation-storage-media) (National Cyber Security Centre): wiping or destroying storage so data cannot be recovered
- [Remove unused assets](https://patterns.greensoftware.foundation/operations/resource-lifecycle/remove-unused-assets) (Green Software Foundation): finding and removing idle cloud resources

</div>
</details>

---

## How to measure this

To measure the impact of software, read [measuring the impact of software](/digital-sustainability/measure/software).
