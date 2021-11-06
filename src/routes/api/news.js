const { Router } = require('express')
const config = require('../../config')
const getArticles = require('../../controllers/scrape.controllers')

const routes = Router()

routes.get('/', async (_req, res, next) => {
  try {
    const articles = await getArticles()
    return res.json({
      status: 'success',
      data: articles,
      message: 'News retrieved successfully'
    })
  } catch (err) {
    next(err)
  }
})

routes.get('/:newspaperId', async (req, res, next) => {
  try {
    const { newspaperId } = req.params
    const articles = await getArticles(newspaperId)
    return res.json({
      status: 'success',
      data: articles,
      message: 'News retrieved successfully'
    })
  } catch (err) {
    next(err)
  }
})

module.exports = routes
