---
title: Components
caption: Design system
description: Reusable components and patterns from the GOV.UK Design System, with guidance on how to use them in Defra services.
layout: side-nav
supportBox:
  title: Get support
  description: If you need help using components, contact the <strong>Design team</strong>.
  items:
    - '<a href="https://design-system.service.gov.uk/components/" class="govuk-link">View GOV.UK Design System components</a>'
---

## How to use components

Design patterns help teams solve common problems. They let you focus on what is unique to your service.

1.  **Check the GOV.UK Design System**
    Always start with the [GOV.UK Design System](https://design-system.service.gov.uk/). If a component exists there, use it.

2.  **Check existing work**
    If the component is not in the GOV.UK Design System:

    - check if [other teams across government are working on it](https://design-system.service.gov.uk/community/backlog/)
    - check the [Defra design discussions](https://github.com/DEFRA/design-discussions/issues)
    - look at [other departmental design systems](https://github.com/ctdesign/gov-design-systems-list)

3.  **Propose a new pattern**
    If you cannot find what you need, you can [propose a new pattern in the Defra backlog](https://github.com/DEFRA/design-discussions/issues).

## Technical standards

### Namespaces

If you create a custom component or modify an existing one, you must use the `defra-` namespace. This avoids conflicts with the GOV.UK Design System and future updates.

**Default GOV.UK component:**

```html
<button type="submit" class="govuk-button">Save and continue</button>
```

**Custom Defra component:**

```html
<button type="submit" class="govuk-button defra-button">
  Save and continue
</button>
```
