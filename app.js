
const Middleware = require('./core/raichu-middleware')
const App = require('./core/raichu-server')
const config = require('./config/common')
const pkg = require('./package.json')

const middleware = new Middleware()
const app = new App()

try {
  require('./dispatch')(middleware)
} catch(e) {
  console.log('loading middleware error')
}

app.use(middleware)

app.listen(config.port, () => {
  console.log(`${pkg.name} server listen port ${port}`)
})