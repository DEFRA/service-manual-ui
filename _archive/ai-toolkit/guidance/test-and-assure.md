---
title: Test and assure your AI service
caption: Deliver with AI
description: How to test and assure an AI service before and after it goes live. Evaluation-driven development, guardrail testing and monitoring for Defra teams building with AI.
layout: section
sectionTitle: Deliver with AI
sectionNav:
  - title: In this section
    items:
      - text: Deliver with AI
        href: /ai-toolkit/deliver-with-ai
  - title: Choose tools and use data
    items:
      - text: Choosing a tool
        href: /ai-toolkit/guidance/choosing-a-tool
      - text: Using data with AI
        href: /ai-toolkit/guidance/using-data-with-ai
      - text: Shared team knowledge bases
        href: /ai-toolkit/guidance/team-knowledge-bases
  - title: Build an AI service
    items:
      - text: Get approval before you build
        href: /ai-toolkit/guidance/get-approval
      - text: AI in your CI/CD pipeline
        href: /ai-toolkit/guidance/ai-in-pipelines
      - text: Test and assure your AI service
        href: /ai-toolkit/guidance/test-and-assure
  - title: Use AI responsibly
    items:
      - text: Security
        href: /ai-toolkit/guidance/security
      - text: Keeping data safe
        href: /ai-toolkit/guidance/keeping-data-safe
      - text: Ethics
        href: /ai-toolkit/guidance/ethics
      - text: Sustainability
        href: /ai-toolkit/guidance/sustainability
      - text: Report an AI incident
        href: /ai-toolkit/guidance/report-an-ai-incident
customNav:
  - text: Home
    href: /
  - text: Deliver with AI
    href: /ai-toolkit/deliver-with-ai
  - text: Find a tool
    href: /ai-toolkit/tools
  - text: Use AI patterns
    href: /ai-toolkit/patterns
  - text: Learn from others
    href: /ai-toolkit/projects
headerServiceName: AI digital toolkit
headerServiceUrl: /ai-toolkit
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI digital toolkit
    href: /ai-toolkit
  - text: Deliver with AI
    href: /ai-toolkit/deliver-with-ai
  - text: Test and assure your AI service
supportBox:
  title: Ask AICE about testing AI
  description: Get help shaping an evaluation set, or a review before your service assessment.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Testing%20and%20assuring%20AI" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">This is for teams building an AI feature or service, for example something powered by a large language model. Testing AI is different from testing ordinary software, because the output is probabilistic and changes as models and prompts change.</p>

## Test the system and evaluate the model separately

The cross-government AI testing approach splits the work in two. Do both.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong>System testing.</strong> The infrastructure, APIs, interfaces and integrations. This is your normal engineering testing and the usual standards apply.</li>
<li><strong>Model evaluation.</strong> The quality of what the model produces. This needs its own approach, because a passing unit test does not tell you whether an answer is correct.</li>
</ul>

## Use evaluation-driven development

The team behind GOV.UK Chat found that evaluation-driven development is essential. Treat it the way you treat test-driven development.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>Define clear success criteria before you build.</li>
<li>Measure every change against them, and be willing to abandon what does not work.</li>
<li>Read the actual outputs, not just the aggregate metrics. Error analysis on real answers tells you more than a single score.</li>
</ul>

## Evaluate against these six criteria

GOV.UK Chat evaluates its answers against six criteria. They are a good default set for any retrieval or question-answering service at Defra.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong>Groundedness.</strong> Answers are grounded in your source material, not invented.</li>
<li><strong>Relevance.</strong> It answers the question, and correctly refuses questions that are out of scope.</li>
<li><strong>Factual accuracy.</strong> What it says is correct.</li>
<li><strong>Factual completeness.</strong> It does not leave out important detail.</li>
<li><strong>Reliability.</strong> It behaves consistently across similar questions.</li>
<li><strong>Reputational safety.</strong> It will not produce content that damages public trust in Defra.</li>
</ul>

## Build in human control and fail-safe behaviour

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>Design the service to fail safe and default to human control when a question is outside what it can handle.</li>
<li>Agree acceptable error rates with your team before launch, and do not deploy until the service is within them.</li>
<li>For anything citizen-facing, give people a way to check the answer at source. GOV.UK Chat found users expect this and value it.</li>
</ul>

## Test your guardrails against attack

Treat the guardrails as something to break before someone else does.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>Red-team your service with prompt injection and jailbreak attempts before it goes live. In its public pilots, GOV.UK Chat blocked every jailbreak attempt made against it, which is the standard to aim for.</li>
<li>Never let raw model output trigger a privileged action on its own. See <a href="/ai-toolkit/guidance/security" class="govuk-link">Security</a> for why model output is untrusted input.</li>
</ul>

## Monitor after launch

An AI service is not done at launch. Models drift and real users do unexpected things.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>Monitor behaviour, inputs and outputs in production, not just uptime.</li>
<li>Schedule regular audits and performance reviews for the life of the service.</li>
<li>Name an accountable owner for the model's performance, decisions and compliance.</li>
</ul>

## Bring your evidence to the service assessment

An AI service still faces a normal [service assessment](/service-assessments). Bring your evaluation results, your monitoring plan, your [ATRS](/ai-toolkit/guidance/ethics) status and your DPIA. Talk to AICE before the assessment if you want a dry run.
