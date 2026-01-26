---
title: Defra Interactive Map
caption: Common tools
description: A lightweight, accessible map component for frontend applications in government services.
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
      - text: Defra Integration
        href: /architecture-and-software-development/defra-integration
supportBox:
  title: Get support
  description: If you need help with geospatial data or mapping, contact the <strong>Defra map team</strong>.
  items:
    - 'Email: <a href="mailto:accessible.maps@defra.gov.uk" class="govuk-link">accessible.maps@defra.gov.uk</a>'
---

[Defra Interactive Map](https://github.com/DEFRA/interactive-map) is an open-source mapping component designed for government services, with accessibility at its core.

^ This project is currently in beta. APIs may change without notice.

## Features

The component includes a flexible architecture with a core map and optional plugins:

- drawing tools
- search functionality
- custom datasets
- styling controls
- scale bars
- location services

## Map providers

### MapLibre (recommended)

MapLibre is the reference provider offering out-of-the-box functionality with vector tile support and improved accessibility features.

### Esri (experimental)

An alternative provider with native support for British National Grid coordinate systems. This provider remains experimental with incomplete features.

## Technology

The component is built using:

- React for the UI framework
- MapLibre as the primary mapping engine
- Webpack for bundling
- Jest for testing
- SCSS for styling

The component follows GOV.UK standards and design patterns.
