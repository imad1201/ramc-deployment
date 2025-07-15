module.exports = {
  // The test environment that will be used for testing.
  testEnvironment: 'node',  // Use 'node' as the test environment since this is a backend project

  // Verbosity of the test output
  verbose: true,

  // The timeout for each test
  testTimeout: 30000,  // Timeout of 30 seconds for each test

  // The pattern Jest uses to find test files
  testMatch: [
    "**/?(*.)+(spec|test).ts"  // Match any files with '.spec.ts' or '.test.ts' suffixes
  ],

  // Transform TypeScript files using ts-jest before testing
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Use ts-jest to handle '.ts' files
  },

  // Module file extensions to be considered by Jest
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // Allow Jest to use global variables from jest-environment-node
  globals: {
    'ts-jest': {
      isolatedModules: true,  // This option improves performance by compiling each file separately
    },
  },

  // Collect coverage information from the specified files
  collectCoverage: true,  // Collect coverage data for tests

  // Define where the coverage report should be saved
  coverageDirectory: 'coverage',  // Store the coverage report in a 'coverage' directory

  // Ignore node_modules for coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],

  // A way to mock the response for specific modules (if needed)
  moduleNameMapper: {
    // Example: Map module imports to specific mock files or paths if needed
  },

  // Automatically reset mock state between tests
  resetMocks: true,
};
