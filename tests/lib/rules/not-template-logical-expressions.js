/**
 * @author Zoy
 */

const { RuleTester } = require('eslint')
const rule = require('../../../lib/rules/not-template-logical-expressions')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('not-template-logical-expressions', rule, {
  valid: [
    `<template><div /></template>`,
    `<template><div :style="data" /></template>`,
    `<template><div style="hello ? true : false"/></template>`,
    `<template><div style="hello && true || false"/></template>`,
    `<template><div style="hello && true"/></template>`,
    `<template><div style="hello || true" v-for="hello in data"/></template>`
  ],
  invalid: [
    {
      code: `<template><p :style="data ? true : false"></p></template>`,
      errors: [
        {
          messageId: 'avoidLogicalExpressions'
        }
      ]
    },
    {
      code: `<template><p :style="data || ''"></p></template>`,
      errors: [
        {
          messageId: 'avoidLogicalExpressions'
        }
      ]
    },
    {
      code: `<template><p :style="data && ''"></p></template>`,
      errors: [
        {
          messageId: 'avoidLogicalExpressions'
        }
      ]
    }
  ]
})
