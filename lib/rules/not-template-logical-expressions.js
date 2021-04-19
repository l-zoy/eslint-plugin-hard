/**
 * @typedef {import('vue-eslint-parser').AST.VAttribute} VAttribute
 */

module.exports = {
  meta: {
    docs: {
      description: 'not template logical expressions',
      category: 'vue-template',
      recommended: true
    },
    schema: [],
    messages: {
      avoidLogicalExpressions:
        'Logical expressions are not allowed in templates, and evaluation properties should be used.\n (不要在模板内使用逻辑表达式, 因该使用计算属性)'
    }
  },
  create(context) {
    return context.parserServices.defineTemplateBodyVisitor({
      /** @type {( node:VAttribute ) => void} */
      VAttribute(node) {
        if (
          node.key.name.name === 'bind' &&
          (node.value.expression.type === 'ConditionalExpression' ||
            node.value.expression.type === 'LogicalExpression')
        ) {
          context.report({
            node,
            messageId: 'avoidLogicalExpressions'
          })
        }
      }
    })
  }
}
