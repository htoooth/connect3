const compose = require('koa-compose')
const Promise = require('bluebird')

const makeRoute = require('path-match')({
  sensitive: false,
  strict: false,
  end: false,
})


module.exports.Route = class Route {
  constructor(path, fns) {
    this.route = makeRoute(path)
    this.composeFn = compose(fns)
  }

  match(path) {
    return this.route(path)
  }

  async call(ctx) {
    if (ctx.res._headers) {
      throw new Error('headers already setting')
    }

    return this.composeFn.call(this, ctx)
  }
}

module.exports.Router = class Router {
  constructor() {
    this.routes = []
  }

  use(path, ...fns) {
    fns = fns || []

    if (typeof path === 'Function') {
      fns.push(fns)

      this.routes.push(new Route('/', fns))
      return this
    }

    this.routes.push(new Route(path, fns))
    return this
  }

  async call(path, ctx) {
    return Promise.map(this.routes, (route) => {
      let params = route.match(path)

      if (params === false) {
        break;
      }

      return route.call(params, ctx)
    })

  }
}