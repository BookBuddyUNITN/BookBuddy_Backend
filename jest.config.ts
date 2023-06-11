module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: '/server/testFiles/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'js'],
    setupFiles: ["<rootDir>/.jest/setEnvVars.ts"],
    verbose: true,
    collectCoverage: true,
    reporters: [
        "default",
        ["jest-html-reporters", {
          publicPath: "./test-reports",
          filename: "report.html",
          pageTitle: "Test Report",
          expand: true
        }]
      ]
};
