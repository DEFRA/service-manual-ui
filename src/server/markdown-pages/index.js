import { config } from '../../config/config.js'
import { getMarkdownPage } from './controller.js'

function isAiToolkitRoute(routePath) {
  return routePath === '/ai-toolkit' || routePath.startsWith('/ai-toolkit/')
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
  '/ai-toolkit',
  '/ai-toolkit/getting-started',
  '/ai-toolkit/case-studies/nrf-discovery',
  '/ai-toolkit/case-studies/nrf-alpha',
  '/ai-toolkit/case-studies/plp-cycle-time',
  '/ai-toolkit/lessons-learned/code-quality',
  '/ai-toolkit/lessons-learned/governance',
  '/ai-toolkit/lessons-learned/output-validation',
  '/ai-toolkit/patterns',
  '/ai-toolkit/patterns/ai-assistant',
  '/ai-toolkit/patterns/green-summarisation',
  '/ai-toolkit/patterns/agent-swarms',
  '/ai-toolkit/patterns/token-optimisation',
  '/ai-toolkit/prompt-library',
  '/ai-toolkit/tools',
  '/ai-toolkit/tools/github-copilot',
  '/ai-toolkit/tools/aws-bedrock',
  '/ai-toolkit/tools/azure-ai-foundry',
  '/ai-toolkit/tools/model-context-protocol',
  '/ai-toolkit/tools/agent-to-agent',
  '/ai-toolkit/tools/langgraph',
  '/ai-toolkit/tools/retrieval-augmented-generation',
  '/ai-toolkit/tools/langfuse',
  '/ai-toolkit/tools/aws-bedrock-agentcore',
  '/ai-toolkit/tools/claude-code-marketplace',
  '/ai-toolkit/tools/git-ai',
  '/ai-toolkit/triage/question-1',
  '/ai-toolkit/triage/question-2',
  '/ai-toolkit/triage/question-3',
  '/ai-toolkit/triage/question-4',
  '/ai-toolkit/triage/question-5',
  '/ai-toolkit/triage/thank-you',
  '/ai-toolkit/guidance',
  '/ai-toolkit/guidance/welcome',
  '/ai-toolkit/guidance/choosing-models',
  '/ai-toolkit/guidance/working-mindset',
  '/ai-toolkit/guidance/four-pillars',
  '/ai-toolkit/guidance/setting-up-your-project',
  '/ai-toolkit/guidance/training-and-resources',
  '/ai-toolkit/guidance/workflow',
  '/ai-toolkit/guidance/writing-good-prompts',
  '/ai-toolkit/guidance/generating-requirements',
  '/ai-toolkit/guidance/feature-development',
  '/ai-toolkit/guidance/rules-for-ai',
  '/ai-toolkit/guidance/mcp-servers',
  '/ai-toolkit/guidance/ethics',
  '/ai-toolkit/guidance/security',
  '/ai-toolkit/guidance/sustainability',
  '/ai-toolkit/guidance/information-governance',
  '/ai-toolkit/guidance/pii-and-data-handling',
  '/ai-toolkit/guidance/cost-and-tokens',
  '/ai-toolkit/from-the-field'
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
