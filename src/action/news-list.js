const router = process.routerAction

const newsListService = require('../service/newsListService')

router.get('/news-list/:id', async(ctx, next) => {
  let result = await newsListService.getById(ctx.params.id);
  await ctx.render(`news-list/${result[0].newsInfo.type}`, {
    data: result[0].newsList
  })
})
module.exports = router;