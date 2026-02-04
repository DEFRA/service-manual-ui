import { getMarkdownPage } from './controller.js'

/**
 * Markdown page routes - maps URL paths to markdown files
 */
const markdownRoutes = [
  '/accessibility-statement',
  '/service-standard',
  '/service-assessments',
  '/service-assessments/book-an-assessment',
  '/service-assessments/become-an-assessor',
  '/service-assessments/gov-uk-exemptions',
  '/architecture-and-software-development',
  '/architecture-and-software-development/core-delivery-platform',
  '/architecture-and-software-development/defra-customer-identity',
  '/architecture-and-software-development/defra-accessible-maps',
  '/architecture-and-software-development/defra-forms',
  '/architecture-and-software-development/defra-integration',
  '/accessibility',
  '/accessibility/manage-accessibility',
  '/accessibility/test-for-accessibility',
  '/components',
  '/content',
  '/design',
  '/design/branding',
  '/design/cookies',
  '/design/data-visualisation',
  '/patterns',
  '/user-research',
  '/user-research/scoping-research',
  '/user-research/planning-research',
  '/user-research/recruiting-participants',
  '/user-research/participant-recruitment-methods',
  '/user-research/gathering-consent',
  '/user-research/preparing-for-data-collection',
  '/working-with-defra',
  '/sustainability',
  '/sustainability/objectives',
  '/sustainability/process',
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
  '/security/common-tasks'
]

export const markdownPages = {
  plugin: {
    name: 'markdown-pages',
    register: async (server) => {
      const routes = markdownRoutes.map((path) => ({
        method: 'GET',
        path,
        handler: getMarkdownPage(`${path.slice(1)}.md`)
      }))

      server.route(routes)
    }
  }
}
