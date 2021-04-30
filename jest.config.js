module.exports = {
    verbose: true,
    preset: "jest-expo",
    collectCoverage: true,
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)",
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/settings/',
        '/.*__mocks__.*/',
    ],
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/settings/',
        '/coverage/',
        'App.tsx',
        'jest.config.js',
        'babel.config.js',
        '/styles/',
        '/types/'
    ],
    setupFiles: ["<rootDir>/__tests__/settings/setupTests.ts", './node_modules/react-native-gesture-handler/jestSetup.js'],
};