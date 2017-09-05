const logger = require('../logger')

module.exports = async function ({req, res}) {
  logger.error('not found method')
  res.end('输入命令有误')
}