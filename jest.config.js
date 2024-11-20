module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './reports/jest',
      outputName: 'junit.xml',
    }],
  ],
};