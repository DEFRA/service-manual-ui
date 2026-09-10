import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig(() => {
  return {
    test: {
      globals: true,
      environment: 'node',
      clearMocks: true,
      // Integration tests boot the whole server in beforeAll. Under a full
      // run with coverage on that passes vitest's 10 second default.
      hookTimeout: 30000,
      setupFiles: ['./vitest.setup.js'],
      coverage: {
        provider: 'v8',
        reportsDirectory: './coverage',
        reporter: ['text', 'lcov'],
        // JavaScript only. With a bare src/** the uncovered-files pass tries
        // to parse every markdown page under src/content and logs a parser
        // error for each one.
        include: ['src/**/*.js'],
        exclude: [
          ...configDefaults.exclude,
          '.public',
          'coverage',
          'postcss.config.js',
          'stylelint.config.js'
        ]
      }
    }
  }
})
