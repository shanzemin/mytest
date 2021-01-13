'use strict'

const Koa = require('koa')
const helmet = require('koa-helmet')
const koaSession = require('koa-session')
const app = new Koa()

const sessionSignedKey = ['sdfnireunvsefsavfrb']
const sessionConfig = {
  key: 'koa:sess',
  maxAge: 4000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
  renew: false
}

const session = koaSession(sessionConfig, app)
app.keys = sessionSignedKey

app.use(helmet())
app.use(session)

app.use((ctx) => {
  if (!ctx.session.logined) {
    const query = ctx.request.query
    console.log(query)
    ctx.session.logined = false
    if (query.name === 'szm' && query.pass === '123') {
      ctx.body = '登录成功'
      ctx.session.logined = true
    } else {
      ctx.body = '登录失败'
    }
  } else {
    ctx.body = '已登录'
  }
})

app.listen(4000)
