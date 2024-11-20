module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './reports/jest', // Директорія для зберігання звітів
      outputName: 'junit.xml', // Ім'я файлу звіту
    }],
  ],
};