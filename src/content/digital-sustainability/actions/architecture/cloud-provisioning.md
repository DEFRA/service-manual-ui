---
title: "5b. Ensure cloud services are efficiently provisioned"
caption: "Architecture"
description: "There are a range of actions that we can take to maximise the sustainability benefits coming from the shared and scalable resources in the public cloud, reducing energy and water use, e-waste and carbon emissions."
layout: section
sectionNav: nav-ds-architecture
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
  - text: "Architecture"
    href: /digital-sustainability/actions/architecture
  - text: "5b. Ensure cloud services are efficiently provisioned"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Lead role families:** Architecture, IT Operations

**Likely co-benefits:** Cost

---

### (i) Apply appropriate tagging to resources

Tagging is the practice of labelling usage of cloud resources such as virtual machines or databases.

Consistent tagging allows teams to track actual resource usage and so supports data-driven decision-making and identification of waste reduction and optimisation opportunities.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Define your tagging strategy](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-tagging/) Microsoft Azure
- [What are tags?](https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/what-are-tags.html/) Amazon Web Services

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability benefits, appropriately tagging cloud resources brings co-benefits in terms of:

- Cost: Supports granular cost allocation and reporting, enabling improved financial decision-making
- Governance: Enables tracking of workloads (by service team, environment) and improved accountability and governance
- Automation: Tagging enables automation, such as shutdowns or autoscaling to be put in place for tagged resources

</div>
</details>

---

## (ii) Right-size services

Right-sizing means aligning cloud resources with the specific needs of individual workloads, applications, or services.

Monitoring workloads performance allows resources, like virtual machines and storage, to be 'right-sized' to match actual demand. This helps avoid over-provisioning of cloud resources and lowers energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Manage and optimize cloud resources](https://docs.cloud.google.com/architecture/framework/operational-excellence/manage-and-optimize-cloud-resources/) Google Cloud
- [Rightsize to maximize your cloud investment with Microsoft Azure](https://azure.microsoft.com/en-us/blog/rightsize-to-maximize-your-cloud-investment-with-microsoft-azure/) Microsoft Azure
- [Right sizing](https://aws.amazon.com/aws-cost-management/aws-cost-optimization/right-sizing/) Amazon Web Services

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, right-sizing cloud resources brings co-benefits in terms of:

- Cost: Aligning resources with actual usage optimises infrastructure costs
- Scaling: Enables more efficient scaling strategies to be put in place

### Trade-offs

Potential trade-offs may include:

- Operational process: Introduction of operational overhead for monitoring, alerting and tuning cloud usage

</div>
</details>

---

## (iii) Use autoscaling

Autoscaling automatically adds or removes cloud computing resources, such as servers or processing power, to match real-time demand.

Embracing ‘always available’ rather than 'always on', ensures that compute resources automatically scale to zero when not in use, reducing energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Scale down applications when not in use](https://patterns.greensoftware.foundation/operations/capacity-management/scale-down-unused-applications/) Green Software Foundation
- [What is auto scaling?](https://www.ibm.com/think/topics/autoscaling/) IBM
- [Autoscaling](https://learn.microsoft.com/en-us/azure/architecture/best-practices/auto-scaling/) Microsoft Azure
- [AWS Auto Scaling](https://aws.amazon.com/autoscaling/) Amazon Web Services

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, autoscaling brings co-benefits in terms of:

- Cost: Aligning spend to usage can reduce cloud costs
- Performance: Enhances performance and resilience by scaling to meet demand automatically

### Trade-offs

Potential trade-offs may include:

- Complexity: Increased operational complexity in defining scaling rules and thresholds, careful configuration required to avoid over-scaling or under-provisioning

</div>
</details>

---

## (iv) Use spot instances

Spot instances are surplus cloud computing resources that come about when there is spare capaciity on physical servers that are already running.

Cloud providers rent out spot instances at significantly reduced prices.

By improving data centre utilisation, spot instances increase the useful output per unit of energy expended and reduce the need for additional hardware to be used.

Making use of spot instances requires workloads with flexible start and end times, such as batch processing or CI/CD pipelines.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Spot Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html/) Amazon Web Services
- [Create and use Spot VMs](https://docs.cloud.google.com/compute/docs/instances/create-use-spot/) Google Cloud
- [Azure Spot Virtual Machines](https://learn.microsoft.com/en-us/azure/virtual-machines/spot-vms/) Microsoft Azure

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, using spot instances brings co-benefits in terms of:

- Cost: Using spare cloud capacity at reduced rates serves to reduce costs

### Trade-offs

Potential trade-offs may include:

- Workload suitability: Spot instances are not suitable for critical, stateful, or latency-sensitive services

</div>
</details>

See also [5a. Design workloads for modularity, portability and flexibility](/digital-sustainability/actions/architecture/flexible-workloads)

---

## (v) Use a service mesh only if needed

A service mesh is a dedicated infrastructure layer for handling service-to-service communication between microservices.

While service meshes can optimise traffic between microservices and reduce related energy consumption, they also add to energy use through extra compute and resource overhead.

Consider carefully if a service mesh is required for your project or service. Service meshes are more likley to bring benefit for more complex services, and may be unnecessary for smaller systems or simpler architecture.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Evaluate using a service mesh,](https://patterns.greensoftware.foundation/catalog/cloud/evaluate-using-a-service-mesh/) Green Software Foundation
- [Cloud service mesh](https://cloud.google.com/products/service-mesh/) Google Cloud
- [What is a service mesh?](https://aws.amazon.com/what-is/service-mesh/) Amazon Web Services

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, using a service mesh brings co-benefits in terms of:

- Consistency: Improved consistency and control over service-to-service interactions in large, distributed systems
- Reliability: Improved reliability and resilience in complex microservice environments
- Security: Advanced capabilities for microservice communication can enable enhanced security

### Trade-offs

Potential trade-offs may include:

- Complexity: Increased operational complexity coming from the need for configuration, debugging and policy management of service meshes
- Latency: Adding latency due to extra network hops through the mesh layer

</div>
</details>

See also [5a. (i) Design for 'modular' architectural patterns](/digital-sustainability/actions/architecture/flexible-workloads)

---

## (vi) Move from rented infrastructure to platform and serverless models where appropriate

Serverless architecture means creating and running applications without the need to manage server infrastructure.

Serverless computing reduces over-provisioning as it can scale down to zero when inactive, enabling higher efficiencies and reduced energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Use serverless cloud services,](https://patterns.greensoftware.foundation/architecture/technology-selection/use-serverless/) Green Software Foundation

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, moving to serverless brings co-benefits in terms of:

- Effort: Reducing operational overhead (such as patching and scaling)
- Peformance: Improved performance and scalability through platform-managed optimisation

### Trade-offs

Potential trade-offs may include:

- Flexibility: Serverless is not suitable for all workloads (e.g. highly specialised or latency-sensitive systems)

</div>
</details>

---

## (vii) Review and remove unused assets

Unused cloud assets and aged, idle instances continue to consume energy and water.

Review aged instances and decommission unused resources when these are no longer required.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Remove unused assets,](https://patterns.greensoftware.foundation/operations/resource-lifecycle/remove-unused-assets/) Green Software Foundation

</div>
</details>
