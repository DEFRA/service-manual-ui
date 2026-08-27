---
title: Architecture
caption: Your role at Defra
description: 'How to design a Defra service and the systems it depends on.'
layout: section
sectionTitle: Architecture
sectionNav: nav-architecture
supportBox:
  title: Get support
  description: >-
    If you need help designing your service, contact the <strong>Delivery
    Architecture team</strong>.
  items:
    - >-
      Email: <a href="mailto:delivery.architecture@defra.gov.uk"
      class="govuk-link">delivery.architecture@defra.gov.uk</a>
---

This guidance builds on the [GOV.UK Service Standard](https://www.gov.uk/service-manual/service-standard) and the [technology section of the GOV.UK Service Manual](https://www.gov.uk/service-manual/technology). The [Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice) sets out the criteria government uses to design, build and buy technology.

You should also read the [Defra outcome delivery group model](https://defra.sharepoint.com/:u:/r/teams/Team177/SitePages/DDTS-Delivery-Groups.aspx?csf=1&web=1&e=ajLnoX).

If you work in a software development role, see [software development](/software-development).

Follow this guidance when you are:

- building a GOV.UK digital service
- building an internal digital service at Defra

This guidance may not apply if you are:

- deploying commercial off-the-shelf software
- building a data or reporting platform

## Getting started

To get started, you should:

1. Contact the [Delivery Architecture team](https://defra.sharepoint.com/teams/Team3221/SitePages/Nav-Delivery-Architecture.aspx)
   - they'll help you design your service's architecture and explain governance requirements
   - they'll tell you who the principal architect is for your delivery group
2. Review the [Defra software development standards](https://defra.github.io/software-development-standards/)
   - these are mandatory, and the Delivery Architecture team handles any exceptions through their governance process
3. Confirm with the delivery team whether the [Core Delivery Platform (CDP)](/architecture-and-software-development/core-delivery-platform) is right for the service
   - CDP is Defra's internal development platform and the expected choice for building and deploying services
   - if it is not right for the service, this is managed as an exception through the Delivery Architecture team's governance process

## Expected approach

You are expected to:

- build on the [Core Delivery Platform](/architecture-and-software-development/core-delivery-platform)
- use Defra's [approved technologies and languages](#approved-technologies-and-languages)
- use Defra's [common tools](#common-tools) as part of the service
- code in the open from the start, storing code in the [Defra GitHub organisation](https://github.com/DEFRA)
- maintain solution overview documentation, architecture decision records and architecture diagrams
- work with delivery teams on the design of their services, and on decisions that affect other services
- meet the [GOV.UK Service Standard](https://www.gov.uk/service-manual/service-standard) and the [Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice)

<h2 class="govuk-heading-m" id="approved-technologies-and-languages">Approved technologies and languages</h2>

Defra restricts the languages and frameworks teams can use. The current list, the reasons behind each choice and how to request a new technology are in [approved technologies and languages](/software-development#approved-technologies-and-languages).

<h2 class="govuk-heading-m" id="common-tools">Common tools</h2>

| Tool                                                                                      | Description                                                                        |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [Core Delivery Platform](/architecture-and-software-development/core-delivery-platform)   | Defra's internal development platform for building, deploying and running services |
| [Defra Customer Identity](/architecture-and-software-development/defra-customer-identity) | External authentication and authorisation                                          |
| [Defra Forms](/architecture-and-software-development/defra-forms)                         | Accessible forms that follow GOV.UK standards                                      |
| [Defra Interactive Map](/architecture-and-software-development/defra-accessible-maps)     | Accessible frontend mapping component                                              |
