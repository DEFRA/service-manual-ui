---
title: "3c. Take an efficient software testing approach"
caption: "Software"
description: "Efficient testing saves energy by cutting the time, effort and resources it takes to check how software performs."
layout: section
sectionNav: nav-ds-software
customNav: nav-digital-sustainability
headerServiceName: Sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Sustainability"
    href: /digital-sustainability
  - text: "Digital sustainability actions"
    href: /digital-sustainability/actions
  - text: "Software"
    href: /digital-sustainability/actions/software
  - text: "3c. Take an efficient software testing approach"
---
<div class="app-applies-to">

**This action applies to:** testing of custom software on and off the Core Delivery Platform (CDP), including internal tools.

**Lead role families:** Software and Quality assurance testing

</div>

---

## (i) Adopt a shift-left testing approach

Shift-left testing means you start testing earlier in development. You find issues sooner, which cuts rework, repeated builds and unnecessary compute use. Defra expects teams to [shift testing left](/software-development) with their quality assurance (QA) colleagues.

Shift-right testing complements it. It finds inefficiencies and performance issues once software is live and in real use.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, shift-left testing brings co-benefits in terms of:

- development time: delivery is more efficient and cycles are shorter, because issues are stopped before they move through environments

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Trade-offs from shifting left may include:

- upfront work: more effort upfront on test design, automation and tooling
- later checks: early testing may not fully reflect real-world conditions, so you may still need checks later on

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [What is shift-left testing](https://www.ibm.com/think/topics/shift-left-testing) (IBM)
- [Understanding sustainable software testing](https://www.bcs.org/articles-opinion-and-research/understanding-sustainable-software-testing/) (BCS, The Chartered Institute for IT)

</div>
</details>

---

## (ii) Optimise test scripts

A test script is a set of detailed steps for testing a specific function of a software application.

Optimising test scripts removes redundant or inefficient steps, so testing uses less compute and energy.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Optimising test scripts brings co-benefits in terms of:

- reliability: test suites become more reliable and easier to maintain
- cost: tests run faster and infrastructure costs less

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Optimising test scripts may bring trade-offs such as:

- delivery time: it takes effort to analyse, refactor and maintain test scripts, and to keep optimising them as systems change

</div>
</details>

---

## (iii) Avoid duplicating test data and reuse it

To avoid duplicating test data:

- use the same test data across several tests
- remove duplicate test records
- generate test data when you need it rather than storing it
- remove test data you no longer need, automatically

Less duplicate test data means less storage and processing, so less energy.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, avoiding duplicate test data brings co-benefits in terms of:

- consistency: test environments are more consistent and easier to maintain
- testing speed: tests run faster because there is less data to load, process and clean

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Avoiding duplicate test data may bring trade-offs such as:

- delivery time: reusable, well-structured test data sets take time to design
- complexity: generating data on demand can make test runs more complex and less predictable

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Delete unused storage resources](https://patterns.greensoftware.foundation/operations/resource-lifecycle/delete-unused-storage-resources) (Green Software Foundation): removing idle storage, and the risk of losing data you need later
- [Set storage retention policies](https://patterns.greensoftware.foundation/operations/resource-lifecycle/set-retention-policy-on-storage-resources) (Green Software Foundation): automating deletion of data once it is no longer needed
- [Synthetic data](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/privacy-enhancing-technologies/what-pets-are-there/synthetic-data/) (Information Commissioner's Office): what synthetic data is and how it can stand in for personal data

</div>
</details>

---

## (iv) Make use of parallel testing

Parallel testing lets tests run independently of each other and at the same time. This cuts the total run time. It can also cut energy use, for example by shortening how long test environments need to run. But a shorter run does not always use less energy overall, because more tests run at once.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, parallel testing brings co-benefits in terms of:

- delivery time: less waiting and faster test runs, so developers get feedback sooner

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Parallel testing may also bring trade-offs:

- peak resource use: running many tests at once can raise peak resource use
- complexity: test design, such as managing dependencies and order, and debugging failures both get harder

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Run any tests in parallel](https://learn.microsoft.com/en-us/azure/devops/pipelines/test/parallel-testing-any-test-runner) (Microsoft): splitting a test suite so its parts run at the same time on several agents
- [Testing your service regularly](https://www.gov.uk/service-manual/technology/quality-assurance-testing-your-service-regularly) (GOV.UK Service Manual): automating tests and running them as part of continuous integration

</div>
</details>

---

## (v) Test designs on representative devices and platforms

Test designs on a range of platforms and devices to find inefficiencies, such as heavy scripts and excessive processing. Fixing them reduces energy use.

Defra's standards expect you to test on the browsers and devices GOV.UK requires, including mobile. Include older and lower-specification devices. Software should work well enough on them, so users do not have to replace a device they could keep.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, testing designs on a range of devices and platforms brings co-benefits in terms of:

- accessibility and inclusion: the service supports a wider range of user devices and settings
- delivery time: less risk of over-engineering software for high-end devices

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Testing on a range of representative devices and platforms may bring trade-offs such as:

- delivery time: more testing effort, and you need access to a full range of devices and environments
- complexity: test set-up and environment management can get more complex

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Designing for different browsers and devices](https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices) (GOV.UK Service Manual): which browsers and devices to test on, and how to keep the list current
- [Testing with assistive technologies](https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies) (GOV.UK Service Manual): testing with screen readers, magnifiers and speech recognition software
- [SUS03-BP04 Optimize impact on devices and equipment](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_software_a5.html) (Amazon Web Services): backward compatibility and device farms that reduce the need for new devices
- [Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/) (W3C): guideline 2.17 covers testing on older or low-performance devices

</div>
</details>

---

## (vi) Turn off testing environments when not in use

A test environment holds the hardware, software and network set-up you need to test an application before it reaches live users.

Switch test environments off when you are not using them, for example overnight and at weekends. This saves energy.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, turning off testing environments brings co-benefits in terms of:

- cost: environments switched off overnight and at weekends cost less to run
- security: fewer running environments means fewer systems open to attack

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- start-up time: environments can take time to restart, which may slow the first tests of the day
- automation: scheduled shutdowns need tooling, and long test runs may fail if an environment turns off mid-run
- out-of-hours use: teams working late or on call may need environments outside normal hours

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Minimizing deployed environments](https://patterns.greensoftware.foundation/development/minimizing-deployed-environments) (Green Software Foundation)

</div>
</details>

---

## (vii) Test for page weight

Test web pages for their weight, that is, their size in bytes. This shows up things you do not need, such as scripts, assets and dependencies. Then cut them, and check that pages stay within any page weight budget you have set.

To set a budget, see [set page weight budgets](/digital-sustainability/actions/journeys-and-processes/lightweight-pages-and-documents) (2b).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, reducing page weight can bring co-benefits in terms of:

- user experience: pages load and respond faster
- accessibility and inclusion: lighter pages work well on low-bandwidth connections and low-specification devices

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Testing for page weight can also bring trade-offs such as:

- tooling: you may need extra tools to test page weight

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [How to test frontend performance](https://www.gov.uk/service-manual/technology/how-to-test-frontend-performance) (GOV.UK Service Manual): setting performance budgets, including page size, and tools to test against them
- [Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/) (W3C): guidelines 3.1 and 3.2 cover performance goals and removing unused code

</div>
</details>

---

## How to measure this

To measure the impact of software, read [measuring the impact of software](/digital-sustainability/measure/software).
