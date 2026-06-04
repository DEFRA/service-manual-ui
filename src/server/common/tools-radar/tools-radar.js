/**
 * Single source of truth for the AI tools radar.
 *
 * The list of tools lives in tools.yaml so it can be managed without editing
 * code. This module reads and validates that list at startup, then derives
 * everything the views need. One list drives both the table (sorted by status,
 * then alphabetically) and the diagram (blip geometry computed here, so positions
 * are meaningful and deterministic), and the status lives in one place so labels
 * can never drift.
 *
 * To add a tool: edit tools.yaml (and create its detail page). The status and
 * category taxonomy and the diagram geometry are developer config and stay here.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import yaml from 'js-yaml'
import Joi from 'joi'

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

// Diagram geometry. Angles in degrees: 0 is right, increasing clockwise
// (SVG y increases downwards). Each category fills one 90-degree quadrant, so
// sectors are derived from the quadrant order rather than hard-coded angles.
const DEGREES = { quadrant: 90, halfCircle: 180 }
const QUADRANT_ORDER = ['platform', 'framework', 'extension', 'assistant']

function quadrantSector (categoryKey) {
  const quadrant = QUADRANT_ORDER.indexOf(categoryKey)
  return [quadrant * DEGREES.quadrant, (quadrant + 1) * DEGREES.quadrant]
}

const CATEGORIES = {
  assistant: { label: 'Assistant', sector: quadrantSector('assistant') },
  platform: { label: 'Platform', sector: quadrantSector('platform') },
  framework: { label: 'Framework', sector: quadrantSector('framework') },
  extension: { label: 'Extension', sector: quadrantSector('extension') }
}

// Status ring radii in SVG units: the outer boundary of each ring (used to draw
// the circle) and the mid radius where that ring's blips sit.
const RING = {
  using: { boundary: 110, mid: 70 },
  trialling: { boundary: 200, mid: 155 },
  exploring: { boundary: 285, mid: 242 }
}

// SVG coordinate system. The SVG scales to its container via CSS.
const GEOMETRY = {
  size: 600,
  centre: 300,
  ringBoundaries: [RING.using.boundary, RING.trialling.boundary, RING.exploring.boundary],
  ringMid: { using: RING.using.mid, trialling: RING.trialling.mid, exploring: RING.exploring.mid }
}

// The tool list is data, not code, so it lives in tools.yaml. Validate it at
// startup against the known statuses and categories: a bad edit (unknown status,
// duplicate slug, missing field) fails fast with a message naming the problem.
const toolsFile = join(dirname(fileURLToPath(import.meta.url)), 'tools.yaml')

const toolSchema = Joi.object({
  slug: Joi.string().trim().pattern(/^[a-z0-9-]+$/).required(),
  title: Joi.string().trim().required(),
  category: Joi.string().valid(...Object.keys(CATEGORIES)).required(),
  status: Joi.string().valid(...Object.keys(STATUSES)).required()
}).label('tool')

const toolsFileSchema = Joi.object({
  tools: Joi.array().items(toolSchema).min(1).unique('slug').required()
}).required()

function loadTools () {
  const parsed = yaml.load(readFileSync(toolsFile, 'utf8'))
  const { error, value } = toolsFileSchema.validate(parsed, {
    abortEarly: false,
    allowUnknown: false
  })
  if (error) {
    throw new Error(`Invalid tools.yaml: ${error.message}`)
  }
  return value.tools
}

const TOOLS = loadTools()

function byStatusThenTitle (a, b) {
  const byStatus = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
  return byStatus === 0 ? a.title.localeCompare(b.title) : byStatus
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

function buildBlips (sortedRows) {
  const cells = {}
  sortedRows.forEach((row) => {
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
      const radians = ((startAngle + fraction * (endAngle - startAngle)) * Math.PI) / DEGREES.halfCircle
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
