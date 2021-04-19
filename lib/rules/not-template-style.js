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
      avoidStyle:
        'template does not allow style attribute. In addition to dynamic bind.\n (除动态绑定样式, 不要直接在元素上使用style属性)'
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
