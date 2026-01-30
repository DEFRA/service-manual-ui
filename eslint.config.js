import neostandard from 'neostandard'

export default [
  ...neostandard({
    env: ['node', 'vitest'],
    ignores: [...neostandard.resolveIgnoresFromGitignore()],
    noJsx: true,
    noStyle: true
  }),
  // Additional rules to align with SonarQube quality standards
  // Focus on critical issues that cause SonarQube quality gate failures
  {
    rules: {
      // CRITICAL - Code Complexity (SonarQube CRITICAL issues)
      complexity: ['error', { max: 15 }], // Matches SonarQube cognitive complexity limit
      'max-depth': ['error', { max: 3 }], // Maximum nesting depth

      // CRITICAL - Code Quality (SonarQube CRITICAL issues)
      curly: ['error', 'all'], // Require braces for all control structures (prevents bugs)

      // MAJOR - Magic Numbers (SonarQube MAJOR issues)
      'no-magic-numbers': [
        'warn',
        {
          ignore: [0, 1, -1, 2, 10, 100, 1000], // Common values
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          enforceConst: true,
          detectObjects: false // Don't warn on object properties
        }
      ],

      // MAJOR - Code maintainability
      'no-shadow': 'warn', // Variable shadowing (SonarQube issue)
      'default-case-last': 'error', // Switch statement best practice

      // Enforce logger usage over console
      'no-console': 'error'
    }
  },
  // Allow console.error in client-side code (no server logger available)
  {
    files: ['src/client/**/*.js'],
    rules: {
      'no-console': ['warn', { allow: ['error'] }]
    }
  },
  // Separate config for test files - more lenient
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    rules: {
      'no-magic-numbers': 'off', // Tests often use magic numbers
      'max-lines-per-function': 'off', // Tests can be long
      complexity: 'off' // Test complexity is acceptable
    }
  }
]
