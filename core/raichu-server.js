const net = require('net')
const uuid = require('uuid')
const _ = require('lodash')
const EventEmitter = require('events').EventEmitter

const Actor = require('./raichu-actor')
const logger = require('../utils/logger')

module.exports = class Server extends EventEmitter{
  constructor(opts) {
    super()
    this.opts = opts
    this.server = null
    this.middleware = null
    this.actors = []
  }

  use(middleware) {
    this.middleware = middleware
  }

  listen(port, cb) {
    this.server = net.createServer((socket) => {
      logger.info('new user connected')

      const actorId = uuid.v4()
      const actor = new Actor(actorId, socket, this)

      this.addActor(actor)

      actor.on('error', () => {
        this.removeActor(actor)
      })
    })

    this.server.listen(port, () => {
      this.emit('ready')
      cb && cb()
    })
  }

  _send(actor, event, ...data) {
    actor.emit(event, ...data)
  }

  broadcast(event, ...data) {
    this.actors.forEach((actor) => {
      this._send(actor, event, ...data)
    })
  }

  addActor(actor) {
    this.actors.push(actor)
  }

  removeActor(actor) {
    _.remove(this.actors, actor)
  }
}