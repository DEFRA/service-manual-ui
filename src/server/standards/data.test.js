import { describe, it, expect } from 'vitest'
import { standards, AREAS } from './data.js'

describe('Standards Data', () => {
  describe('standards array', () => {
    it('should export an array', () => {
      expect(Array.isArray(standards)).toBe(true)
    })

    it('should contain approximately 20-25 standards', () => {
      expect(standards.length).toBeGreaterThanOrEqual(20)
      expect(standards.length).toBeLessThanOrEqual(30)
    })

    it('should have unique IDs for all standards', () => {
      const ids = standards.map((standard) => standard.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('standard structure', () => {
    it('should have required fields for each standard', () => {
      const requiredFields = ['id', 'title', 'description', 'area', 'sourceUrl']

      standards.forEach((standard) => {
        requiredFields.forEach((field) => {
          expect(standard).toHaveProperty(field)
          expect(standard[field]).toBeTruthy()
        })
      })
    })

    it('should have valid area values for all standards', () => {
      const validAreas = Object.values(AREAS)

      standards.forEach((standard) => {
        expect(validAreas).toContain(standard.area)
      })
    })

    it('should have sourceUrls starting with /', () => {
      standards.forEach((standard) => {
        expect(standard.sourceUrl).toMatch(/^\//)
      })
    })

    it('should have kebab-case IDs', () => {
      const kebabCaseRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/

      standards.forEach((standard) => {
        expect(standard.id).toMatch(kebabCaseRegex)
      })
    })

    it('should have descriptions that are 1-2 sentences', () => {
      standards.forEach((standard) => {
        // Description should be reasonably short (under 300 chars)
        expect(standard.description.length).toBeLessThan(300)
        // Should have at least some content
        expect(standard.description.length).toBeGreaterThan(10)
      })
    })
  })

  describe('AREAS constant', () => {
    it('should export AREAS object', () => {
      expect(AREAS).toBeDefined()
      expect(typeof AREAS).toBe('object')
    })

    it('should have expected area categories', () => {
      expect(AREAS.TECHNOLOGY).toBe('Technology & Architecture')
      expect(AREAS.ACCESSIBILITY).toBe('Accessibility')
      expect(AREAS.SUSTAINABILITY).toBe('Sustainability')
    })

    it('should have exactly 3 areas', () => {
      expect(Object.keys(AREAS).length).toBe(3)
    })
  })

  describe('content coverage', () => {
    it('should include standards from Technology & Architecture area', () => {
      const techStandards = standards.filter((s) => s.area === AREAS.TECHNOLOGY)
      expect(techStandards.length).toBeGreaterThan(0)
    })

    it('should include standards from Accessibility area', () => {
      const accessibilityStandards = standards.filter(
        (s) => s.area === AREAS.ACCESSIBILITY
      )
      expect(accessibilityStandards.length).toBeGreaterThan(0)
    })

    it('should include standards from Sustainability area', () => {
      const sustainabilityStandards = standards.filter(
        (s) => s.area === AREAS.SUSTAINABILITY
      )
      expect(sustainabilityStandards.length).toBeGreaterThan(0)
    })
  })
})
