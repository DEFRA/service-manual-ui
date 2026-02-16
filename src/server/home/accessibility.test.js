/* eslint-disable no-console */
import { JSDOM } from 'jsdom'
import axe from 'axe-core'
import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

describe('Accessibility - axe-core scan', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  const scanPage = async (url) => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url
    })
    expect(statusCode).toBe(statusCodes.ok)

    const dom = new JSDOM(result, { runScripts: 'dangerously' })
    const document = dom.window.document

    // axe-core needs to be configured for JSDOM
    const results = await axe.run(document.documentElement, {
      rules: {
        // Disable rules that don't apply in JSDOM context
        'color-contrast': { enabled: false }, // can't compute in JSDOM
        'meta-viewport': { enabled: false } // layout not available
      }
    })

    return results
  }

  test('Home page (/) should have no critical or serious accessibility violations', async () => {
    const results = await scanPage('/')

    const criticalAndSerious = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )

    if (criticalAndSerious.length > 0) {
      const summary = criticalAndSerious.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        nodes: v.nodes.map((n) => n.html.substring(0, 200))
      }))
      console.log(
        'Critical/Serious violations:',
        JSON.stringify(summary, null, 2)
      )
    }

    // Log all violations for informational purposes
    if (results.violations.length > 0) {
      console.log('\n=== ALL AXE VIOLATIONS ===')
      results.violations.forEach((v) => {
        console.log(`\n[${v.impact?.toUpperCase()}] ${v.id}: ${v.help}`)
        console.log(`  URL: ${v.helpUrl}`)
        console.log(`  Affected nodes: ${v.nodes.length}`)
        v.nodes.forEach((n, i) => {
          console.log(`  Node ${i + 1}: ${n.html.substring(0, 150)}`)
        })
      })
      console.log('\n=== END VIOLATIONS ===\n')
    } else {
      console.log('✅ No accessibility violations found!')
    }

    // Log summary stats
    console.log(`Passes: ${results.passes.length}`)
    console.log(`Violations: ${results.violations.length}`)
    console.log(`Incomplete: ${results.incomplete.length}`)

    // Fail test only on critical/serious
    expect(criticalAndSerious).toHaveLength(0)
  })

  test('Service manual page (/service-manual) should have no critical or serious accessibility violations', async () => {
    const results = await scanPage('/service-manual')

    const criticalAndSerious = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )

    if (results.violations.length > 0) {
      console.log('\n=== ALL AXE VIOLATIONS (/service-manual) ===')
      results.violations.forEach((v) => {
        console.log(`\n[${v.impact?.toUpperCase()}] ${v.id}: ${v.help}`)
        console.log(`  URL: ${v.helpUrl}`)
        console.log(`  Affected nodes: ${v.nodes.length}`)
        v.nodes.forEach((n, i) => {
          console.log(`  Node ${i + 1}: ${n.html.substring(0, 150)}`)
        })
      })
      console.log('\n=== END VIOLATIONS ===\n')
    }

    console.log(`Passes: ${results.passes.length}`)
    console.log(`Violations: ${results.violations.length}`)

    expect(criticalAndSerious).toHaveLength(0)
  })
})
