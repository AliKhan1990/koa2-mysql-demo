const router = process.router
const newsListService = require('../service/newsListService')

const TableName = 'news_list'

router.get('/news-list', async(ctx, next) => {
  const { offset, limit, fields } = ctx.request.query
  let res = {}
  if (fields) {
    res = await newsListService.getById(offset, limit, fields)
  } else {
    res = await newsListService.getList(offset, limit)
  }
  ctx.body = {
    status: 400,
    data: res
  }
})

router.post('/news-list', async(ctx, next) => {
  let params = ctx.request.body
  let res = await newsListService.add(params)
  ctx.body = {
    status: 400,
    data: res
  }
})

router.put('/news-list/:id', async(ctx, next) => {
  let id = ctx.params.id
  let params = ctx.request.body

  let res = await newsListService.update(params, id)
  ctx.body = {
    status: 400,
    data: res
  }
})

router.delete('/news-list/:id', async(ctx, next) => {
  let id = ctx.params.id
  let res = await newsListService.deleteById(id)
  ctx.body = {
    status: 400,
    data: res
  }
})

module.exports = router