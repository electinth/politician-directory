const yaml = require('js-yaml')
const fs = require('fs')

const config = require('./config')

function buildContentIndex (indexPath) {
  try {
    const contentIndex = config.reduce((prevContent, content) => [
      ...prevContent,
      ...yaml.safeLoad(fs.readFileSync(content.path, 'utf8')).map(record => ({
        q: content.getQ(record),
        type: content.type,
        url: content.getUrl(record),
      }))
    ], [])

    fs.writeFileSync(indexPath, yaml.safeDump(contentIndex), 'utf8')
  } catch (e) {
    console.log(e)
  }
}

module.exports = { buildContentIndex }
