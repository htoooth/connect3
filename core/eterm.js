const etermDriver = require('./eterm-driver')
const etermProtocol = require('./eterm-protocol')
const pool = require('generic-pool')
const Emitter = require('events').EventEmitter

module.exports = class extends Emitter {
  constructor() {
    super()
  }
}