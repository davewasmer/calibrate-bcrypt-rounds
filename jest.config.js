module.exports = {
  clearMocks: true,
  collectCoverage: Boolean(process.env.CI || process.env.COLLECT_COVERAGE),
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  globalSetup: './bin/clear-test-db',
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  },
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  notify: true,
  notifyMode: "always",
  testEnvironment: "node",
  testRegex: "src\\/.+\\.test\\.ts",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};
