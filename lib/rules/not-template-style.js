/**
 * @typedef {import('vue-eslint-parser').AST.VAttribute} VAttribute
 */

module.exports = {
  meta: {
    docs: {
      description: 'not template style',
      category: 'vue-template',
      recommended: true
    },
    schema: [],
    messages: {
      avoidStyle: 'template does not allow style attribute. In addition to dynamic bind'
    }
  },
  create(context) {
    return context.parserServices.defineTemplateBodyVisitor({
      /** @type {( node:VAttribute ) => void} */
      VAttribute(node) {
        if (node.key.name === 'style') {
          context.report({
            node,
            messageId: 'avoidStyle'
          })
        }
      }
    })
  }
}
