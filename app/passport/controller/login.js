
const service = require('../model/login-service')

async function signIn(ctx, next) {
  const userName = ctx.req.cmd.body.userName
  const password = ctx.req.cmd.body.password

  if (!userName || !password) {
    return ctx.res.write('用户名或密码错误')
  }

  service.login(ctx, userName, password).then((result) => {
    if (result.code === 200) {
      service.syncSession(ctx, result.data)
        .then(() => {
          return ctx.res.write(result.message)
        })
    } else {
      return ctx.res.write(result.message)
    }
  }).catch(next)
}

async function logout(ctx) {

}

module.exports = {
  signIn,
  logout
}