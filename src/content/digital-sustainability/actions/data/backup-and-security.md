---
title: "4d. Balance data backup, security and sustainability"
caption: "Data"
description: "Apply security and backup measures proportionate to data sensitivity and risk, avoiding unnecessary resource use."
layout: section
sectionNav: nav-ds-data
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
  - text: "Data"
    href: /digital-sustainability/actions/data
  - text: "4d. Balance data backup, security and sustainability"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Lead role families:** Data, Security

<div class="govuk-inset-text">

Services and other projects in UK Govermment should follow the [Secure by Design](https://www.security.gov.uk/policy-and-guidance/secure-by-design/principles/) security principles.

</div>

---

## (i) Encrypt data only when necessary

Encryption is a security method that takes data from a readable format and translates it into a code (or ciphertext) that can only be read via a 'key'.

Encryption can be a resource-intense process, and can increase data storage volumes as well as the energy consumed through encrypting and decrypting the data.

<div class="govuk-inset-text">

Decisions on data encryption are likely to occur at the level of the enterprise, rather than individual services or other digital projects. Where a project is involved in decisions about encryption, then a risk-based approach should be taken, considering the sensitivity of data

</div>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Encrypt what is necessary](https://patterns.greensoftware.foundation/requirements/encrypt-what-is-necessary/) Green Software Foundation
- [Principle: B3 Data Security](https://www.security.gov.uk/policy-and-guidance/government-cyber-security-policy-handbook/principle-b3-data-security/) Government Security
- [Encryption and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/encryption/encryption-and-data-protection/) Information Commissioner's Office
- [Data encryption and passphrase guidance](https://www.gov.uk/government/publications/lrs-help-and-support/data-encryption-and-passphrase-guidance/) Department for Education
- [Protect data at rest and in transit](https://www.ncsc.gov.uk/collection/device-security-principles-for-manufacturers/protect-data-at-rest-and-in-transit/) National Cyber Security Centre

</div>
</details>

---

## (ii) Optimise backups and redundancies

A backup is a point-in-time copy of your digital data stored separately so you can restore it after a loss, deletion, or cyberattack, while redundancy maintains live, duplicate copies or systems in real time to prevent a single point of failure.

Digital backups and redundancy can create additional data processing and transfer and energy consumption.

Consider:

- The necessity of duplicates and storage
- Where necessary, if shortening retention times is possible

Design backup and redundancy approaches that meet resilience and recovery needs without excessive duplication, storage, or retention.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [What are redundancy, replication, and backup?,](https://learn.microsoft.com/en-us/azure/reliability/concept-redundancy-replication-backup/) Microsoft
- [What is storage optimization and why does it matter?,](https://www.security.gov.uk/policy-and-guidance/government-cyber-security-policy-handbook/principle-b3-data-security/) IBM

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, optimising backups and redundancies brings co-benefits in terms of:

- Cost: Reduced network usage can lead to cost savings

### Trade-offs

Potential trade-offs may include:

- Recovery: Shorter retention periods may limit the ability to recover older data or investigate historical issues

</div>
</details>

---

## (iii) Consider timing of security scans and updates

Security scans identify vulnerabilities and other risks, while security updates fix known issues to keep digital services secure.

Schedule intensive security scans and updates during off-peak hours to take advantage of lower-carbon electricity.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, scheduling security scans and updates during off-peak hours brings co-benefits in terms of:

- Cost: This approach can optimise operational costs where off-peak pricing applies

### Trade-offs

Potential trade-offs may include:

- Suitability: Scheduling security scans during off-peak hours is not suitable for critical security updates or real-time threat response

</div>
</details>

See also: [5c. Shift cloud demand to match the availability of low carbon electricity](/digital-sustainability/actions/architecture/low-carbon-electricity)
