---
title: "4d. Balance data backup, security and sustainability"
caption: "Data"
description: "Match security and backup measures to how sensitive the data is and to the risk. Then you do not use resources you do not need."
layout: section
sectionNav: nav-ds-data
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
  - text: "Data"
    href: /digital-sustainability/actions/data
  - text: "4d. Balance data backup, security and sustainability"
---
<div class="app-applies-to">

**This action applies to:** services and data platforms on and off the Core Delivery Platform (CDP), including internal tools. Security policy and your service's tier set the minimum for encryption, backups and redundancy. These points apply above that floor, and only with your security team.

**Lead role families:** Data and Security

</div>

<div class="govuk-inset-text">

Services and other projects in UK government should follow the [Secure by Design principles](https://www.security.gov.uk/policy-and-guidance/secure-by-design/principles/). Read Defra's guidance on [creating a secure service](/security).

</div>

---

## (i) Match encryption to data sensitivity, with your security team

Encryption turns readable data into code, called ciphertext, that can only be read with a key. Encrypting and decrypting data uses processing and energy, and encryption can add to the amount of data you store.

Decisions on encryption are usually made for the whole organisation, not by individual services or projects. If your project is involved in a decision about encryption, work with your security team. Take a risk-based approach, based on how sensitive the data is. Any decision to encrypt less needs a documented risk decision, agreed with your security and data protection teams.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, matching encryption to data sensitivity brings co-benefits in terms of:

- cost: less encryption overhead can reduce compute and storage costs
- service performance: avoiding needless encryption and decryption can speed up processing

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- security: encrypting less raises risk if data is misclassified or becomes more sensitive
- compliance: UK GDPR and government security policy may expect encryption
- small gains: encryption on modern hardware is often cheap, so the saving may be small against the risk

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Encrypt what is necessary](https://patterns.greensoftware.foundation/requirements/encrypt-what-is-necessary) (Green Software Foundation)
- [Principle B3 data security](https://www.security.gov.uk/policy-and-guidance/government-cyber-security-policy-handbook/principle-b3-data-security/) (Government Security)
- [Encryption and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/encryption/encryption-and-data-protection/) (Information Commissioner's Office)
- [Data encryption and passphrase guidance](https://www.gov.uk/government/publications/lrs-help-and-support/data-encryption-and-passphrase-guidance) (Department for Education)
- [Protect data at rest and in transit](https://www.ncsc.gov.uk/collection/device-security-principles-for-manufacturers/protect-data-at-rest-and-in-transit/) (National Cyber Security Centre)

</div>
</details>

---

## (ii) Optimise backups and redundancy

A backup is a copy of your data at one point in time, kept apart. Redundancy keeps live copies so one failure does not stop the service. Both add data processing, transfer and energy use.

Check:

- whether you need every copy and all the storage
- whether you can shorten retention times

Design backup and redundancy to meet your resilience and recovery needs without extra duplication, storage or retention. Your service's [non-functional requirements](/business-analysis/non-functional-requirements) and security policy set the minimum.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, optimising backups and redundancy brings co-benefits in terms of:

- cost: storing and moving fewer copies can save money

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- recovery: shorter retention may limit your ability to recover older data or investigate past issues

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [What are redundancy, replication and backup](https://learn.microsoft.com/en-us/azure/reliability/concept-redundancy-replication-backup) (Microsoft)

</div>
</details>

---

## (iii) Schedule routine security scans for lower-carbon times

Security scans find vulnerabilities and other risks. Security updates fix known issues.

Apply security updates, and run any scan you need for a live threat, as soon as they are needed. Do not delay them. You can schedule routine, intensive scans for times when electricity is lower carbon: see [shift workloads in time](/digital-sustainability/actions/architecture/low-carbon-electricity) (5c).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Vulnerability management guidance](https://www.ncsc.gov.uk/guidance/vulnerability-management) (National Cyber Security Centre): applying updates within best-practice timescales, and how to prioritise
- [Vulnerability and penetration testing](https://www.gov.uk/service-manual/technology/vulnerability-and-penetration-testing) (GOV.UK Service Manual): testing often as you build, and again after major code changes

</div>
</details>

---

## How to measure this

To measure the impact of stored and backed-up data, read [measuring the impact of data](/digital-sustainability/measure/data).
