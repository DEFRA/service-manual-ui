---
title: "Calculating carbon for services using on-premises or off-premises data centres"
caption: "Measure sustainability"
layout: section
sectionNav: nav-ds-measure
customNav: nav-digital-sustainability
headerServiceName: Sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Sustainability"
    href: /digital-sustainability
  - text: "Measure sustainability"
    href: /digital-sustainability/measure
  - text: "Calculating carbon for services using on-premises or off-premises data centres"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
In an on-premises data centre, an organisation owns, houses and maintains the hardware and software in its own building. Off-premises means the organisation owns or rents the hardware, but it sits in a third-party building. A supplier may manage it.

Other measurement pages link here for two things: allocation, and adding data centre overhead with power usage effectiveness (PUE).

## Whole-service footprint

Use the same boundary as for public cloud: the infrastructure that hosts the service. Read about the [recommended boundary](/digital-sustainability/measure/boundaries-and-units).

Getting the data may be harder than for cloud. You need:

- a list of the hardware that hosts the service
- the energy the hardware uses, in kWh (read about [estimating the energy use of hardware](/digital-sustainability/measure/hardware-energy))
- location-based carbon intensity factors (read about [converting energy to carbon](/digital-sustainability/measure/carbon))
- the embodied carbon of the hardware (read about [calculating embodied carbon](/digital-sustainability/measure/embodied-carbon))

Combine these to calculate a carbon footprint over a set period.

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>If the hardware is shared with other services, allocate a share of its emissions to your service. Follow the allocation guidance on this page.</strong></div>

If suppliers maintain and support the data centre, they may be able to give you this data.

## Component-level emissions

As with cloud, developers may need more detailed data on specific components, over shorter periods. This shows them how their development and operational decisions affect emissions.

Work with the infrastructure team or hosting supplier to map the service to the physical servers, virtual machines, storage and network equipment it uses. [Estimating the energy use of hardware](/digital-sustainability/measure/hardware-energy) describes tools that can help with these calculations.

Core metrics to collect, where available, include:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Compute</dt><dd class="govuk-summary-list__value">Physical server model or virtual machine configuration, processor type, allocated CPU or vCPU capacity, GPU capacity where relevant, allocated memory and running hours</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Data storage</dt><dd class="govuk-summary-list__value">Capacity used (GB or TB) by storage type or tier, input and output (I/O) operations, and snapshot or backup volumes</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Data transfer</dt><dd class="govuk-summary-list__value">Volumes transferred between service components and into or out of the data centre, where these are inside the boundary</dd></div></dl>

Infrastructure monitoring tools may also give:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Compute and memory</dt><dd class="govuk-summary-list__value">Average and peak CPU, GPU and memory utilisation over the assessment period</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Power and energy</dt><dd class="govuk-summary-list__value">Server or equipment power readings and energy use from hardware telemetry or metered power distribution units</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Resource efficiency</dt><dd class="govuk-summary-list__value">Idle, underused or over-provisioned servers and virtual machines</dd></div></dl>

You can use these metrics as [proxies](/digital-sustainability/measure/data-and-proxies) without converting them to carbon. For example, better utilisation can show improved sustainability.

You can also convert them into estimated energy use (kWh) with modelling approaches and open-source tools. Then combine the energy estimates with grid carbon intensity to produce carbon emissions (CO2e). For grid carbon intensity, use the [UK government conversion factors for greenhouse gas reporting](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting) (GOV.UK) or [Electricity Maps data](https://www.electricitymaps.com/data).

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>If hardware supports several services, allocate a share of its energy to the component. Follow the allocation guidance on this page.</strong></div>

To assess a development change, compare measurements before and after, with the same boundary, allocation method and comparable workloads. Record the measurement period, data sources and exclusions, and say which values are measured and which are estimated. Track emissions per transaction, or another unit of work, alongside total emissions. This separates efficiency gains from changes in demand.

## Allocation

When servers or data centres support several services, share their emissions between those services.

- Use directly measured consumption, such as electricity use, where you have it.
- If you cannot measure directly, estimate each service's share from a relevant activity measure over the measurement period. For example, use CPU time, memory allocation or other workload activity. Read about [activity-based proxies](/digital-sustainability/measure/data-and-proxies).
- If you have no more detailed metrics, use spend.

Choose the method that best reflects resource use. Write down your assumptions and use the same method each time.

Read about [allocating emissions to multiple outputs under the GHG Protocol](https://help.sumday.io/hc/en-us/articles/12096180662031-Allocating-Emissions-to-multiple-outputs-or-when-providing-primary-data-to-customers-to-calculate-Scope-3-Guidance-under-the-GHG-Protocol) (Sumday).

## Data centre overhead (PUE)

Once you have the energy used by the hardware, add the data centre overhead. This is all the energy the building uses that does not directly power computing hardware.

Power usage effectiveness (PUE) is the ratio of a data centre's total energy use to the energy used by its IT equipment. Multiply your hardware energy by the PUE:

<div class="govuk-inset-text">

Total energy (kWh) = PUE × IT hardware energy (kWh)

</div>

The overhead covers 3 main areas:

- cooling: chillers, cooling towers, computer room air conditioners, liquid cooling pumps and facility fans
- power distribution: uninterruptible power supplies (UPS), generators, transformers and power distribution units (PDUs)
- other systems: lighting, security systems, network switchgear and building management systems

Ask your hosting supplier or data centre for its PUE.
