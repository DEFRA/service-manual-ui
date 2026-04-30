import { config } from '../../config/config.js'
import { getMarkdownPage } from './controller.js'

function isAiToolkitRoute(routePath) {
  return routePath === '/ai-playbook' || routePath.startsWith('/ai-playbook/')
}

/**
 * Markdown page routes - maps URL paths to markdown files
 */
const markdownRoutes = [
  '/accessibility-statement',
  '/service-assessments',
  '/service-assessments/book-an-assessment',
  '/service-assessments/become-an-assessor',
  '/service-assessments/gov-uk-exemptions',
  '/architecture-and-software-development',
  '/architecture-and-software-development/core-delivery-platform',
  '/architecture-and-software-development/defra-customer-identity',
  '/architecture-and-software-development/defra-accessible-maps',
  '/architecture-and-software-development/defra-forms',
  '/accessibility',
  '/accessibility/manage-accessibility',
  '/accessibility/test-for-accessibility',
  '/components',
  '/content',
  '/content/inclusive-clear-language',
  '/content/designing-different-content-types',
  '/content/sharing-designs-recording-decisions',
  '/content/tools',
  '/content/working-in-discovery',
  '/content/working-in-alpha',
  '/content/working-in-beta',
  '/content/working-in-live',
  '/service-assessments/assessment-questions',
  '/content/legal-content',
  '/content/welsh-language-translation',
  '/content/colour-contrast',
  '/content/accessible-spreadsheets',
  '/content/accessibility-tools',
  '/design',
  '/design/branding',
  '/design/cookies',
  '/design/data-visualisation',
  '/design/prototyping',
  '/design/tools',
  '/design/components-and-patterns',
  '/patterns',
  '/user-research',
  '/user-research/scoping-research',
  '/user-research/recruiting-participants',
  '/user-research/standards-and-guidance',
  '/user-research/tools',
  '/working-with-defra',
  '/sustainability',
  '/sustainability/process',
  '/sustainability/objectives',
  '/sustainability/metrics',
  '/suggest-content',
  '/take-part-in-research',
  '/business-analysis',
  '/business-analysis/ways-of-working',
  '/product-and-delivery',
  '/product-and-delivery/governance',
  '/product-and-delivery/tools-and-access',
  '/delivery-groups/meet-delivery-standards',
  '/delivery-groups/meet-delivery-standards/define-outcomes',
  '/delivery-groups/meet-delivery-standards/products-and-services',
  '/delivery-groups/meet-delivery-standards/roadmap-for-change',
  '/delivery-groups/meet-delivery-standards/success-measures',
  '/delivery-groups/follow-delivery-governance',
  '/delivery-groups/follow-delivery-governance/governance-model',
  '/delivery-groups/follow-delivery-governance/assurance',
  '/delivery-groups/follow-delivery-governance/assurance/spend-control',
  '/delivery-groups/follow-delivery-governance/assurance/service-assessments',
  '/delivery-groups/follow-delivery-governance/assurance/operational-service-readiness',
  '/delivery-groups/follow-delivery-governance/assurance/other-assurance-types',
  '/testing-and-assurance',
  '/testing-and-assurance/recommended-approach',
  '/security',
  '/security/common-tasks',
  '/ai-playbook',
  '/ai-playbook/getting-started',
  '/ai-playbook/case-studies/nrf-discovery',
  '/ai-playbook/case-studies/nrf-alpha',
  '/ai-playbook/case-studies/plp-cycle-time',
  '/ai-playbook/lessons-learned/code-quality',
  '/ai-playbook/lessons-learned/governance',
  '/ai-playbook/lessons-learned/output-validation',
  '/ai-playbook/patterns',
  '/ai-playbook/patterns/ai-assistant',
  '/ai-playbook/patterns/green-summarisation',
  '/ai-playbook/patterns/agent-swarms',
  '/ai-playbook/patterns/token-optimisation',
  '/ai-playbook/prompt-library',
  '/ai-playbook/tools',
  '/ai-playbook/tools/github-copilot',
  '/ai-playbook/tools/aws-bedrock',
  '/ai-playbook/tools/azure-ai-foundry',
  '/ai-playbook/tools/model-context-protocol',
  '/ai-playbook/tools/agent-to-agent',
  '/ai-playbook/tools/langgraph',
  '/ai-playbook/tools/retrieval-augmented-generation',
  '/ai-playbook/tools/langfuse',
  '/ai-playbook/tools/aws-bedrock-agentcore',
  '/ai-playbook/tools/claude-code-marketplace',
  '/ai-playbook/tools/git-ai',
  '/ai-playbook/triage/question-1',
  '/ai-playbook/triage/question-2',
  '/ai-playbook/triage/question-3',
  '/ai-playbook/triage/question-4',
  '/ai-playbook/triage/question-5',
  '/ai-playbook/triage/thank-you',
  '/ai-playbook/guidance',
  '/ai-playbook/guidance/welcome',
  '/ai-playbook/guidance/choosing-models',
  '/ai-playbook/guidance/working-mindset',
  '/ai-playbook/guidance/four-pillars',
  '/ai-playbook/guidance/setting-up-your-project',
  '/ai-playbook/guidance/training-and-resources',
  '/ai-playbook/guidance/workflow',
  '/ai-playbook/guidance/writing-good-prompts',
  '/ai-playbook/guidance/generating-requirements',
  '/ai-playbook/guidance/feature-development',
  '/ai-playbook/guidance/rules-for-ai',
  '/ai-playbook/guidance/mcp-servers',
  '/ai-playbook/guidance/ethics',
  '/ai-playbook/guidance/security',
  '/ai-playbook/guidance/sustainability',
  '/ai-playbook/guidance/information-governance',
  '/ai-playbook/guidance/pii-and-data-handling',
  '/ai-playbook/guidance/cost-and-tokens',
  '/ai-playbook/from-the-field'
]

export const markdownPages = {
  plugin: {
    name: 'markdown-pages',
    register: async (server) => {
      const aiContentEnabled = config.get('aiContent.enabled')
      const enabledRoutes = aiContentEnabled
        ? markdownRoutes
        : markdownRoutes.filter((path) => !isAiToolkitRoute(path))

      const routes = enabledRoutes.map((path) => ({
        method: 'GET',
        path,
        handler: getMarkdownPage(`${path.slice(1)}.md`)
      }))

      server.route(routes)
    }
  }
}
