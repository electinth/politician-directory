module.exports = [
  {
    type: "party",
    path: "./src/contents/party.yaml",
    getQ: record => record.name,
    getUrl: record => `/party/${record.name}`,
  },
  {
    type: "people",
    path: "./src/contents/people.yaml",
    getQ: record => `${record.title} ${record.name} ${record.lastname}`,
    getUrl: record => `/people/${record.name}-${record.lastname}`,
  },
  {
    type: "votelog",
    path: "./src/contents/votelog.yaml",
    getQ: record => record.title,
    getUrl: record => `/votelog/${record.id}`,
  },
]
