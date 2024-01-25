module.exports = {
  coverageDirectory: "coverage",
  setupFiles: ["<rootDir>/tests/setup.ts"],
  moduleNameMapper: {
    "@/tests/(.+)": "<rootDir>/tests/$1",
    "@/(.+)": "<rootDir>/src/$1"
  },
  testMatch: ["**/*.test.ts"],
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  transform: {
    "\\.ts$": "ts-jest"
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/", "/index.ts"]
};
