module.exports = {
    moduleFileExtensions: ['js'],
    'collectCoverage': false,
    'coverageReporters': [
        'lcov',
        'text-summary'
    ],
    // testURL: 'http://localhost/',
    setupFiles: ['<rootDir>/.jest/someModuleForTest.js']
}
