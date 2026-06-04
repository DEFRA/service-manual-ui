/**
 * Single source of truth for the AI tools radar.
 *
 * One list of tools drives both the table (sorted by status, then alphabetically)
 * and the diagram (blip geometry computed here, so positions are meaningful and
 * deterministic). Add or change a tool in TOOLS and both views update, and the
 * status stays in one place so labels can never drift.
 *
 * To add a tool: add an entry to TOOLS with a slug (matching its detail page),
 * a title, a category and a status.
 */

const STATUS_ORDER = ['using', 'trialling', 'exploring']

const STATUSES = {
  using: {
    label: 'Using',
    tagColour: 'green',
    blipColour: '#00703c',
    description: 'Used by teams across Defra today.'
  },
  trialling: {
    label: 'Trialling',
    tagColour: 'blue',
    blipColour: '#1d70b8',
    description: 'Being trialled with some teams before wider use.'
  },
  exploring: {
    label: 'Exploring',
    tagColour: 'grey',
    blipColour: '#505a5f',
    description: 'Being looked at. Not yet a recommendation either way.'
  }
}

// Each category is a quadrant. Angles in degrees: 0 is right, increasing
// clockwise (screen y increases downwards).
const CATEGORIES = {
  assistant: { label: 'Assistant', sector: [270, 360] },
  platform: { label: 'Platform', sector: [0, 90] },
  framework: { label: 'Framework', sector: [90, 180] },
  extension: { label: 'Extension', sector: [180, 270] }
}

// SVG coordinate system. The SVG scales to its container via CSS.
const GEOMETRY = {
  size: 600,
  centre: 300,
  ringBoundaries: [110, 200, 285],
  ringMid: { using: 70, trialling: 155, exploring: 242 }
}

const TOOLS = [
  { slug: 'github-copilot', title: 'GitHub Copilot', category: 'assistant', status: 'using' },
  { slug: 'aws-bedrock', title: 'AWS Bedrock', category: 'platform', status: 'trialling' },
  { slug: 'azure-ai-foundry', title: 'Azure AI Foundry', category: 'platform', status: 'trialling' },
  { slug: 'agent-to-agent', title: 'Agent-to-Agent (A2A)', category: 'framework', status: 'exploring' },
  { slug: 'aws-bedrock-agentcore', title: 'AWS Bedrock AgentCore', category: 'platform', status: 'exploring' },
  { slug: 'claude-code-marketplace', title: 'Claude Code plugin marketplace', category: 'extension', status: 'exploring' },
  { slug: 'git-ai', title: 'Git AI', category: 'extension', status: 'exploring' },
  { slug: 'langfuse', title: 'Langfuse', category: 'platform', status: 'exploring' },
  { slug: 'langgraph', title: 'LangGraph', category: 'framework', status: 'exploring' },
  { slug: 'model-context-protocol', title: 'Model Context Protocol (MCP)', category: 'framework', status: 'exploring' },
  { slug: 'retrieval-augmented-generation', title: 'Retrieval-augmented generation (RAG)', category: 'framework', status: 'exploring' }
]

function byStatusThenTitle (a, b) {
  const byStatus = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
  return byStatus !== 0 ? byStatus : a.title.localeCompare(b.title)
}

function buildRows () {
  return [...TOOLS].sort(byStatusThenTitle).map((tool, index) => ({
    ...tool,
    number: index + 1,
    href: `/ai-toolkit/tools/${tool.slug}`,
    categoryLabel: CATEGORIES[tool.category].label,
    statusLabel: STATUSES[tool.status].label,
    tagColour: STATUSES[tool.status].tagColour,
    name: tool.title.toLowerCase()
  }))
}

function buildBlips (rows) {
  const cells = {}
  rows.forEach((row) => {
    const key = `${row.status}|${row.category}`
    if (!cells[key]) {
      cells[key] = []
    }
    cells[key].push(row)
  })

  const blips = []
  Object.values(cells).forEach((cell) => {
    const [startAngle, endAngle] = CATEGORIES[cell[0].category].sector
    const radius = GEOMETRY.ringMid[cell[0].status]
    cell.forEach((row, index) => {
      const fraction = (index + 1) / (cell.length + 1)
      const radians = ((startAngle + fraction * (endAngle - startAngle)) * Math.PI) / 180
      blips.push({
        number: row.number,
        title: row.title,
        href: row.href,
        categoryLabel: row.categoryLabel,
        statusLabel: row.statusLabel,
        colour: STATUSES[row.status].blipColour,
        x: Math.round((GEOMETRY.centre + radius * Math.cos(radians)) * 10) / 10,
        y: Math.round((GEOMETRY.centre + radius * Math.sin(radians)) * 10) / 10
      })
    })
  })
  return blips
}

const rows = buildRows()

const bySlug = {}
rows.forEach((row) => {
  bySlug[row.slug] = row
})

export const toolsRadar = {
  statuses: STATUS_ORDER.map((key) => ({ key, ...STATUSES[key] })),
  categories: Object.entries(CATEGORIES).map(([key, value]) => ({ key, ...value })),
  geometry: GEOMETRY,
  rows,
  bySlug,
  rowsByStatus: STATUS_ORDER.map((status) => ({
    status,
    label: STATUSES[status].label,
    rows: rows.filter((row) => row.status === status)
  })),
  blips: buildBlips(rows)
}
