/**
 * @typedef {import('vue-eslint-parser').AST.VElement} VElement
 */

module.exports = {
  meta: {
    docs: {
      description: 'attribute erection sequence',
      category: 'vue-template',
      recommended: true
    },
    schema: [],
    messages: {
      attributeErectionSequence:
        'Property lengths are arranged from long to short.\n属性长度从长到短排列.'
    }
  },
  create(context) {
    return context.parserServices.defineTemplateBodyVisitor({
      /** @type {( node:VElement ) => void} */
      VElement(node) {
        const { start, end } = node.loc
        const { attributes } = node.startTag

        if (start.line !== end.line && attributes.length > 1) {
          const length = []
          for (let i = attributes.length - 1; i >= 0; i--) {
            const { loc } = attributes[i]
            length.unshift(loc.end.column - loc.start.column)
          }
          const newLength = [...length].sort((a, b) => b - a)
          if (JSON.stringify(newLength) !== JSON.stringify(length)) {
            context.report({
              node,
              messageId: 'attributeErectionSequence'
            })
          }
        }
      }
    })
  }
}
