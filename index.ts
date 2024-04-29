import { readFile } from 'fs'
import { JSDOM } from 'jsdom'
import { scrape } from './src/lib/scraper'

readFile(
  '4-ristoranti.html',
  { encoding: 'utf-8' },
  (err: NodeJS.ErrnoException | null, content: string) => {
    if (!err) {
      const dom = new JSDOM(content)

      scrape(dom.window.document)
    } else {
      console.log(err)
    }
  }
)
