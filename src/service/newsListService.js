const BaseService = require('./baseService')
const NewsModel = require('../middleware/model')('NewsModel')

console.log(NewsModel)

class NewsListService extends BaseService {
}

const newsListService = new NewsListService(NewsModel)
module.exports = newsListService