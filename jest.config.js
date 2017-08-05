module.exports = {
  testEnvironment: 'node',
  transform: {
    '.(ts)': '<rootDir>/preprocessor.js'
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