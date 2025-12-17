---
title: Defra Customer Identity
caption: How to do this
description: Use Defra Customer Identity to give users single sign-on access to Defra services.
layout: section
sectionTitle: Architecture and software development
sectionNav:
  - title: In this section
    items:
      - text: Architecture and software development
        href: /architecture-and-software-development
  - title: How to do this
    items:
      - text: Design your service
        href: /architecture-and-software-development/design-your-service
  - title: Common tools
    items:
      - text: Overview
        href: /architecture-and-software-development/common-tools
      - text: Defra Customer Identity
        href: /architecture-and-software-development/defra-customer-identity
supportBox:
  title: Get support
  description: If you need help integrating with Customer Identity, contact the <strong>Customer Identity team</strong>.
  items:
    - 'Email: <a href="mailto:customer.identity@defra.gov.uk" class="govuk-link">customer.identity@defra.gov.uk</a>'
---

Defra Customer Identity (also known as IDMv2 or Defra ID) lets users sign in once to access multiple Defra services.

## When to use Customer Identity

Use Customer Identity when your service needs to identify users or share user information with other Defra services.

## How it works

Customer Identity uses GOV.UK One Login and HMRC's Government Gateway as identity providers. It also provides invitation-only access for trusted third parties.

When users register, Customer Identity stores their contact details, organisation accounts, and the relationships between them in a centralised datastore. Your service can then access this information.

## Benefits

Using Customer Identity means you:

- do not need to build your own identity management system
- can share customer information across Defra services
- give users a familiar sign-in experience

[View the Customer Identity SharePoint site (opens in new tab)](https://defra.sharepoint.com/sites/Community3868/SitePages/Customer%20Identity.aspx)
