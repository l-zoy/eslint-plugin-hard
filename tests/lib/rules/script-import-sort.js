/**
 * @author Zoy
 */

const { RuleTester } = require('eslint')
const rule = require('../../../lib/rules/script-import-sort')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
})

tester.run('script-import-sort', rule, {
  valid: [
    `
  <template>
  </template>
  <script>
    import foo from 'foo-bar'
    import vue from 'vue'

    export default {}
  </script>
  `,
    `
  <template>
  </template>
  <script>
    import vue from 'vue'
    import foo from './foo-bar'
    export default {}
  </script>
  `,
    `
  <template>
  </template>
  <script>
    import path from 'path'
    import vue from 'vue'

    import foo from './foo-bar'
    import react from './vue'
    export default {}
  </script>
  `
  ],
  invalid: [
    {
      code: `
      <template>
      </template>
      <script>
        import vue from 'vue'

        export default {}
        import foo from 'foo-bar'
      </script>
      `,
      errors: [
        {
          messageId: 'scriptImportSort'
        }
      ]
    },
    {
      code: `
      <template>
      </template>
      <script>
        import foo from './foo-bar'
        import vue from 'vue'

        export default {}
      </script>
      `,
      errors: [
        {
          messageId: 'scriptImportSort'
        }
      ]
    }
  ]
})
