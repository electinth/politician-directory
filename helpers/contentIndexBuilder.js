const yaml = require('js-yaml')
const fs = require('fs')

const config = [
  { fileName: 'party.yaml', getQ: record => record.name, type: 'party', getPage: record => `/party/${record.name}` },
]

try {
  const contentIndex = config.reduce((prevContent, content) => [
    ...prevContent,
    ...yaml.safeLoad(fs.readFileSync(`../src/contents/${content.fileName}`, 'utf8')).map(record => ({
      q: content.getQ(record),
      type: content.type,
      page: content.getPage(record),
    }))
  ], [])

  fs.writeFileSync('../src/contents/index.yaml', yaml.safeDump(contentIndex), 'utf8')
} catch (e) {
  console.log(e)
}
