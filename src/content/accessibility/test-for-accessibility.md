---
title: Test for accessibility
caption: How to meet the standard
description:
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

You must use a combination of automated tools, manual checks, and professional audits. Each method finds different types of issues, so you need all three.

## 1. Run automated testing

Automated tools can quickly find common accessibility problems, such as missing alt text, colour contrast issues, or missing form labels.

You should run automated tests regularly during development, not just before going live and fix issues as you find them.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Tools and resources
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">Use the <a href="https://defra-design.github.io/accessibility/" class="govuk-link" target="_blank" rel="noreferrer noopener">Defra accessibility resources on GitHub (opens in a new tab)</a> for guides on:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>estimating user needs</li>
      <li>common accessibility errors</li>
      <li>testing with bookmarklets (if you cannot install browser extensions on managed devices)</li>
    </ul>
    <p class="govuk-body">Common automated testing tools include:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Axe DevTools browser extension</li>
      <li>WAVE browser extension</li>
      <li>Lighthouse (built into Chrome DevTools)</li>
      <li>Pa11y (command-line tool)</li>
    </ul>
  </div>
</details>

## 2. Manually test with assistive technology

Automated tools cannot find everything. You must also test manually with assistive technologies and test with the same assistive technologies your users will use.

For public-facing services, follow the <a href="https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies" class="govuk-link">GDS testing with assistive technologies guidance</a>.

For staff-facing software, test with the assistive technologies used within Defra.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      What to test manually
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">Manual testing should include:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>keyboard navigation (tab through all interactive elements)</li>
      <li>screen reader testing (test with JAWS, NVDA, or VoiceOver)</li>
      <li>testing with users of assistive technology</li>
      <li>checking that all content is accessible without a mouse</li>
      <li>verifying that focus indicators are visible</li>
      <li>testing with zoom levels up to 200%</li>
    </ul>
  </div>
</details>

## 3. Book a professional audit

For Stage Gate 4, you will usually need an independent accessibility audit. This provides third-party assurance that your service meets Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.

You must book your audit well in advance of your go-live date. Audits typically take 2 to 4 weeks to complete, and you will need time to fix any issues found.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      How to get an audit
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">The process typically involves:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>contacting the Defra Accessibility Team for recommendations</li>
      <li>getting quotes from approved auditors</li>
      <li>scheduling the audit (usually 2 to 4 weeks before your planned go-live date)</li>
      <li>providing access to your service and any necessary documentation</li>
      <li>receiving a written audit report with findings and recommendations</li>
    </ul>
    <p class="govuk-body">Read the full guide on <a href="https://defra-design.github.io/accessibility/resources/content/how-to-get-accessibility-audit-defra/" class="govuk-link" target="_blank" rel="noreferrer noopener">how to get an accessibility audit in Defra (opens in a new tab)</a>.</p>
  </div>
</details>

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Audit costs and timing
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">An audit can cost between £8,000 and £30,000 depending on how complex your service is.</p>
    <p class="govuk-body">Factors that affect cost include:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>number of pages or screens</li>
      <li>complexity of functionality</li>
      <li>whether mobile apps are included</li>
      <li>whether you need testing with real users of assistive technology</li>
    </ul>
    <p class="govuk-body"><strong>Timing:</strong> Book your audit 6 to 8 weeks before your go-live date. This gives enough time to schedule the audit 2 to 4 weeks before launch, complete it, and address any required fixes.</p>
  </div>
</details>
