module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json", // Point to your TypeScript config
    },
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Ensure ts-jest is transforming TS/TSX files
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional setup
};
