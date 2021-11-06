const cheerio = require('cheerio')
const axios = require('axios')
const pretty = require('pretty')
const lodash = require('lodash')
const newspapers = require('../data/newspapers')

async function getArticles(newspaperId = null) {
  const articles = []

  const targetNewspapers = newspaperId
    ? newspapers.filter(({ source }) => source === newspaperId)
    : newspapers
  for (const newspaper of targetNewspapers) {
    const { source, url, base } = newspaper
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)
    // console.log(pretty($.html()))
    $(
      'a:contains("coronavirus"), a:contains("Coronavirus"), a:contains("covid"), a:contains("COVID")',
      html
    ).each(function () {
      const articleTitle = $(this).text().trim()
      const articleUrl = $(this).attr('href')

      articles.push({
        title: articleTitle,
        url: base + articleUrl,
        source
      })
    })
  }

  return articles
}

module.exports = getArticles
