const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')
const { scrape } = require('./src/lib/scraper')

const filePath = path.join(__dirname, '4-ristoranti.html')

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, content) {
  if (!err) {
    const dom = new JSDOM(content)

    scrape(dom.window.document)
  } else {
    console.log(err)
  }
})
