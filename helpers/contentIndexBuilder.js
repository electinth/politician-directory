const yaml = require('js-yaml')
const fs = require('fs')

const config = [
  { fileName: 'party.yaml', getQ: record => record.name, type: 'party', getUrl: record => `/party/${record.name}` },
  { fileName: 'people.yaml', getQ: record => `${record.title} ${record.name} ${record.lastname}`, type: 'people', getUrl: record => `/people/${record.name}-${record.lastName}` },
  { fileName: 'votelog.yaml', getQ: record => record.title, type: 'votelog', getUrl: record => `/votelog/${record.id}` },
]

try {
  const contentIndex = config.reduce((prevContent, content) => [
    ...prevContent,
    ...yaml.safeLoad(fs.readFileSync(`../src/contents/${content.fileName}`, 'utf8')).map(record => ({
      q: content.getQ(record),
      type: content.type,
      url: content.getUrl(record),
    }))
  ], [])

  fs.writeFileSync('../src/contents/index.yaml', yaml.safeDump(contentIndex), 'utf8')
} catch (e) {
  console.log(e)
}
