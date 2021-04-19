/**
 * @typedef {import('vue-eslint-parser').AST.VElement} VElement
 * @typedef {import('vue-eslint-parser/ast/tokens').Token} Token
 */

module.exports = {
  meta: {
    docs: {
      description: 'not template annotation',
      category: 'vue-template',
      recommended: true
    },
    schema: [],
    messages: {
      avoidComments: 'template does not allow comments.\n (无用的代码应该删除,增加可阅读性.)'
    }
  },
  create(context) {
    return context.parserServices.defineTemplateBodyVisitor({
      /** @type {( node:VElement & {comments:Token[]} ) => void} */
      VElement(node) {
        const { start, end } = node.loc

        function report(value) {
          const tag = /<[^>]+>/
          if (tag.test(value)) {
            context.report({
              node,
              messageId: 'avoidComments'
            })
          }
        }

        if (node.comments && node.comments.length) {
          node.comments.forEach(({ loc, value }) => {
            if (start.line < loc.start.line && end.line > loc.end.line) {
              report(value)
            } else if (start.line === loc.start.line) {
              if (
                start.column < loc.start.column &&
                (end.line > loc.end.line || end.column > loc.end.column)
              ) {
                report(value)
              }
            } else if (end.line === loc.end.line) {
              if (
                end.column > loc.end.column &&
                (start.line < loc.start.line || start.column > loc.start.column)
              ) {
                report(value)
              }
            }
          })
        }
      }
    })
  }
}
