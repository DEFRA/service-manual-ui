---
title: "3c. Take an efficient software testing approach"
caption: "Software"
description: "Efficient testing approaches save energy by reducing the time, effort and resources required to evaluate the performance of software."
layout: section
sectionNav: nav-ds-software
customNav: nav-digital-sustainability
headerServiceName: Digital sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Digital sustainability"
    href: /digital-sustainability
  - text: "Digital sustainability actions"
    href: /digital-sustainability/actions
  - text: "Software"
    href: /digital-sustainability/actions/software
  - text: "3c. Take an efficient software testing approach"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Lead role families:** Software, Quality Assurance Testing

**Likely co-benefits:** Cost, user experience

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about this action</span></summary>
<div class="govuk-details__text">

- GOV.UK Service Manual, [How to test frontend performance](https://www.gov.uk/service-manual/technology/how-to-test-frontend-performance)
- The Chartered Institute for IT, [Understanding sustainable software testing](https://www.bcs.org/articles-opinion-and-research/understanding-sustainable-software-testing/)

</div>
</details>

---

## (i) Adopt a shift-left testing approach

A 'shift-left' approach to testing means beginning testing earlier in the software development cycle. This helps identify issues early, helping reduce rework, repeated builds, and unnecessary compute usage.

A 'shift-right' approach to testing complements shift-left by identifying production inefficiencies and performance issues once software is in a live environment and being used for real.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- IBM, [What is shift-left testing?](https://www.ibm.com/think/topics/shift-left-testing)

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability benefits, shift-left testing brings co-benefits in terms of:

- Overall development time: Improved delivery efficiency and reduced development cycle time as issues are prevented from progressing through environments

### Trade-offs

Trade-offs from 'shifting-left' may include:

- Upfront work: Increased upfront effort in test design, automation, and tooling
- Later validation work: Early testing may not fully replicate real-world conditions, requiring additional later-stage validation

</div>
</details>

---

## (ii) Optimise test scripts

A test script is a set of detailed instructions that outlines the steps to be taken to test specific functionality of a software application.

Optimising test scripts removes redundant or inefficient test steps, and so reduces compute usage and energy consumption when testing is conducted.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- IBM, [What is shift-left testing?](https://www.ibm.com/think/topics/shift-left-testing)

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Optimising test scripts brings co-benefits in terms of:

- Reliability: Improved reliability and maintainability of test suites
- Lower costs: Reduced test times and lower infrastructure costs

### Trade-offs

Optimising test scripts may bring trade-offs such as:

- Delivery time: Additional effort to analyse, refactor and maintain test scripts, and ongoing optimsation needed as systems evolve

</div>
</details>

---

## (iii) Avoid duplication of test data and reuse it where possible

To avoid duplication of testing data, consider:

- using test data across multiple tests
- deduplicating test records
- generating test data on demand to avoid storing it
- automatically removing redundant test data

Reducing duplication of test data reduces the storage and processing of redundant data, reducing energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, avoiding the duplication of test data brings co-benefits in terms of:

- Consistency: Improved consistency and mantainability of test environments
- Testing speed: Faster test execution due to less data to load, process and clean

### Trade-offs

Avoiding duplication of test data may bring trade-offs such as:

- Delivery time: Reusable, well-structured test data sets take time to design
- Complexity: Dynamic or on-demand data generation may increase runtime complexity and variability

</div>
</details>

---

## (iv) Make use of asynchronous testing

Testing software using asynchronous processing allows tests to run independently of each other and in parallel, reducing total runtime and energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, asynchronous testing brings co-benefits in terms of:

- Delivery time: Reduced wait times and faster test completion, leading to faster feedback loops for developers.

### Trade-offs

Asynchronous testing may also lead to trade-offs:

- Peak resource consumption: Higher peak resource usage is possible when multiple tests are running simultaneously
- Complexity: Increased complexity of test design (such as dependency management and ordering) and debugging of test failures

</div>
</details>

---

## (v) Test designs on representative devices and platforms

Test designs on an appropriate range of different platforms and devices, in order to identify inefficiencies (such as heavy scripts and excessive processing). Reducing inefficiencies can in turn reduce energy demands.

Testing on older and lower-specification user devices helps ensure that software performs sufficiently and that users are not obliged to replace their device unnecessarily.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, testing designs on a range of devices and platforms brings co-benefits in terms of:

- Accessibility and inclusivity: Improving accessibility and inclusivity by supporting a wider range of user devices and environments
- Delivery time: Reducing risk of over-engineering software focused on high-end devices

### Trade-offs

Testing on a range of representative devices and platforms may lead to trade-offs such as:

- Delivery time: Increased testing effort and need for access to a full range of devices/environments
- Complexity: Potential additional complexity in test setup and environment management

</div>
</details>

---

## (vi) Turn off testing environments when not in use

Test environments contain the hardware, software, and network configurations needed to test an application before it reaches live users.

Switching off testing environments when not in use saves on energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- Green Software Foundation, [Minimizing deployed environments](https://patterns.greensoftware.foundation/development/minimizing-deployed-environments/)

</div>
</details>

---

## (vii) Test for page weight

Testing web pages for their 'weight' (their size in bytes) can help identify unnecessary components such as scripts, assets and dependencies.

In turn, testing in this way enables reduction of page weights and enforcement of any page weight budgets that have been set, reducing energy consumption.

See also: [2b. Design for lightweight digital pages, notifications and documents](/digital-sustainability/actions/journeys-and-processes/lightweight-pages-and-documents)

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, reducing page weight can bring co-benefits in terms of:

- User experience: Improved page load times and responsiveness
- Accessibility and inclusivity: Lighter pages perform well on low-bandwidth or low-spec devices

### Trade-offs

Testing for page weight can also bring trade-offs such as:

- Tooling: Testing for page weight may require additional tooling

</div>
</details>
