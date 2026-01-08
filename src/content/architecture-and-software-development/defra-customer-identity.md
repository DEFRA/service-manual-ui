---
title: Defra Customer Identity
caption: Common tools
description: Use Defra Customer Identity to allow users to sign in once and access multiple Defra services.
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
  description: If you need help with authentication, contact the <strong>Customer Identity team</strong>.
  items:
    - 'Email: <a href="mailto:customer.identity@defra.gov.uk" class="govuk-link">customer.identity@defra.gov.uk</a>'
---

Defra Customer Identity (also known as IDMv2 or Defra ID) lets users sign in once to access multiple Defra services.

## When to use Customer Identity

Use Customer Identity when your service needs to identify external users and the organisations they operate on behalf of.

## How it works

Customer Identity uses GOV.UK One Login and HMRC's Government Gateway as identity providers. It also provides invitation-only access for trusted third parties.

When users register, Customer Identity stores their contact details, organisation accounts, and the relationships between them in a centralised datastore. Your service can then access this information.

## Benefits

Using Customer Identity means you:

- do not need to build your own identity management system
- can share customer information across Defra services
- give users a familiar sign-in experience

[View the Customer Identity SharePoint site (opens in new tab)](https://defra.sharepoint.com/sites/Community3868/SitePages/Customer%20Identity.aspx)
