console.log('--------app.js-start-------')
const action = require('./src/middleware/action')
const api = require('./src/middleware/api')
const logger = require('./src/middleware/logger')
const front = require('./src/middleware/front')
const koaBody = require('koa-body')

const engine = (app) => {

    app.use(logger)

    app.use(koaBody({
      multipart: true,
      formidable: {
        uploadDir: __dirname
      }
    }))

    front(app)

    app.use(api.routes())
    app.use(action.routes())
}

module.exports = engine;