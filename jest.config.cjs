module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json"
      }
    ]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  clearMocks: true
};
