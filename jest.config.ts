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
    collectCoverage: true
};
