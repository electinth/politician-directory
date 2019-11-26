const yaml = require('js-yaml')
const fs = require('fs')

try {
  const doc = yaml.safeLoad(fs.readFileSync('../src/contents/party.yaml', 'utf8')).map(rec => ({
      q: rec.name,
      type: 'party',
      page: `/party/${rec.name}`,
  }))

  fs.writeFileSync('../src/contents/index.yaml', yaml.safeDump(doc), 'utf8')
} catch (e) {
  console.log(e)
}
