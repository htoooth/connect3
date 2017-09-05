
module.exports = class {
  constructor(req, res) {
    this.req = req
    this.res = res
    this.session = {}
    this.sessionId = null
  }
}