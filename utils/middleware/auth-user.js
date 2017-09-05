module.exports = async function (ctx, next) {
  if (ctx.session.user) {
    await next()
  } else {
    return ctx.res.write('没有登录')
  }
}