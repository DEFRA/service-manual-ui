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
The starting point for many services will be to quantify the energy consumed from the use-phase of the service.

Energy may be measured at the whole service level for reporting purposes, or at component level to drive action and insight into improving the service.

There are a few methods to measure the energy consumption of a service. These are:

## Direct measurement of energy used by hardware

When software and services run on hardware we have visibility of, such as servers and laptops, controlled experiments can be run to directly measure the power draw of the service. This can be done through:

- Hardware power meters: devices placed at the wall socket or via current clamps measure total physical power drawn by hardware such as servers and laptops
- Power Distribution Units (PDU): In a data centre, intelligent rack power distribution units distribute power to multiple servers, and can measure energy consumption at individual server level, depending on capability.
- Hardware power sensors: integrated internal circuits and components that track energy consumption for processors (Core Processing and Graphical Processing Units), cores, and Dynamic Random-Access Memory (DRAM).

Where multiple services share the same underlying hardware, an allocation methodology is required to apportion energy consumption between services. This may use resource utilisation, such as CPU time, memory allocation or other workload activity, over the measurement period. Spend may also be used where more granular metrics are not available.

## Performance engineering techniques and hardware utilization models

Hardware utilisation models maps system usage metrics to energy consumption without needing physical power meters to measure it directly.

Metrics used to track resource utilisation can include:

- Central Processing Unit (CPU) utilisation or processing time
- Graphics Processing Unit (GPU) utilisation
- Memory utilisation
- Disk Input/Output (I/O) activity
- Network activity

While resource utilisation and electrical power are not perfectly proportional, hardware utilisation approaches can help guide decisions on software development, testing and continuous monitoring.

There are a number of open-source software profilers and frameworks that can be used to automate hardware monitoring. Some examples are:

- CodeCarbon: A tool that periodically samples power consumption (in Watts or kWh) from underlying hardware components
- PowerAPI: A software-defined power meter toolkit designed to measure application-level power consumption
- Green Algorithms: an open-source framework and online tool designed to estimate and reduce the environmental and carbon footprint of computational science, high-performance computing (HPC), and artificial intelligence workloads

### API-based measurement

APIs can be used to retrieve power or energy consumption readings from hardware components and infrastructure. These readings can be collected over time to calculate energy consumption attributable to the hardware or workload. For example, Climatiq converts operational activity data into CO2e for the power consumption for computing (CPU), storage and memory, based on location and resource utilisation

### Other estimation models

Where direct measurement or detailed hardware utilisation data is not available, energy consumption can be estimated using published energy consumption data, manufacturer specifications, supplier information or other relevant datasets.

For example, hardware power ratings and typical utilisation assumptions can be used to estimate the energy consumption of computing resources over a defined period.

## Accounting for data centre overheads

For services hosted in data centres, the energy consumed by supporting infrastructure, such as cooling, power distribution and lighting, can be accounted for using the data centre's Power Usage Effectiveness (PUE) rating.

<div class="govuk-inset-text">

Total Energy = PUE x IT Hardware energy

</div>
