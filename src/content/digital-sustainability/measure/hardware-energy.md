---
title: "Estimating the energy use of hardware"
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
  - text: "Estimating the energy use of hardware"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
<div class="govuk-inset-text">

This page is for hardware you can see and measure, such as servers in an on-premises or off-premises data centre, and laptops. For services in the cloud, read [calculating carbon for services based in the cloud](/digital-sustainability/measure/cloud-carbon).

</div>

For many services, the starting point is the energy the service uses while it runs.

You can measure energy for the whole service, for reporting, or for a component, to find ways to improve the service.

There are several ways to measure the energy a service uses.

## Measuring hardware directly

When software runs on hardware you can access, such as servers and laptops, you can run controlled experiments to measure the power the service draws. You can use:

- hardware power meters: devices at the wall socket, or current clamps, that measure the total power drawn by hardware such as servers and laptops
- power distribution units (PDUs): in a data centre, intelligent rack PDUs distribute power to several servers and, depending on the model, can measure the energy each server uses
- hardware power sensors: circuits built into components that track the energy used by processors (central processing units, or CPUs, and graphics processing units, or GPUs), cores and memory (DRAM)

If several services share the same hardware, allocate a share of the energy to each one. Read about [allocation](/digital-sustainability/measure/data-centre-carbon).

## Performance engineering and hardware utilisation models

Hardware utilisation models map how much a system is used to how much energy it uses, without physical power meters.

Metrics for tracking utilisation include:

- CPU utilisation or processing time
- GPU utilisation
- memory utilisation
- disk input and output (I/O) activity
- network activity

Utilisation and electrical power are not perfectly proportional. But utilisation can still guide decisions on software development, testing and continuous monitoring.

Several open-source software profilers and frameworks can automate hardware monitoring. For example:

- CodeCarbon: samples power use (in watts or kWh) from hardware components at intervals
- PowerAPI: a software-defined power meter toolkit that measures power use for an application
- Green Algorithms: an open-source framework and online tool that estimates the environmental and carbon footprint of computational science, high-performance computing (HPC) and AI workloads

### API-based measurement

APIs can retrieve power or energy readings from hardware and infrastructure. Collect these readings over time to calculate the energy used by the hardware or workload. For example, Climatiq converts activity data for compute (CPU), storage and memory into CO2e, based on location and utilisation.

### Other estimation models

Where you cannot measure directly and have no detailed utilisation data, estimate energy use from published energy data, manufacturer specifications, supplier information or other relevant datasets.

For example, you can use hardware power ratings and typical utilisation to estimate the energy used by computing resources over a set period.

## Adding data centre overhead

For services hosted in data centres, add the energy used by cooling, power distribution and lighting. Use the data centre's power usage effectiveness (PUE). Read how to [add data centre overhead](/digital-sustainability/measure/data-centre-carbon).
