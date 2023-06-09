module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
    setupFiles: ["<rootDir>/.jest/setEnvVars.ts"],
    verbose: true,
    collectCoverage: true
};
