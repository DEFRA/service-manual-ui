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
      - text: Defra Forms
        href: /architecture-and-software-development/defra-forms
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

To get started, you should:

1. Contact the [Delivery Architecture team](https://defra.sharepoint.com/teams/Team3221/SitePages/Nav-Delivery-Architecture.aspx).
   - tell them what you're building
   - they'll help you architect your service and explain governance requirements
2. Get access to the [Core Delivery Platform](https://portal.cdp-int.defra.cloud/).
   - you'll need to use a Defra device or VPN
   - this is Defra's internal developer platform for building, deploying and running services
   - your service should use this platform in most cases
3. Review the [Defra software development standards](https://defra.github.io/software-development-standards/).
   - these are mandatory - the Delivery Architecture team handles any exceptions through their governance process
4. Decide if the Core Delivery Platform is right for your service.
   - read the [onboarding considerations](https://portal.cdp-int.defra.cloud/documentation/onboarding/onboarding-considerations.md) to understand what the platform offers
   - read the [architectural overview](https://portal.cdp-int.defra.cloud/documentation/architecture/architectural-overview.md) to learn how the platform is built
   - read the relevant [how to documentation](https://portal.cdp-int.defra.cloud/documentation/how-to/how-to.md)

## Recommended approach

Follow these guidelines to deliver services that meet user needs faster and at lower cost.

- build on the Core Delivery Platform
- use Node.js with the hapi framework for frontend services
- use vanilla JavaScript
- use Node.js or .NET for backend services
- store code in the [Defra GitHub organisation](https://github.com/DEFRA)
- use [Defra Customer Identity](/architecture-and-software-development/defra-customer-identity) for external authentication and authorisation
- use [Defra Forms](/architecture-and-software-development/defra-forms) to create accessible forms that follow GOV.UK standards
- use [Defra Accessible Maps](/architecture-and-software-development/defra-accessible-maps) if your service includes mapping
- follow Defra's [README standards](https://defra.github.io/software-development-standards/standards/readme_standards/)
- maintain solution overview documentation, architecture decision records and architecture diagrams

## Approved technologies

If you need additional technology, check the [Defra Tools Radar on Jira](https://eaflood.atlassian.net/jira/software/projects/TR/boards/630). You can review approved technologies and request new ones there.
