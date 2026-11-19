---
title: "Setting boundaries and functional units"
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
  - text: "Setting boundaries and functional units"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
Measurement using the Software Carbon Intensity formula involves choosing a functional unit, as well as setting a system boundary.

## Selecting a system boundary

In order to conduct a calculation of the carbon intensity of a digital service, a system boundary needs to be chosen. This defines which part of a digital system are included in the assessment, and which are not.

A boundary that includes all the segments of a digital service would cover:

- Data centres (where the service is hosted)
- Network infrastructure (enables end to end connectivity of the service)
- End-user devices (such as mobile phones or laptop computers used by those consuming the service)

<div class="govuk-inset-text">

Choosing a boundary that is feasible is essential as a practical starting point for service-level measurement.

</div>

### A recommended boundary for measuring carbon for a digital service

A boundary can be drawn to focus measurement on the aspects of the service that can be changed and influenced by the service team.

A recommended starting boundary that teams can draw for a digital service is:

- The environmental footprint of the infrastructure used to run service in a data centre

This boundary **includes**:

- the impacts of servers and other hardware that is being used by a service in cloud or on- and -off premises data centres.

The boundary **excludes** the following where they are out of service’s scope to control:

- Networking hardware,
- End user device hardware such as phones or laptops
- offline aspects of services, such as paper, travel, and telephone interactions

<div class="govuk-inset-text">

Note: end user devices can be included within the system boundary if equipment is managed, procured or disposed of as part of the service.

</div>

### Calculating carbon for this boundary

The approach taken to calculating the carbon footprint of a service using this boundary differs depends on:

- Service based in the cloud (link)
- Service based in on or off-premises data centres (link)

### Setting a boundary at the level of an individual service component

For complex digital services comprising multiple software components or architectural layers, it may be useful to calculate separate Software Carbon Intensity (SCI) scores for each component, rather than relying solely on a single service-level score.

Different components may have significantly different energy consumption, resource requirements and environmental impacts. Measuring them independently provides greater granularity, helping to identify the components contributing most to the service's overall environmental impact and enabling more targeted optimisation.

Measuring the component before and after a change, using a consistent methodology and comparable workloads, helps distinguish the effect of the change from variations in service use.

Teams can define a component-level measurement boundary to assess the impact of that particular aspect.

<div class="govuk-inset-text">

For example, a team focused on data storage could select a boundary of the data storage footprint rather than the footprint of the whole service.

</div>

## Choosing a functional unit (R)

Depending on whether we are measuring a whole service metric, or particular components of a digital service, we need to select an appropriate functional unit.

### Choosing a functional unit (R) for a whole service

A functional unit should be chosen that represents a core scaling factor, that drives an digital service’s load and resource usage.

For example, for end-user applications, energy use and carbon may likely scale per active user, user-session, or logged-in minute. For a project that involves data, then an appropriate functional unit might be per scheduled job, database transaction, or processed gigabyte of data.

Common examples of functional unit for a whole service include:

- Carbon per number of active users
- Carbon per number of user transactions completed
- Carbon per gigabytes (GB) of data processed

### Choosing a functional unit (R) for an individual service component

Where multiple SCI scores are calculated for different service components, the functional units may also differ and should be selected on the scaling factor of the service component in question.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Aspect</th><th scope="col" class="govuk-table__header">Recommended functional unit (R)</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">User-facing applications</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per active user</li><li>Per user-session</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">AI Inference</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per token (for Large Language Models)</li><li>Per image (for image generation)</li><li>Per workflow execution (for agentic AI)</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Batch or scheduled jobs</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per job executed,</li><li>Per database transaction</li><li>Per page processed</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">APIs and microservices</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per API request</li><li>Per transaction</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Data pipelines</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per job</li><li>Per record processed</li><li>Per Gigabyte transferred</li></ul></td></tr></tbody></table>

The pages on individual Digital Sustainability Actions provide more detail on approaching the measurement of energy use and proxies for the following aspects:

- Data
- Software
- Architecture
- AI
- Journey and Experience
