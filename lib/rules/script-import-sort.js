/**
 * @typedef {import('vue-eslint-parser').AST.ESLintProgram} ESLintProgram
 */
const isEqual = require('lodash.isequal')

module.exports = {
  meta: {
    docs: {
      description: 'script import sort',
      category: 'vue-script',
      recommended: true
    },
    schema: [],
    messages: {
      scriptImportSort: 'import sort.\n (导入进行排序)'
    }
  },
  create(context) {
    return context.parserServices.defineTemplateBodyVisitor(
      {},
      {
        /** @type {( node:ESLintProgram ) => void} */
        Program(node) {
          const level0 = []
          const level1 = []
          const level2 = []

          node.body.forEach((ident) => {
            if (ident.type === 'ImportDeclaration') {
              if (ident.source.value.charAt(0) === '.') {
                level1.push(ident)
              } else {
                level0.push(ident)
              }
            } else {
              level2.push(ident)
            }
          })

          level0.sort(
            (a, b) =>
              b.loc.end.column - b.loc.start.column - (a.loc.end.column - a.loc.start.column)
          )

          level1.sort(
            (a, b) =>
              b.loc.end.column - b.loc.start.column - (a.loc.end.column - a.loc.start.column)
          )

          if (!isEqual(node.body, [...level0, ...level1, ...level2])) {
            context.report({
              node,
              messageId: 'scriptImportSort'
            })
          }
        }
      }
    )
  }
}
