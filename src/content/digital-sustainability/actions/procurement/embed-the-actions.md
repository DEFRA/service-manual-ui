---
title: "9b. Embed the digital sustainability actions into procurements"
caption: "Procurement"
description: "Write the relevant digital sustainability actions into requirements and contracts. Ask suppliers for the data you need to measure them, and to show which actions they have delivered."
layout: section
sectionNav: nav-ds-procurement
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
  - text: "Procurement"
    href: /digital-sustainability/actions/procurement
  - text: "9b. Embed the digital sustainability actions into procurements"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** any procurement for designing, building, hosting or running a service or other digital project, and the suppliers who deliver it.

**Lead role families:** Procurement

---

## (i) Build the actions into requirements and contracts

As best practice, encourage suppliers to adopt the [digital sustainability actions](/digital-sustainability/actions) when they design, build and deliver government services.

To do this:

- identify which actions are relevant and practical for the project
- write them into [non-functional requirements](/business-analysis/non-functional-requirements), key performance indicators (KPIs) and contract clauses
- ask suppliers to show which actions they have delivered, and check the evidence they give

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, embedding the digital sustainability actions in procurement brings co-benefits in terms of:

- compliance: writing the actions into requirements gives clear evidence for assurance and reporting
- data quality: KPIs and contract clauses mean suppliers report sustainability data in a set format
- delivery time: agreeing the relevant actions up front avoids rework later in the contract

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- supplier pool: extra requirements can raise bid costs and deter smaller suppliers
- effort: someone has to check the evidence suppliers provide, or the clauses lose their force

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [PPN 006: taking account of carbon reduction plans in the procurement of major government contracts](https://www.gov.uk/government/publications/ppn-006-taking-account-of-carbon-reduction-plans-in-the-procurement-of-major-government-contracts) (Cabinet Office): a procurement policy note (PPN) on carbon reduction plans for contracts over £5 million a year
- [PPN 002: taking account of social value in the award of contracts](https://www.gov.uk/government/publications/ppn-002-taking-account-of-social-value-in-the-award-of-contracts) (Cabinet Office): how to weight social value, including environmental outcomes, when awarding contracts
- [Procurement Act 2023 guidance documents](https://www.gov.uk/government/collections/procurement-act-2023-guidance-documents) (Cabinet Office): guidance on running procurements under the Act

</div>
</details>

---

## (ii) Ask suppliers for sustainability data

Many environmental impacts can only be measured with data from the supplier. Write the figures you need into the contract, with the unit, the reporting period and the method the supplier should use.

### Hosting and data centres

- facility-level metrics: Power Usage Effectiveness (PUE), Water Usage Effectiveness (WUE), Carbon Usage Effectiveness (CUE), Renewable Energy Factor (REF), Cooling Efficiency Ratio (CER) and Energy Reuse Factor (ERF)
- service-level metrics: total energy use in kilowatt-hours (kWh), total greenhouse gas emissions in tonnes of carbon dioxide equivalent (tCO2e), water withdrawal and consumption, and IT equipment utilisation
- resilience: the resilience risks identified for the service and its supply chain, and the actions taken

See [measuring the impact of hosting](/digital-sustainability/measure/hosting) for what each metric means and which emissions scopes to report.

### Software as a service

- energy use attributable to the software in kWh, split by component where you can
- hosting location
- data centre PUE, if it is not already in the energy figure
- embodied carbon and expected lifespan of the hardware

See [measuring the impact of software](/digital-sustainability/measure/software).

### AI built into software or provided as a service

- an AI Energy Score, or an equivalent benchmark, for each proposed model, and its energy use
- an attributional lifecycle assessment (LCA) of each proposed model, verified to ISO 14040 and 14044

An attributional LCA adds up the impacts attributable to the product itself. It should cover the model and the data, hardware, networking and infrastructure it uses. It should cover development, training and deployment, in four stages:

- A, raw material acquisition: mining, extracting and processing the materials, and the energy, water and other resources this uses
- B, production of devices: production and assembly, manufacturer support, support equipment and ICT-specific site construction
- C, use: acquiring, processing and storing training data, and training, including research and development, retraining and fine-tuning. Also running the model to answer requests (inference), network transfer, support equipment, and operator and service provider support.
- D, end of life: preparing ICT goods for reuse, and storage, disassembly, dismantling and crushing

At minimum, it should report:

- energy use in watt-hours (Wh)
- greenhouse gas emissions in grams of carbon dioxide equivalent (gCO2e)
- water use in litres or cubic metres
- abiotic resource depletion, the use of minerals and metals, in kilograms of antimony equivalent (kgSb-e)

If the supplier cannot provide an LCA, ask for measured figures or verified estimates for:

- training data
- training
- inference, as a median per token, or per inference if the model does not use tokens
- the embodied impact of the hardware used

See [measuring the impact of AI](/digital-sustainability/measure/ai).

### Hardware

- the number of new devices meeting Type 1 ecolabels (independently certified), such as EPEAT or TCO Certified
- the number of new devices meeting Type 2 ecolabels (claims made by the manufacturer or seller itself)
- lifecycle assessment or product carbon footprint figures, such as power use, embodied carbon, embodied water and recycled content
- device monitoring: energy use in kWh, greenhouse gas emissions, devices kept beyond the standard refresh cycle, and refurbished or remanufactured devices deployed
- end of life: the volume of hardware repaired, refurbished, redeployed, reused, recycled, incinerated or landfilled, and confirmation that data was securely sanitised or destroyed

See [measuring the impact of hardware](/digital-sustainability/measure/hardware).

---

## How to measure this

[Measuring sustainability](/digital-sustainability/measure) explains how to turn supplier figures into energy, carbon and water estimates for your service.
