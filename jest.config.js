/* eslint-disable */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };
  