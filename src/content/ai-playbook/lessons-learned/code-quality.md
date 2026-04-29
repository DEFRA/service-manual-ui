---
title: Polished AI code can hide problems
caption: Lessons learned
description: ''
layout: section
sectionTitle: From the field
sectionNav:
  - title: In this section
    items:
      - text: From the field
        href: /ai-playbook/from-the-field
  - title: Case studies
    items:
      - text: Nature Restoration Fund Discovery
        href: /ai-playbook/case-studies/nrf-discovery
      - text: Packing List Parser cycle time
        href: /ai-playbook/case-studies/plp-cycle-time
      - text: Nature Restoration Fund Alpha
        href: /ai-playbook/case-studies/nrf-alpha
  - title: Lessons learned
    items:
      - text: Polished AI code can hide problems
        href: /ai-playbook/lessons-learned/code-quality
      - text: Set clear rules to avoid shadow IT
        href: /ai-playbook/lessons-learned/governance
      - text: Always validate AI outputs
        href: /ai-playbook/lessons-learned/output-validation
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
  - text: Polished AI code can hide problems
supportBox:
  title: Get involved
  description: The <strong>AI Capability and Enablement team</strong> welcomes contributions and feedback.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---
Polished code that had passed senior reviews became impossible to maintain. Two developers using AI created thousands of lines that could not be fixed or extended.

## Overview

A greenfield project ran for 6 months with an established team. Two new mid-to-senior developers joined and were given an area to work on together. They had been onboarded to the AI pilot scheme with enthusiasm about using AI extensively. The team had full quality controls in place. Pre-commit checks ran automatically. Test coverage requirements were enforced. Most importantly, senior engineers reviewed every pull request manually.

After 2 months of development, something went wrong in their area. The lead engineer embedded in that codebase for the first time and found a horrendous mess. The code was unfixable and remains in the codebase today.

## How they used AI

The developers used AI to generate features across their segment of the application. The onboarding process had shown them a workshop where one prompt generated an 8-page application. This created a false impression that AI could handle large amounts of code without careful review. They used AI for each new feature, letting it write code paths from API level through to service calls.

## What happened

Every pull request looked perfect at first glance. Code formatting was excellent. Variable names made sense. Function length and class structure followed best practices. These are areas where junior developers typically struggle, but AI handled them well.

The problem was invisible in individual pull requests. Each change made sense in isolation. Senior reviewers saw coherent, well-formatted code that appeared to work correctly.

But the AI created duplicate code paths instead of reusing existing ones. When similar functionality was needed, it wrote completely new implementations rather than calling existing functions. Worse, the new code would have random interactions with old code. High coupling with low reuse created spaghetti code.

This created a new kind of mess. With normal legacy code, you can follow the developer's thought process and understand how it evolved. AI-generated code has no consistent pattern. Arbitrary decisions layer on top of each other with no logical thread. This makes the code impossible to unravel.

## Outcomes and impact

Thousands of lines of code became unmaintainable within 2 months. The code could not be extended. It could not be removed. The delivery timeline meant refactoring was not an option. The code worked despite being terrible to maintain, so it shipped.

The AI also polluted the codebase for future development. AI tools learn from existing code. The messy code now teaches the AI bad patterns, creating a vicious cycle.

## What the team learned

Code reviews must look beyond individual changes. Reviewers need to understand how new code interacts with existing code, not just whether the new code looks correct.

The engineers writing the code should have been the human in the loop. They needed to take accountability for every line added. They should have questioned why AI was creating new functions instead of reusing existing code paths.

AI can spot this kind of mess. The team introduced AI code reviews as part of their standard process. AI proved good at identifying tangled code patterns that human reviewers missed.

Onboarding materials were changed. The team stopped encouraging mid-to-junior engineers to use AI heavily for code generation. Training now emphasises the risks rather than showing impressive demos. The message changed from "revolutionise your workflow" to "understand what you are generating".
