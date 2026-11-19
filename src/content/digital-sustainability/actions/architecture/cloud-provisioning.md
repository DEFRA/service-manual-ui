---
title: "5b. Provision cloud services efficiently"
caption: "Architecture"
description: "Make the most of shared, scalable cloud resources. Efficient provisioning cuts energy and water use, electronic waste and carbon emissions."
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
  - text: "5b. Provision cloud services efficiently"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** services, platforms and infrastructure projects in the public cloud, on and off CDP. On CDP, the platform manages much of the infrastructure, so ask the CDP team which of these settings you control.

**Lead role families:** Architecture and IT operations

---

## (i) Tag resources consistently

Tagging means labelling cloud resources, such as virtual machines or databases, so you can track how they are used.

Consistent tagging lets teams track actual resource use. That supports decisions based on data, and helps you find waste and ways to optimise.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, tagging cloud resources brings co-benefits in terms of:

- cost: you can allocate and report costs in detail, which supports better financial decisions
- governance: you can track workloads by service team and environment, which improves accountability
- automation: you can set up automatic shutdowns or autoscaling for tagged resources

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Define your tagging strategy](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-tagging/) (Microsoft Azure)
- [What are tags](https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/what-are-tags.html) (Amazon Web Services)

</div>
</details>

---

## (ii) Right-size services

Right-sizing means matching cloud resources to what each workload, application or service needs.

Monitor how workloads perform, then right-size resources such as virtual machines and storage to match actual demand. This avoids over-provisioning and uses less energy.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, right-sizing cloud resources brings co-benefits in terms of:

- cost: matching resources to actual use keeps infrastructure costs down
- scaling: you can put more efficient scaling strategies in place

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- operational effort: monitoring, alerting and tuning cloud use takes ongoing work

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Manage and optimize cloud resources](https://docs.cloud.google.com/architecture/framework/operational-excellence/manage-and-optimize-cloud-resources/) (Google Cloud)
- [Rightsize to maximize your cloud investment with Microsoft Azure](https://azure.microsoft.com/en-us/blog/rightsize-to-maximize-your-cloud-investment-with-microsoft-azure/) (Microsoft Azure)
- [Right sizing](https://aws.amazon.com/aws-cost-management/aws-cost-optimization/right-sizing/) (Amazon Web Services)

</div>
</details>

---

## (iii) Use autoscaling

Autoscaling adds or removes cloud computing resources, such as servers or processing power, to match demand as it happens.

Aim for "always available" rather than "always on". Autoscaling can scale resources down when demand is low, and some services can scale to zero when no one is using them. This uses less energy.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, autoscaling brings co-benefits in terms of:

- cost: spend follows use, which can cut cloud costs
- performance: the service scales to meet demand automatically, which helps performance and resilience

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- complexity: scaling rules and thresholds take work to define, and need careful set-up to avoid scaling too far or too little

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Scale down applications when not in use](https://patterns.greensoftware.foundation/operations/capacity-management/scale-down-unused-applications) (Green Software Foundation)
- [What is autoscaling](https://www.ibm.com/think/topics/autoscaling/) (IBM)
- [Autoscaling](https://learn.microsoft.com/en-us/azure/architecture/best-practices/auto-scaling/) (Microsoft Azure)
- [AWS Auto Scaling](https://aws.amazon.com/autoscaling/) (Amazon Web Services)

</div>
</details>

---

## (iv) Use spot instances

Spot instances are spare cloud computing capacity on physical servers that are already running. Cloud providers rent them out at much lower prices.

Spot instances make better use of data centres. You get more useful output for each unit of energy, and less extra hardware is needed.

To use spot instances, a workload needs flexible start and end times, such as batch processing or continuous integration and continuous delivery (CI/CD) pipelines. See [design for time-flexible workloads](/digital-sustainability/actions/architecture/flexible-workloads).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, using spot instances brings co-benefits in terms of:

- cost: spare capacity at lower rates cuts costs

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- workload suitability: spot instances do not suit critical, stateful or latency-sensitive services

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Spot Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html) (Amazon Web Services)
- [Create and use Spot VMs](https://docs.cloud.google.com/compute/docs/instances/create-use-spot/) (Google Cloud)
- [Azure Spot Virtual Machines](https://learn.microsoft.com/en-us/azure/virtual-machines/spot-vms/) (Microsoft Azure)

</div>
</details>

---

## (v) Use a service mesh only if you need one

A service mesh is a layer of infrastructure that handles communication between microservices.

A service mesh can make traffic between microservices more efficient and save energy there, but it also uses energy through extra compute and overhead.

Decide carefully whether your project or service needs one. A service mesh is more likely to help a complex service, and may be unnecessary for a smaller system or a simpler architecture. For modular patterns, see [design for modular architectural patterns](/digital-sustainability/actions/architecture/flexible-workloads).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, using a service mesh brings co-benefits in terms of:

- consistency: more consistent control over how services talk to each other in large, distributed systems
- reliability: better reliability and resilience in complex microservice environments
- security: stronger security for communication between microservices

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- complexity: a service mesh needs configuring, debugging and policy management
- latency: extra network hops through the mesh add delay

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Cloud service mesh](https://cloud.google.com/products/service-mesh/) (Google Cloud)
- [What is a service mesh](https://aws.amazon.com/what-is/service-mesh/) (Amazon Web Services)

</div>
</details>

---

## (vi) Use a shared platform rather than running your own servers

Platform and serverless models let you build and run applications without managing server infrastructure yourself. They cut over-provisioning because they can scale down when inactive, which improves efficiency and uses less energy.

In Defra, the shared platform is CDP, and the [software development guidance](/software-development) expects services to build on it. Anything else is managed as an exception through the Delivery Architecture team's governance process, so serverless needs a recorded architecture decision.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, moving to platform and serverless models brings co-benefits in terms of:

- effort: less operational work, such as patching and scaling
- performance: better performance and scaling through optimisation the platform manages

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- flexibility: serverless does not suit every workload, such as highly specialised or latency-sensitive systems

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Use serverless cloud services](https://patterns.greensoftware.foundation/architecture/technology-selection/use-serverless) (Green Software Foundation)

</div>
</details>

---

## (vii) Review and remove unused assets

Unused cloud assets and old, idle instances still use energy and water.

Review old instances regularly, and decommission resources you no longer need. Check with their owners first.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, reviewing and removing unused assets brings co-benefits in terms of:

- cost: removing idle instances and storage cuts cloud spend
- security: fewer forgotten resources means fewer unpatched systems open to attack
- governance: a clean inventory makes ownership and accountability easier to track

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- data loss: deleting assets may remove data or backups that are needed later, so check with owners first
- effort: finding the owners of old or untagged resources takes time

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Remove unused assets](https://patterns.greensoftware.foundation/operations/resource-lifecycle/remove-unused-assets) (Green Software Foundation)

</div>
</details>

---

## How to measure this

To measure how efficiently your service is provisioned, read [measuring the impact of architectural decisions](/digital-sustainability/measure/architecture).
