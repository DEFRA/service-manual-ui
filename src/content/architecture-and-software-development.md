---
title: Architecture and software development
caption: Your role at Defra
description: Read more about how to design, build and deploy a Defra service.
layout: section
sectionTitle: Architecture and software development
sectionNav:
  - title: In this section
    items:
      - text: Architecture and software development
        href: /architecture-and-software-development
  - title: Common tools
    items:
      - text: Core Delivery Platform
        href: /architecture-and-software-development/core-delivery-platform
      - text: Defra Customer Identity
        href: /architecture-and-software-development/defra-customer-identity
      - text: Defra Forms
        href: /architecture-and-software-development/defra-forms
      - text: Defra Interactive Map
        href: /architecture-and-software-development/defra-accessible-maps
supportBox:
  title: Get support
  description: If you need help designing or building your service, contact the <strong>Delivery Architecture team</strong>.
  items:
    - 'Email: <a href="mailto:delivery.architecture@defra.gov.uk" class="govuk-link">delivery.architecture@defra.gov.uk</a>'
---

This guidance builds upon the [GOV.UK Service Standard](https://www.gov.uk/service-manual/service-standard) and the [GOV.UK Service Manual](https://www.gov.uk/service-manual/technology). You should also familiarise yourself with the [Defra outcome delivery group model (opens in a new tab)](https://defra.sharepoint.com/:u:/r/teams/Team177/SitePages/DDTS-Delivery-Groups.aspx?csf=1&web=1&e=ajLnoX).

This guidance should be followed when you are:

- building a GOV.UK digital service
- building an internal digital service at Defra

This guidance may not apply if you are:

- deploying a commercial off the shelf software
- building a data or reporting platform

## Getting started

To get started, you should:

1. Contact the [Delivery Architecture team](https://defra.sharepoint.com/teams/Team3221/SitePages/Nav-Delivery-Architecture.aspx)
   - they'll help you architect your service and explain governance requirements
   - they'll let you know the principal architect for your delivery group
2. Review the [Defra software development standards](https://defra.github.io/software-development-standards/)
   - these are mandatory and the Delivery Architecture team handles any exceptions through their governance process
3. Work with the Delivery Architecture team to decide if the Core Delivery Platform is right for your service. This is Defra's strategic platform for building and deploying services.

You will need to read the following documentation if your service adopts the Core Delivery Platform:

- [onboarding considerations](https://portal.cdp-int.defra.cloud/documentation/onboarding/onboarding-considerations.md) to understand what the platform offers
- [architectural overview](https://portal.cdp-int.defra.cloud/documentation/architecture/architectural-overview.md) to learn how the platform is built
- [how-to documentation](https://portal.cdp-int.defra.cloud/documentation/how-to/how-to.md)

To access the [Core Delivery Platform](https://portal.cdp-int.defra.cloud/), you will need to be on a Defra device or VPN.

## Recommended approach

To deliver a service that meets users needs faster and at a lower cost, follow these guidelines:

- build on the [Core Delivery Platform](/architecture-and-software-development/core-delivery-platform)
- use Defra's [common tools](/architecture-and-software-development#common-tools) as part of your service
- use Defra's [approved technologies and languages](#approved-technologies-and-languages)
- code in the open from the start, storing code in the [Defra GitHub organisation](https://github.com/DEFRA)
- analyse code in the [Defra SonarQube Cloud organisation](https://sonarcloud.io/organizations/defra)
- follow Defra's [README standards](https://defra.github.io/software-development-standards/standards/readme_standards/)
- maintain solution overview documentation, architecture decision records and architecture diagrams

<h2 class="govuk-heading-m" id="approved-technologies-and-languages">Approved technologies and languages</h2>

Defra restricts the languages and frameworks you can use. You should:

- use Node.js with the Hapi framework for frontend and backend services
- only consider .NET or Python for workloads where Node.js is not suitable
- use the [GOV.UK Frontend Nunjucks templates](https://frontend.design-system.service.gov.uk/use-nunjucks/) to build your pages, don't use other frontend frameworks like Vue or React
- use vanilla JavaScript

More details can be found in the [Defra software development standards](https://defra.github.io/software-development-standards/). If you need additional technology, check the [Defra Tools Radar on Jira (opens in a new tab)](https://eaflood.atlassian.net/jira/software/projects/TR/boards/630). You can review approved technologies and request new ones there.

<h2 class="govuk-heading-m" id="common-tools">Common tools</h2>

| Tool                                                                                      | Description                                                                      |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [Core Delivery Platform](/architecture-and-software-development/core-delivery-platform)   | Defra's internal developer platform for building, deploying and running services |
| [Defra Customer Identity](/architecture-and-software-development/defra-customer-identity) | External authentication and authorisation                                        |
| [Defra Forms](/architecture-and-software-development/defra-forms)                         | Create accessible forms that follow GOV.UK standards                             |
| [Defra Interactive Map](/architecture-and-software-development/defra-accessible-maps)     | Accessible frontend mapping component                                            |
