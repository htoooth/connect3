
module.exports = (mw) => {
  mw.use(require('./app/passport'))
  mw.use(require('./app/ticket'))

  /// client error
  mw.use('*', require('./utils/middleware/not-found'))
}