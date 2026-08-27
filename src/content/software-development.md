---
title: Software development
caption: Your role at Defra
description: 'Build, test and deploy services at Defra.'
layout: section
sectionTitle: Software development
sectionNav: nav-software-development
supportBox:
  title: Get support
  description: >-
    If you need help building your service, ask the <strong>principal
    developers</strong> in the Defra Digital Team Slack.
  items:
    - >-
      Slack: <a href="https://defra-digital.slack.com/archives/C07QXD07Y4B"
      class="govuk-link">ask-principal-developers</a>
---

This section covers how to build a service at Defra: the standards you follow, the platform you build on and the technologies you can use.

It builds on the [GOV.UK Service Standard](https://www.gov.uk/service-manual/service-standard) and the [technology section of the GOV.UK Service Manual](https://www.gov.uk/service-manual/technology). The [Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice) sets out the criteria government uses to design, build and buy technology.

If you work in an architecture role, see [architecture](/architecture-and-software-development).

Follow this guidance when you are:

- building a GOV.UK digital service
- building an internal digital service at Defra

This guidance may not apply if you are:

- deploying commercial off-the-shelf software
- building a data or reporting platform

## Getting started

To get started, you should:

1. Review the [Defra software development standards](https://defra.github.io/software-development-standards/)
   - these are mandatory, and the Delivery Architecture team handles any exceptions through their governance process
   - they set out Defra's supported languages and frameworks, and the context behind each choice
   - they include guides for common development patterns, such as Defra Identity integration, Microsoft Entra integration and a GDPR-compliant cookie banner
   - they cover secure coding practices, including how to protect your service with GitHub Advanced Security
2. Work with your architect to determine whether the [Core Delivery Platform (CDP)](/architecture-and-software-development/core-delivery-platform) is a fit for your service
   - CDP is Defra's internal development platform, with build pipelines, hosting, logging and monitoring already in place
   - the expectation is that it will be a fit, and anything else is managed as an exception through the Delivery Architecture team's governance process

## Expected approach

When you build a service, you are expected to:

- build on the [Core Delivery Platform](/architecture-and-software-development/core-delivery-platform)
- use Defra's [approved technologies and languages](#approved-technologies-and-languages)
- use Defra's [common tools](#common-tools) as part of your service
- code in the open from the start, storing code in the [Defra GitHub organisation](https://github.com/DEFRA)
- analyse code in the [Defra SonarQube Cloud organisation](https://sonarcloud.io/organizations/defra)
- follow Defra's [README standards](https://defra.github.io/software-development-standards/standards/readme_standards/)
- maintain application architecture documentation and architecture decision records
- work with your architect on the design of the service, and on decisions that affect other services
- work with your quality assurance (QA) colleagues to shift testing left, checking designs and code as you build rather than at the end
- meet the [GOV.UK Service Standard](https://www.gov.uk/service-manual/service-standard) and the [Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice)

<h2 class="govuk-heading-m" id="approved-technologies-and-languages">Approved technologies and languages</h2>

Defra restricts the languages and frameworks you can use. This means we can recruit and train against a common stack, and support services over the long term. You should:

- use Node.js with the Hapi framework for frontend and backend services
- only consider .NET or Python for workloads where Node.js is not suitable
- use the [GOV.UK Frontend Nunjucks templates](https://frontend.design-system.service.gov.uk/use-nunjucks/) to build your pages
- not use other frontend frameworks like Vue or React
- use vanilla JavaScript

The [Defra software development standards](https://defra.github.io/software-development-standards/) give more detail on each of these choices. If you need a technology that is not on the list, use the [Defra Tools Radar on Jira](https://eaflood.atlassian.net/jira/software/projects/TR/boards/630) to review approved technologies and request new ones.

<h2 class="govuk-heading-m" id="common-tools">Common tools</h2>

| Tool                                                                                      | Description                                                                        |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [Core Delivery Platform](/architecture-and-software-development/core-delivery-platform)   | Defra's internal development platform for building, deploying and running services |
| [Defra Customer Identity](/architecture-and-software-development/defra-customer-identity) | External authentication and authorisation                                          |
| [Defra Forms](/architecture-and-software-development/defra-forms)                         | Accessible forms that follow GOV.UK standards                                      |
| [Defra Interactive Map](/architecture-and-software-development/defra-accessible-maps)     | Accessible frontend mapping component                                              |
