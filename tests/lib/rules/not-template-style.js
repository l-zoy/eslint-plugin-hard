/**
 * @author Zoy
 */

const { RuleTester } = require('eslint')
const rule = require('../../../lib/rules/not-template-style')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('not-template-style', rule, {
  valid: [`<template><div /></template>`, `<template><div :style /></template>`],
  invalid: [
    {
      code: `<template><p style></p></template>`,
      errors: [
        {
          messageId: 'avoidStyle'
        }
      ]
    }
  ]
})
