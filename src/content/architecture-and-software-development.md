---
title: Architecture and software development
caption: Your role at Defra
description: Guidance on designing and building digital services at Defra.
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
      - text: Defra Accessible Maps
        href: /architecture-and-software-development/defra-accessible-maps
supportBox:
  title: Get support
  description: If you need help designing or building your service, contact the <strong>Delivery Architecture team</strong>.
  items:
    - 'Email: <a href="mailto:delivery.architecture@defra.gov.uk" class="govuk-link">delivery.architecture@defra.gov.uk</a>'
---

This guidance extends the [GOV.UK Service Standard](https://www.gov.uk/service-manual/service-standard) and the [GOV.UK Service Manual](https://www.gov.uk/service-manual/technology).

## Getting started

To get started you should:

- Contact the [Delivery Architecture team](https://defra.sharepoint.com/teams/Team3221/SitePages/Nav-Delivery-Architecture.aspx) to discuss your service. They will help you architect your service and understand governance requirements
- Read the [Core Delivery Platform](https://portal.cdp-int.defra.cloud/) documentation to understand the technology and processes of Defra's internal developer platform
- Decide if the Core Delivery Platform is right for your service
- Read and follow the [Defra software development standards](https://defra.github.io/software-development-standards/)

## Languages and code

Frontend digital services at Defra are developed in Node.JS using JavaScript and the HAPI framework. Backend services are developed in Node.JS or Microsoft's .NET if you are building on top of commercial software products.

Store all code in the [Defra GitHub organisation](https://github.com/DEFRA).

Exceptions to this should be managed through Delivery Architecture governance process.

## Documentation

Every GitHub repository must have a README file in its root and follow the [README standards.](https://defra.github.io/software-development-standards/standards/readme_standards/)

You must maintain the following documentation about your digital service

- An overview of the solution
- Architecture decision records
- Diagrams

## Common tools

Defra provides a set of common tools and platforms to help teams focus on solving users problems.

| Tool                                                                                      | What to use it for                                                 |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [Core Delivery Platform](/architecture-and-software-development/core-delivery-platform)   | To create, deploy, test and monitor services at Defra.             |
| [Defra Customer Identity](/architecture-and-software-development/defra-customer-identity) | To allow users to sign in once and access multiple Defra services. |
| [Defra Accessible Maps](/architecture-and-software-development/defra-accessible-maps)     | To create accessible, GOV.UK-styled frontend maps.                 |

## Approved technologies

If you require additional technology, you can review approved technologies and request new technologies using the [Defra Tools Radar on Jira](https://eaflood.atlassian.net/jira/software/projects/TR/boards/630).
