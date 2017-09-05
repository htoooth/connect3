
const Middleware = require('./core/raichu-middleware')
const App = require('./core/raichu-server')
const config = require('./config/common')
const pkg = require('./package.json')
const logger = require('./utils/logger')

const middleware = new Middleware()
const app = new App()

try {
  require('./dispatch')(middleware)
} catch(e) {
  logger.error('loading middleware error', e)
}

app.use(middleware)

app.listen(config.port, () => {
  logger.info(`${pkg.name} server listen at ${config.port}`)
})