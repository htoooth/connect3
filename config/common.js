
const _ = require('lodash')

const isTest = process.env.NODE_ENV === 'test'
const isProduct = process.env.NODE_ENV === 'product'

const config = {
  app: 'eterm-app',
  port: '8080'
}

if (isTest) {
  _.merge(config, {})
} else if (isProduct) {
  _.merge(config, {})
}

module.exports = config
