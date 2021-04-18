/**
 * @author Zoy
 */

const { RuleTester } = require('eslint')
const rule = require('../../../lib/rules/not-template-annotation')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('not-template-annotation', rule, {
  valid: [
    `<template><div /></template>`,
    `<!-- asd --><template><div /></template>`,
    `<template>
      <!-- asd -->
      <div />
    </template>`,
    `
    <template>
      <div />
    </template><!-- asd -->`,
    `<template><div /></template><!-- asd -->`,
    `<template><div><template></template></div></template><!-- asd -->`
  ],
  invalid: [
    {
      code: `
      <template>
        <p>
          <!-- <p /> -->
        </p>
      </template>`,
      errors: [
        {
          messageId: 'avoidComments'
        }
      ]
    },
    {
      code: `
      <template>
        <p /><!-- <p /> -->
      </template>`,
      errors: [
        {
          messageId: 'avoidComments'
        }
      ]
    },
    {
      code: `<template><p /><!-- <p /> --></template>`,
      errors: [
        {
          messageId: 'avoidComments'
        }
      ]
    },
    {
      code: `<template><p /><!-- <p /> -->
      </template>`,
      errors: [
        {
          messageId: 'avoidComments'
        }
      ]
    },
    {
      code: `<template><p />
      <!-- <p /> --></template>`,
      errors: [
        {
          messageId: 'avoidComments'
        }
      ]
    },
    {
      code: `<template><p />
      <div>
        <template>
        <!-- <p /> -->
        </template>
      </div>
      </template>`,
      errors: [
        {
          messageId: 'avoidComments'
        }
      ]
    }
  ]
})
