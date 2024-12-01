module.exports = {
  preset: "ts-jest",
  testMatch: ["**/*.test.ts"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["text", "html"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  resolver: "jest-ts-webcompat-resolver"
};
