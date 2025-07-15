module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testTimeout: 30000,

  // Enable coverage collection:
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',        // include all .ts files
    '!src/**/*.test.ts'   // but exclude test files
  ],

  // Transform TypeScript files:
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },

  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  resetMocks: true
};
