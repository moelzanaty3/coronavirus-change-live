const express = require('express')
const newsRoutes = require('./api/news')

const routes = express.Router()

routes.use('/news', newsRoutes)

module.exports = routes
