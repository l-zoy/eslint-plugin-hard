/**
 * @fileoverview Strict specifications
 * @author zoy
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex')
const path = require('path')

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
// eslint-disable-next-line no-path-concat
module.exports.rules = requireIndex(path.join(__dirname, 'rules'))
