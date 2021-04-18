/**
 * @author Zoy
 */

const { RuleTester } = require('eslint')
const rule = require('../../../lib/rules/attribute-erection-sequence')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('attribute-erection-sequence', rule, {
  valid: [
    `<template><div v-show  alt="Vue logo" src="./assets/logo.png" v-bind="b"/></template>`,
    `
  <template>
  <img
    src="./assets/logo.png"
    aria-describedat=""
    alt="Vue logo"
    v-bind="b"
    height
    v-key
  />
  </template>
  `
  ],
  invalid: [
    {
      code: `
      <template>
      <img
        alt="Vue logo"
        v-bind="b"
        height
        v-key
        src="./assets/logo.png"
        aria-describedat=""
      />
      </template>
      `,
      errors: [
        {
          messageId: 'attributeErectionSequence'
        }
      ]
    }
  ]
})
