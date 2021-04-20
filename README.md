# eslint-plugin-hard

扩展 vue-eslint-plugin 规则, 它是严格的

## 安装

您首先需要安装 [ESLint](http://eslint.org), 和[vue-eslint-plugin](https://github.com/vuejs/eslint-plugin-vue)

```
$ npm i eslint --save-dev
$ npm i vue-eslint-plugin --save-dev
```

接下来，安装 `eslint-plugin-hard`:

```
$ npm install eslint-plugin-hard --save-dev
```

## 用法:

将`hard`添加到`.eslintrc`配置文件的插件部分。您可以省略`eslint-plugin-`前缀:

```js
{
  "extends": [
    // 在此处添加更多通用规则集，例如:
    // 'eslint:recommended',
    "plugin:vue/vue3-recommended",
    // 'plugin:vue/recommended' // 如果您正在使用 Vue.js 2.x，请使用此.
    "plugin:hard/recommended"
  ],
  "plugins": ["hard"]
}
```

## 可用的规则:

```js
{
  "rules": {
    "not-template-annotation": 2,
    // template 不能注释无用的dom元素, 只能是解释型注释
    "attribute-erection-sequence": 2,
    // 元素多行属性的时候需要从长到短进行排序
    "not-template-logical-expressions": 2,
    // 不能在template上使用逻辑表达式
    "not-template-style": 2,
    // 不能在template上使用style属性, 除非动态绑定
    "script-import-sort": 2
    // import 导入的顺序
  }
}
```
