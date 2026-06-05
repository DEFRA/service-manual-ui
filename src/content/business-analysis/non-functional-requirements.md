---
title: Non-functional requirements
caption: Your role at Defra
description: Non-functional requirements describe how well a system should work rather than what it should do.
layout: section
sectionTitle: Non-functional requirements
sectionNav:
  - title: In this section
    items:
      - text: Business analysis
        href: /business-analysis
  - title: Ways of working
    items:
      - text: Tools and standards
        href: /business-analysis/ways-of-working
      - text: Non-functional requirements
        href: /business-analysis/non-functional-requirements
      - text: Guardrails
        href: /business-analysis/guardrails
supportBox:
  title: Get support
  description: To request additions or amendments to the NFR list, or for help applying non-functional requirements, contact the <strong>Business Analysis Community</strong>.
  items:
    - '<a href="https://teams.microsoft.com/l/team/19%3Ak2K_FxFXfvjz7V4rv3eBMjIt8V0K0Q70imaDAqo2zxc1%40thread.tacv2/conversations?groupId=ce956adc-8c10-4fd7-91d5-2d1a148530d8&tenantId=770a2450-0227-4c62-90c7-4e38537f1102" class="govuk-link">Join the BA Teams channel</a>'
---

They set the expectations for quality, performance, reliability, and overall user experience.

Think of them as the rules that make a product feel fast, safe, easy to use, and dependable, not the features themselves, but the qualities that make those features work smoothly.

If functional requirements are the 'what', non-functional requirements are the 'how well'.

## Resources

To make sure the target solution (service) is defined appropriately to meet its business need, it is encouraged that a Business Impact Assessment is conducted as early as possible.

In doing so, this will help establish the appropriate Service Tier based on its business need.

All solutions must conduct a business impact assessment to determine the appropriate Service Tier for a solution.

In turn the service tier defines the technical requirements the target solution must adhere to.

The accompanying resources provide guidance to achieve this.

## The use of NFRs across delivery

Across delivery, you should:

- understand business criticality at the earliest opportunity to inform the appropriate Service Tier
- use the NFR catalogue to establish system requirements and drive service standardisation

The Business Analysis process for completing non-functional requirements is as follows:

- BAs work with business owners to understand the [Business Criticality and Service Tier Assessment](https://forms.office.com/Pages/ResponsePage.aspx?id=UCQKdycCYkyQx044U38RArl7q0FXdJBCrlfj9XVhIRRURFhUNUNMRjY1TzhESDY4TzU3SldIT08wQiQlQCN0PWcu)
- hold a BA-led discussion with the delivery team to determine solution-specific non-functional and functional requirements
- build a composite set of requirements
- procurement or build
- testing and assurance
- service transition or go live
- performance matrices (Continuous Service Improvement)

## Service tiering

The service tiers listed below provide an outline definition of the non-functional characteristics for each service tier.

Once a Service Tier for the solution has been defined, all non-functional requirements relating to that service tier must be adhered to as a minimum or an exception waiver sought.

The non-tier-specific category identifies NFRs that relate to all solutions regardless of service tier.

Access the full list of service tiers here: [DDTS Service Tiers](https://defra.sharepoint.com/teams/Team3221/Lists/Service%20Tier/Service%20Tiers%20Gallery%20View%20with%20Description.aspx?viewid=9b4c1431%2Dceb6%2D4be4%2Db4e4%2D2f8c31589d46)

## NFR categories

All of the non-functional requirements are grouped by a set of high-level categories that define particular characteristics of the service.

View the [full list of NFR categories](https://defra.sharepoint.com/teams/Team3221/Lists/Non%20Functional%20Requirement%20Categories/Simple%20List.aspx?viewid=3b04a221-e7d7-4090-9c23-22aa3264ab79).

View the [full list of non-functional requirements](https://defra.sharepoint.com/teams/Team3221/Lists/DDTS%20NFRs/AllItems.aspx?viewid=16d39712%2Dbe5c%2D4566%2D8fa9%2D9338c0e8ce02).

## Availability guidance

A service is defined 'Available' when users are able to access and use all the functions of the System.

Service Availability is measured as a percentage of the total time in a Service Period, in accordance with the following formula:

Service Availability % = (MP - SD) x 100 / MP

where:

- MP = total number of minutes, excluding Permitted Maintenance, within the relevant Service Period
- SD = total number of minutes of service downtime, excluding Permitted Maintenance, in the relevant Service Period

When calculating Availability:

- Downtime arising due to Permitted Maintenance is subtracted from the total number of hours in the relevant Service Period.
- Downtime arising due to a catastrophic national or international outage of both the primary site and the disaster recovery site is subtracted from the total number of hours in the relevant Service Period.
- Availability is only measured for the Live Environment and on a 24x7 basis.
