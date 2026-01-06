---
title: Manage accessibility in your project
caption: How to meet the standard
description: Managing accessibility risks, budget, and supplier checks through stage gates.
layout: section
sectionTitle: Accessibility
sectionNav:
  - title: In this section
    items:
      - text: Make sure everyone can use the service
        href: /accessibility
  - title: How to do this
    items:
      - text: Manage accessibility in your project
        href: /accessibility/manage-accessibility
      - text: Test for accessibility
        href: /accessibility/test-for-accessibility
---

You must consider accessibility at every stage of your project to pass the necessary stage gates.

## 1. Discovery and definition

**When: Gates 0 and 1**

Contact the Defra Accessibility Team about your project as early as possible.

Include accessibility requirements in your user research and stakeholder expectations from the start.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Add accessibility risk to your risk register
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">Add this standard risk to your risk register:</p>
    <blockquote class="govuk-body">
      "The system may not comply with accessibility regulations. We may be breaking the law (Public Sector Accessibility regulations / Equality Act Duty) and incur additional costs to fix the system later."
    </blockquote>
  </div>
</details>

## 2. Delivery strategy

**When: Gate 2**

You must demonstrate that your requirements are correct and the budget is available.

Include accessibility in your tender requirements or user needs. Use the [Draft accessibility requirements for tenders guide](https://defra-design.github.io/accessibility/resources/content/draft-accessibility-requirements-tenders/).

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Budget to allocate
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">Allocate budget for:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>external audits (approximately £8,000 to £30,000)</li>
      <li>defect resolution</li>
      <li>specialist roles (such as QA engineers or content designers)</li>
    </ul>
  </div>
</details>

## 3. Investment and design

**When: Gate 3**

If you are using a supplier, you must confirm their product is accessible _before_ you sign a contract or start the build.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Checks for suppliers
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">Do not rely on a supplier's claim. Ask these questions and send the answers to the Accessibility Team:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Does the software conform to WCAG 2.2 at level AA?</li>
      <li>Who performed the audit? (We prefer third-party assurance over self-testing.)</li>
      <li>Are you using overlays or plugins? (Defra does not accept the use of overlays.)</li>
      <li>Will you rectify non-conformance at no extra cost?</li>
    </ul>
  </div>
</details>

You must have a written plan that includes manual testing with users of assistive technology. Automated testing is not enough.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      What to include in your testing plan
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">Your testing plan should include:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>manual testing with users of assistive technology</li>
      <li>testing with the assistive technologies used by your users</li>
      <li>automated testing tools (as a supplement, not a replacement)</li>
      <li>key user journeys and critical functionality</li>
    </ul>
  </div>
</details>

## 4. Readiness for service

**When: Gate 4**

Before going live, you must:

- provide a written audit report confirming WCAG 2.2 AA compliance
- publish a compliant accessibility statement on your service
- have a plan to fix any minor defects within 12 weeks of going live

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      What makes a compliant accessibility statement
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">Your accessibility statement must include:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>whether your service meets WCAG 2.2 level AA</li>
      <li>any parts that are not fully accessible and why</li>
      <li>what you're doing to fix any issues</li>
      <li>how users can report accessibility problems</li>
      <li>details of any exemptions</li>
    </ul>
    <p class="govuk-body">Use the <a href="https://www.gov.uk/guidance/model-accessibility-statement" class="govuk-link" target="_blank" rel="noreferrer noopener">GOV.UK accessibility statement template</a> to ensure your statement is compliant.</p>
  </div>
</details>

## 5. Live service

**When: Gate 5**

Confirm there are no outstanding defects. If defects arise, you must update your accessibility statement and roadmap immediately.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      What to do if defects are found
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">If accessibility defects are found after going live:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>update your accessibility statement immediately to reflect the current state</li>
      <li>create a roadmap showing when you will fix each issue</li>
      <li>prioritise fixes that affect critical user journeys</li>
      <li>contact the Defra Accessibility Team for advice on complex issues</li>
    </ul>
  </div>
</details>
