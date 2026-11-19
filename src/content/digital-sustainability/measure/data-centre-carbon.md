---
title: "Calculating carbon for services using on-premise or off-premise data centres"
caption: "Measure sustainability"
layout: section
sectionNav: nav-ds-measure
customNav: nav-digital-sustainability
headerServiceName: Digital sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Digital sustainability"
    href: /digital-sustainability
  - text: "Measure sustainability"
    href: /digital-sustainability/measure
  - text: "Calculating carbon for services using on-premise or off-premise data centres"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
On-premises data centres are those where an organization owns, houses, and maintains physical hardware and software inside their own facility. Off-premises means that an organisation owns or rents hardware, but the equipment is housed in a third-party facility and may be managed by a supplier.

## Calculating the footprint of the overall service

For services hosted in on and off premise data centres the boundary remains the same as for public cloud; the carbon produced by infrastructure hosting the service.

However, the data capture may be more complex than for cloud. For this calculation, the following data is needed:

- An inventory of hardware used to host the service (refer to the energy measurement section
- Energy consumption of the hardware (refer to the energy measurement section), calculated in kWh.
- Location-based carbon intensity factors (see Calculating carbon from energy consumption)
- Embodied carbon of the hardware (see Calculating embodied carbon)

These can then be combined to calculate a carbon footprint over a given time frame.

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>Note that where hardware is shared with other services, emissions will need to be allocated accordingly following the Allocation guidance.</strong></div>

If on- and off-premises data centres are maintained and supported by suppliers, they may be able to provide this data.

## Calculating more granular service emissions

As with cloud, developers may need more granular data on specific components of a service, available over shorter timescales, so they can see how their development and operational decisions affect emissions.

For on and off-premises data centres, work with the infrastructure team or hosting supplier to map the service to the physical servers, virtual machines, storage and network equipment it uses. See the energy section for more details on tools available that can support these calculations.

Core metrics to collect, where available, include:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Compute</dt><dd class="govuk-summary-list__value">physical server model or virtual machine configuration, processor type, allocated CPU or vCPU capacity, GPU capacity where relevant, allocated memory and running hours.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Data storage</dt><dd class="govuk-summary-list__value">capacity consumed (GB/TB) by storage type or tier, input/output (I/O) operations, and snapshot or backup volumes.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Data transfer</dt><dd class="govuk-summary-list__value">volumes transferred between service components and into or out of the data centre, where these fall within the measurement boundary.</dd></div></dl>

Additional data that may be available through infrastructure monitoring tools includes:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Compute and memory</dt><dd class="govuk-summary-list__value">average and peak CPU, GPU and memory utilisation over the assessment period.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Power and energy</dt><dd class="govuk-summary-list__value">server or equipment power readings and energy consumption from hardware telemetry or metered power distribution units.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Resource efficiency</dt><dd class="govuk-summary-list__value">idle, underutilised or over-provisioned servers and virtual machines.</dd></div></dl>

These metrics may be used as proxies without conversion to carbon estimates. For example, improving utilisation can be an indicator of improved sustainability.

These usage metrics can also be converted into estimated energy use (kWh) using modelling approaches and open-source tools. The energy estimates are then and then combined with electricity grid carbon intensity using the [GHG Conversion Factors](https://www.google.com/search?q=ghg+conversion+factors+2026&oq=ghg+&gs_lcrp=EgRlZGdlKgkIABBFGDsY-QcyCQgAEEUYOxj5BzIOCAEQRRg7GEMYgAQYigUyBggCEEUYOzIMCAMQABhDGIAEGIoFMgwIBBAAGEMYgAQYigUyDAgFEAAYQxiABBiKBTIKCAYQABiABBi0BzIGCAcQRRg8MgYICBBFGDwyCAgJEOkHGPxV0gEIMTYxNmowajSoAgGwAgE&sourceid=chrome&source=chrome.ob&ie=UTF-8) , or [Electricity Maps data](https://www.electricitymaps.com/data) to produce carbon emissions (CO2e).

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>Note that where hardware supports several services, allocate a suitable share of its energy to the component, following the Allocation guidance above.</strong></div>

To assess a development change, compare measurements before and after using the same boundary, allocation method and comparable workloads. Record the measurement period, data sources and exclusions, and distinguish measured values from estimates. Tracking emissions per transaction or other appropriate unit of work alongside total emissions can help distinguish efficiency improvements from changes in demand.

## Allocation

When resources such as servers or data centres support several services, allocation may be needed to apportion their emissions between those services. Use directly measured consumption, such as electricity use, where available. If directly measuring is not possible, estimate each service’s share using a relevant activity measure (see proxies section below). Choose an allocation method that best reflects resource use, and document the assumptions and apply the approach consistently. See [GHG Protocol allocation guidance](https://help.sumday.io/hc/en-us/articles/12096180662031-Allocating-Emissions-to-multiple-outputs-or-when-providing-primary-data-to-customers-to-calculate-Scope-3-Guidance-under-the-GHG-Protocol) .

## Adding in data centre overhead to calculate the total energy use of AI models

Once we have a figure for the energy use of hardware, then the ‘data centre overhead’ needs to be factored in. This refers to all the energy consumed by the facility that doesn't directly power the computing hardware.

Power Usage Effectiveness (PUE) is the factor that accounts for data centre overhead, which covers three main buckets:

- Cooling Infrastructure: Chillers, cooling towers, computer room air conditioners, liquid cooling pumps, and facility fans.
- Power Distribution: Uninterruptible Power Supplies (UPS), generators, transformers, and power distribution units (PDUs).
- Other Systems: Facility lighting, security systems, network switchgear, and building management systems.
