# Deliver with AI: comms and governance sign-off pack

This pack lists everything in the redesigned **Deliver with AI** section that makes a
prescriptive claim, names a Defra control, or needs a real value filled in. Use it to
get the section signed off before it goes live.

Branch: `experiment/ai-toolkit-redesign-v3` (local only, not pushed).

## What the section now contains

The left-nav has three task-led groups:

- **Choose tools and use data**: Choosing a tool, Using data with AI, Shared team knowledge bases
- **Build an AI service**: Get approval before you build, AI in your CI/CD pipeline, Test and assure your AI service
- **Use AI responsibly**: Security, Ethics, Sustainability, Information governance, PII and data handling, Report an AI incident

## 1. Placeholders that need a real value

These are best guesses and must be confirmed before publishing.

- **AI training SharePoint URL** on the hub. Guessed from the governance URL pattern. Confirm the real page.
- **AI governance SharePoint URL** on the hub. Believed correct, but confirm.
- **CDP documentation URL** on the hub. Educated guess. Confirm.
- **Defra security incident route** on Report an AI incident. Currently generic ("line manager, information asset owner, Defra's security incident process"). Slot in the actual channel or form.
- **Spend control thresholds** on Get approval. Stated as "around £100,000 public-facing and £1 million otherwise". Confirm current figures and the link.

## 2. The data matrix (highest priority for AICE to validate)

On **Using data with AI**. Each cell is defensible from existing sources, but no one at
AICE has signed it off cell by cell. Validate before it goes in front of an information
governance reviewer.

| Your data | Public consumer tool | Enterprise tool in Defra tenant | Defra-hosted |
|---|---|---|---|
| Public or open | Yes | Yes | Yes |
| OFFICIAL | Yes, with privacy settings on | Yes | Yes |
| OFFICIAL-SENSITIVE | No | Yes | Yes, with a DPIA |
| Personal data | No | DPIA required | DPIA required |
| SECRET (SEC2 or SEC3) | No | No | No |

External validation: this aligns with the Equal Experts AD3 policy (cloud or consumer AI is
OFFICIAL only; OFFICIAL-SENSITIVE only via M365 Copilot in the Defra environment) and with
the Defra AI SDLC tool guidance.

## 3. Prescriptive claims and their sources

Every claim below is sourced. Confidence is Settled (well established) or Emerging (newer,
worth a watching brief).

### Tools and classification
- "OFFICIAL only by default; higher classifications need approval and a DPIA." Source: NCSC; standard HMG classification practice. Settled.
- Tool categories (public consumer, enterprise-in-tenant, Defra-hosted). Source: Equal Experts AD3 policy tool categories. Settled.

### Security (named Defra gates)
- "Run SonarQube on all AI-generated code." Source: Defra's existing SAST gate; already referenced on the MCP page. Settled.
- "Treat AI output as untrusted; prompt injection cannot be fully fixed." Source: NCSC, "Prompt injection is not SQL injection". Settled.

### Ethics and transparency
- "A DPIA is required before AI processes personal data." Source: ICO guidance on AI and data protection. Settled.
- "Publish an ATRS record if the tool significantly influences a public-facing decision or interacts directly with the public." Source: ATRS Mandatory Scope and Exemptions Policy; mandatory across central government from 6 Feb 2024. Settled.
- "Welsh Language Standards still apply to AI-generated public content; machine-translated Welsh needs human QA." Source: Welsh Language Commissioner policy on AI, Aug 2025. Emerging.

### Sustainability
- "Proportionate AI use is part of meeting the Greening Government Commitments." Source: Greening Government Commitments (Defra owns this agenda). Settled.

### Building an AI service
- Six evaluation criteria (groundedness, relevance, accuracy, completeness, reliability, reputational safety). Source: the GOV.UK Chat team. Settled.
- "Fail safe and default to human control; keep error rates within agreed bounds; name an accountable owner." Source: MoJ Engineering AI Governance Framework. Settled (MoJ framework itself is iterating).
- "System testing and model evaluation are separate." Source: CDDO cross-government AI Testing Framework. Settled.
- Spend controls and "novel work needs HM Treasury approval". Source: CDDO digital and technology spend controls, May 2024. Settled on the principle; confirm current thresholds.

### Incident reporting
- "Report first, investigate after; you will not be penalised for reporting in good faith." Source: Equal Experts AD3 policy, adapted. Confirm against Defra's own incident policy.
- "A personal data breach may need reporting to the ICO within 72 hours." Source: UK GDPR. Settled.

## 4. Source documents to cite

- AI Playbook for the UK Government (GDS/DSIT, Feb 2025). Note: it supersedes the withdrawn Generative AI Framework for HMG. Confirm the exact ten-principle wording from the HTML before quoting.
- NCSC Guidelines for Secure AI System Development.
- ICO guidance on AI and data protection.
- Algorithmic Transparency Recording Standard hub and mandatory scope policy.
- MoJ Engineering AI Governance Framework (published for reuse by other departments).
- GOV.UK Chat engineering and testing blog posts.
- CDDO digital and technology spend controls, and the AI testing and assurance guidance.
- Equal Experts AD3 AI Tools Policy (the supplier policy this section drew from).

## 5. Open questions for AICE

- Is the data matrix correct for every cell, especially OFFICIAL-SENSITIVE in an enterprise tenant tool?
- What is the real Defra security incident reporting route for an AI data incident?
- Are the spend control thresholds current?
- Should the section cite the AI Playbook's ten principles explicitly as its spine? (Not done yet; would strengthen traceability.)
