/**
 * Defra Standards Data
 *
 * This file contains all Defra standards derived from the service manual content.
 * Each standard links to its source guidance page for full details.
 *
 * Standards are grouped by area:
 * - Technology & Architecture: Development platforms, tools, and coding standards
 * - Accessibility: WCAG compliance and assistive technology support
 * - Sustainability: Environmental and social responsibility
 */

/**
 * Area categories for standards
 */
export const AREAS = {
  TECHNOLOGY: 'Technology & Architecture',
  ACCESSIBILITY: 'Accessibility',
  SUSTAINABILITY: 'Sustainability'
}

/**
 * All Defra standards
 * @type {Array<{id: string, title: string, description: string, area: string, sourceUrl: string}>}
 */
export const standards = [
  // Technology & Architecture Standards
  {
    id: 'use-core-delivery-platform',
    title: 'Use the Core Delivery Platform',
    description:
      "Build and deploy services using Defra's internal development platform for standardised tools, pipelines, and processes.",
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development/core-delivery-platform'
  },
  {
    id: 'use-defra-customer-identity',
    title: 'Use Defra Customer Identity',
    description:
      'Use Defra Customer Identity for external user authentication and authorisation, enabling single sign-on across services.',
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development/defra-customer-identity'
  },
  {
    id: 'use-defra-forms',
    title: 'Use Defra Forms',
    description:
      'Create accessible forms that follow GOV.UK standards using the Defra Forms builder or plugin.',
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development/defra-forms'
  },
  {
    id: 'use-defra-accessible-maps',
    title: 'Use Defra Accessible Maps',
    description:
      'If your service includes mapping, use the Defra Maps component to ensure accessibility.',
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development/defra-accessible-maps'
  },
  {
    id: 'store-code-in-defra-github',
    title: 'Store code in Defra GitHub',
    description:
      'Store all service code in the Defra GitHub organisation for version control and collaboration.',
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development'
  },
  {
    id: 'use-nodejs-with-hapi',
    title: 'Use Node.js with hapi framework',
    description:
      'Use Node.js with the hapi framework for frontend services to ensure consistency across Defra.',
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development'
  },
  {
    id: 'use-vanilla-javascript',
    title: 'Use vanilla JavaScript',
    description:
      'Use vanilla JavaScript without frontend frameworks to ensure progressive enhancement and accessibility.',
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development'
  },
  {
    id: 'follow-readme-standards',
    title: "Follow Defra's README standards",
    description:
      'Document your service with a README file that follows Defra standards for clarity and consistency.',
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development'
  },
  {
    id: 'maintain-architecture-documentation',
    title: 'Maintain architecture documentation',
    description:
      'Keep solution overview documentation, architecture decision records, and architecture diagrams up to date.',
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development'
  },
  {
    id: 'use-approved-technologies',
    title: 'Use approved technologies only',
    description:
      'Only use technologies approved on the Defra Tools Radar. Request approval for any new technologies.',
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development'
  },
  {
    id: 'contact-delivery-architecture',
    title: 'Contact Delivery Architecture team',
    description:
      'Engage with the Delivery Architecture team before starting a new service to understand governance requirements.',
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development'
  },
  {
    id: 'follow-software-development-standards',
    title: 'Follow Defra software development standards',
    description:
      'Comply with the mandatory Defra software development standards for all service code.',
    area: AREAS.TECHNOLOGY,
    sourceUrl: '/architecture-and-software-development'
  },

  // Accessibility Standards
  {
    id: 'meet-wcag-2-2-aa',
    title: 'Meet WCAG 2.2 Level AA',
    description:
      'All services must conform to Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.',
    area: AREAS.ACCESSIBILITY,
    sourceUrl: '/accessibility'
  },
  {
    id: 'support-defra-assistive-technologies',
    title: 'Support Defra assistive technologies',
    description:
      'Staff-facing software must work with Dragon, ZoomText, JAWS, Read and Write, and Windows accessibility features.',
    area: AREAS.ACCESSIBILITY,
    sourceUrl: '/accessibility'
  },
  {
    id: 'staff-software-meets-same-standards',
    title: 'Staff software meets same standards',
    description:
      'Internal staff-facing software must meet the same accessibility standards as public services.',
    area: AREAS.ACCESSIBILITY,
    sourceUrl: '/accessibility'
  },
  {
    id: 'provide-accessible-maps',
    title: 'Provide accessible map alternatives',
    description:
      'Maps are not exempt from accessibility. Provide the information in an accessible digital format.',
    area: AREAS.ACCESSIBILITY,
    sourceUrl: '/accessibility'
  },
  {
    id: 'publish-accessibility-statement',
    title: 'Publish accessibility statement',
    description:
      'Publish a compliant accessibility statement on your service before going live.',
    area: AREAS.ACCESSIBILITY,
    sourceUrl: '/accessibility/manage-accessibility'
  },
  {
    id: 'complete-accessibility-audit',
    title: 'Complete accessibility audit',
    description:
      'Obtain a written audit report confirming WCAG 2.2 AA compliance before Gate 4.',
    area: AREAS.ACCESSIBILITY,
    sourceUrl: '/accessibility/manage-accessibility'
  },
  {
    id: 'test-with-assistive-technologies',
    title: 'Test with assistive technologies',
    description:
      'Include manual testing with users of assistive technology in your testing plan.',
    area: AREAS.ACCESSIBILITY,
    sourceUrl: '/accessibility/test-for-accessibility'
  },
  {
    id: 'do-not-use-accessibility-overlays',
    title: 'Do not use accessibility overlays',
    description:
      'Defra does not accept the use of accessibility overlays or plugins as a compliance solution.',
    area: AREAS.ACCESSIBILITY,
    sourceUrl: '/accessibility/manage-accessibility'
  },

  // Sustainability Standards
  {
    id: 'create-sustainability-statement',
    title: 'Create sustainability statement',
    description:
      "Document actions taken and planned against Defra's six sustainability objectives in a sustainability statement.",
    area: AREAS.SUSTAINABILITY,
    sourceUrl: '/sustainability/process'
  },
  {
    id: 'complete-sustainability-assessment',
    title: 'Complete Digital Sustainability Assessment',
    description:
      'Complete the Digital Sustainability Assessment before Alpha phase or Stage Gate 3.',
    area: AREAS.SUSTAINABILITY,
    sourceUrl: '/sustainability/process'
  },
  {
    id: 'reduce-greenhouse-gas-emissions',
    title: 'Reduce greenhouse gas emissions',
    description:
      "Reduce greenhouse gas emissions as far as possible to contribute towards Defra's net zero target.",
    area: AREAS.SUSTAINABILITY,
    sourceUrl: '/sustainability/objectives'
  },
  {
    id: 'reduce-wider-planetary-impacts',
    title: 'Reduce wider planetary impacts',
    description:
      'Reduce wider planetary impacts such as water consumption, land use change, and biodiversity impacts.',
    area: AREAS.SUSTAINABILITY,
    sourceUrl: '/sustainability/objectives'
  },
  {
    id: 'put-circular-practices-into-action',
    title: 'Put circular practices into action',
    description:
      'Extend the lifespan of existing equipment or purchase remanufactured or refurbished hardware.',
    area: AREAS.SUSTAINABILITY,
    sourceUrl: '/sustainability/objectives'
  },
  {
    id: 'reduce-social-risk-from-supply-chains',
    title: 'Reduce social risk from supply chains',
    description:
      'Reduce social risk from supply chains that are high risk for social inequality or exploitation.',
    area: AREAS.SUSTAINABILITY,
    sourceUrl: '/sustainability/objectives'
  },
  {
    id: 'increase-supply-chain-transparency',
    title: 'Increase supply chain transparency',
    description:
      'Work to increase supply chain transparency for digital services and hardware.',
    area: AREAS.SUSTAINABILITY,
    sourceUrl: '/sustainability/objectives'
  },
  {
    id: 'improve-climate-resilience',
    title: 'Improve resilience to climate risk',
    description:
      'Ensure services are resilient to climate change risks such as flooding or extreme heat.',
    area: AREAS.SUSTAINABILITY,
    sourceUrl: '/sustainability/objectives'
  }
]

/**
 * Get all unique areas from the standards data
 * @returns {string[]} Array of unique area names
 */
export function getAreas() {
  return Object.values(AREAS)
}

/**
 * Filter standards by search query and/or areas
 * @param {Object} options - Filter options
 * @param {string} [options.query] - Search query (matches title and description)
 * @param {string[]} [options.areas] - Array of area names to filter by
 * @returns {Array} Filtered standards
 */
export function filterStandards({ query = '', areas = [] } = {}) {
  let filtered = [...standards]

  // Filter by search query (case-insensitive)
  if (query) {
    const searchTerm = query.toLowerCase()
    filtered = filtered.filter(
      (standard) =>
        standard.title.toLowerCase().includes(searchTerm) ||
        standard.description.toLowerCase().includes(searchTerm)
    )
  }

  // Filter by areas (OR logic - matches any selected area)
  if (areas.length > 0) {
    filtered = filtered.filter((standard) => areas.includes(standard.area))
  }

  return filtered
}

/**
 * Paginate an array of items
 * @param {Array} items - Items to paginate
 * @param {number} page - Current page (1-indexed)
 * @param {number} pageSize - Items per page
 * @returns {Object} Pagination result
 */
export function paginate(items, page = 1, pageSize = 10) {
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const currentPage = Math.max(1, Math.min(page, totalPages || 1))
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  return {
    items: items.slice(startIndex, endIndex),
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      pageSize,
      startIndex: startIndex + 1,
      endIndex,
      hasPrevious: currentPage > 1,
      hasNext: currentPage < totalPages
    }
  }
}
