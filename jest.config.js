module.exports = {
  testEnvironment: 'node',
  transform: {
    '.(ts)': '<rootDir>/jest.preprocessor.js'
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts|js)?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
  ],
};