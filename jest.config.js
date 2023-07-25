module.exports = {
  bail: true, // para de funcionar a quando achar um erro
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ]
}