const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/__tests__/mocks/'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@utils(.*)$': '<rootDir>/utils/$1',
    '^@hooks(.*)$': '<rootDir>/hooks/$1',
    '^@lib(.*)$': '<rootDir>/lib/$1',
    '^@styles(.*)$': '<rootDir>/styles/$1',
    '^@contexts(.*)$': '<rootDir>/contexts/$1',
    '^@middleware(.*)$': '<rootDir>/middleware/$1',
    '^@graphql(.*)$': '<rootDir>/graphql/$1',
    '^@asserts(.*)$': '<rootDir>/asserts/$1',
    '^@settings(.*)$': '<rootDir>/settings/$1',
    '^@ts-types(.*)$': '<rootDir>/ts-types/$1'
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  }
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
