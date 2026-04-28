---
title: AWS Bedrock
caption: Tools
description: Managed service for foundation models on AWS. Currently in pilot at Defra.
layout: section
sectionTitle: AWS Bedrock
sectionNav:
  - title: In this section
    items:
      - text: Tools radar
        href: /ai-playbook/tools
  - title: Endorse
    items:
      - text: GitHub Copilot
        href: /ai-playbook/tools/github-copilot
  - title: Pilot
    items:
      - text: AWS Bedrock
        href: /ai-playbook/tools/aws-bedrock
      - text: Azure AI Foundry
        href: /ai-playbook/tools/azure-ai-foundry
  - title: Assess
    items:
      - text: Model Context Protocol
        href: /ai-playbook/tools/model-context-protocol
      - text: Agent-to-Agent
        href: /ai-playbook/tools/agent-to-agent
      - text: LangGraph
        href: /ai-playbook/tools/langgraph
      - text: Retrieval-augmented generation
        href: /ai-playbook/tools/retrieval-augmented-generation
      - text: Langfuse
        href: /ai-playbook/tools/langfuse
      - text: AWS Bedrock AgentCore
        href: /ai-playbook/tools/aws-bedrock-agentcore
      - text: Claude Code plugin marketplace
        href: /ai-playbook/tools/claude-code-marketplace
      - text: Git AI
        href: /ai-playbook/tools/git-ai
  - title: All tools
    items:
      - text: Back to tools radar
        href: /ai-playbook/tools
customNav:
  - text: Home
    href: /
  - text: Guidance
    href: /ai-playbook/guidance
  - text: Tools
    href: /ai-playbook/tools
  - text: Patterns
    href: /ai-playbook/patterns
  - text: From the field
    href: /ai-playbook/from-the-field
headerServiceName: AI digital toolkit
headerServiceUrl: /ai-playbook
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI digital toolkit
    href: /ai-playbook
  - text: Tools radar
    href: /ai-playbook/tools
  - text: AWS Bedrock
supportBox:
  title: Get help with AWS Bedrock
  description: Talk to the AI Capability and Enablement team before using Bedrock in delivery.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20AWS%20Bedrock" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="app-tool-meta">
<strong class="govuk-tag govuk-tag--blue">Pilot</strong>
<span class="app-tool-meta__category">Platform</span>
</p>

Amazon Bedrock is a cloud service that gives you access to foundation models from companies like Anthropic, Meta and Amazon through a single API. It runs on AWS infrastructure, using the security and compliance features your account already has.

## What pilot means here

A small number of Defra teams are using Bedrock in real delivery, with support from the AI Capability and Enablement team. The team is collecting evidence on cost, performance and operability before recommending wider use.

## Before you start

Do not use Bedrock in delivery without talking to the AI Capability and Enablement team. They can advise on tenancy, model choice and the controls you need in place.

## When to consider it

Bedrock may be a good fit if you need:

- access to multiple foundation models from one place
- enterprise controls (private VPC, IAM, logging, guardrails)
- to keep data inside AWS where your service already runs

## Deployment options

You can deploy Bedrock in different ways:

- **Standard cloud.** Models run in AWS public cloud regions
- **Private connection.** Connect without using the public internet, using AWS PrivateLink
- **Dedicated capacity.** Reserved computing power for consistent performance
- **On your premises.** Run some models in your own data centres through EKS Anywhere

## Detail

<div class="govuk-accordion" data-module="govuk-accordion" id="bedrock-accordion">
<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="bedrock-accordion-heading-1">Privacy and data handling</span>
</h3>
</div>
<div id="bedrock-accordion-content-1" class="govuk-accordion__section-content">
<h4 class="govuk-heading-s">Privacy controls</h4>
<p class="govuk-body">Bedrock protects your data by default:</p>
<ul class="govuk-list govuk-list--bullet">
<li><strong>No model training</strong>. Your data does not train or improve AI models. This is the default</li>
<li><strong>Private endpoints</strong>. Keep traffic off the public internet using AWS PrivateLink</li>
<li><strong>Health data settings</strong>. Configure the service to handle protected health information, if your account is eligible</li>
<li><strong>Knowledge base privacy</strong>. Control whether your knowledge base data improves the service</li>
</ul>
<h4 class="govuk-heading-s">Terms and data ownership</h4>
<ul class="govuk-list govuk-list--bullet">
<li><strong>You own your content.</strong> Customer content (inputs and outputs) belongs to you, not AWS</li>
<li><strong>Model-specific agreements.</strong> Each foundation-model provider may have its own licence terms</li>
<li><strong>Data protection compliance.</strong> Standard AWS terms cover GDPR and UK data protection</li>
<li><strong>Content restrictions.</strong> Terms ban generating illegal or harmful content</li>
</ul>
<h4 class="govuk-heading-s">Where your data goes</h4>
<p class="govuk-body"><strong>Location and residency.</strong> The AWS Europe (London) region is available, so you can keep data in the UK. Data stays in the region you choose, with clear separation between regions. Custom fine-tuned models are stored in the region where you create them. The London region follows UK law (though AWS as a US company also follows US legal requirements).</p>
<p class="govuk-body">For UK public sector workloads, the team recommends keeping deployments within the London region.</p>
<p class="govuk-body"><strong>In transit.</strong> All communication uses TLS 1.2 or higher. Extra options include AWS PrivateLink (so traffic never goes over the public internet), request signing to prevent tampering with API requests, and mutual TLS for an extra encryption layer.</p>
<p class="govuk-body"><strong>At rest.</strong> Bedrock does not store your requests or responses by default. Fine-tuning data and knowledge bases use AES-256 encryption. Use AWS KMS to control your own encryption keys, and delete custom models and datasets when you no longer need them.</p>
</div>
</div>
<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="bedrock-accordion-heading-2">Audit and access</span>
</h3>
</div>
<div id="bedrock-accordion-content-2" class="govuk-accordion__section-content">
<h4 class="govuk-heading-s">Audit logs</h4>
<p class="govuk-body">Bedrock connects to AWS logging systems:</p>
<ul class="govuk-list govuk-list--bullet">
<li><strong>CloudTrail</strong> records all API calls with user identity, time, source IP and request details</li>
<li><strong>CloudWatch</strong> tracks model operations and can optionally log content</li>
<li><strong>Guardrails logging</strong> monitors policy violations or blocked content when you use content filtering</li>
<li><strong>Evaluation results</strong> stores model performance data so you can track changes over time</li>
</ul>
<h4 class="govuk-heading-s">Access controls</h4>
<ul class="govuk-list govuk-list--bullet">
<li>IAM policies for role-based control over actions and resources</li>
<li>Resource policies attached directly to specific models or resources</li>
<li>Organisation policies to set permission boundaries across multiple AWS accounts</li>
<li>Condition-based access by IP address, time, or other factors</li>
<li>VPC endpoints to control network access to Bedrock</li>
</ul>
</div>
</div>
<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="bedrock-accordion-heading-3">Compliance and certifications</span>
</h3>
</div>
<div id="bedrock-accordion-content-3" class="govuk-accordion__section-content">
<ul class="govuk-list govuk-list--bullet">
<li>ISO 27001, SOC 2 and CSA STAR cover the underlying AWS infrastructure</li>
<li>Cyber Essentials Plus and FedRAMP High authorisation</li>
<li>Aligned with NCSC Cloud Security Principles</li>
<li>ISO 27018 and UK GDPR through the standard AWS Data Processing Agreement</li>
<li>HIPAA eligibility for certain models, with a Business Associate Agreement</li>
<li>Bedrock Guardrails provide content filtering and ongoing safety evaluation</li>
</ul>
<p class="govuk-body">The regional deployment model and customer-managed KMS keys help satisfy UK Government Security Classification Policy requirements for OFFICIAL and OFFICIAL-SENSITIVE information when properly configured.</p>
</div>
</div>
<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="bedrock-accordion-heading-4">Setup and licensing</span>
</h3>
</div>
<div id="bedrock-accordion-content-4" class="govuk-accordion__section-content">
<p class="govuk-body">Use of Bedrock is governed by the AWS Service Terms (with the AI services sections), the model-specific licences from each foundation-model provider, the AWS Privacy Notice, and the AWS AI Services Data Privacy Addendum (available on request).</p>
<p class="govuk-body">HIPAA workloads require an executed Business Associate Agreement and an explicit opt-in in account settings.</p>
</div>
</div>
</div>
