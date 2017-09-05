const Router = require('./raichu-router');
const Promise = require('bluebird')

module.exports = class Middleware {
  constructor() {
    this.routers = []
  }

  static Router() {
    return new Router()
  }

  use(path, router) {

    if (typeof path === 'string') {
      this.routers.push(new Router(path, router))
      return this
    }

    this.routers.push(router)
    return this;
  }

  async call(path, ctx) {
    await Promise.each(this.routers, async (router) => {
      return router.call(path || '/', ctx)
    })
  }
}