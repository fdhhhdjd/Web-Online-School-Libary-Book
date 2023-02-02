// jest.config.js
module.exports = {
    moduleFileExtensions: ['js'],
    'collectCoverage': false,
    'coverageReporters': [
        'lcov',
        'text-summary'
    ],
    setupFiles: ['<rootDir>/.jest/someModuleForTest.js', '<rootDir>/.jest/defaultTimeout.js']
}

