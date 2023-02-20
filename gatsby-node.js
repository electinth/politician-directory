/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const axios = require(`axios`)
const { buildContentIndex } = require("./helpers/contentIndexBuilder")

const {
  buildLocationOptions,
  buildSearchableZones,
} = require("./helpers/searchDataBuilder")

exports.onPreInit = () => {
  console.log("Building content index...")
  buildContentIndex("./src/contents/search_index.yaml")

  console.log("Building location and searchable zones...")
  buildLocationOptions("./static/content/locations.json")
  buildSearchableZones("./static/content/zones.json")
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `PeopleYaml`) {
    const slug = `/people/${node.name}-${node.lastname.replace(/ /g, "-")}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  if (node.internal.type === `PartyYaml`) {
    const slug = `/party/${node.name}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  if (node.internal.type === `VotelogYaml`) {
    const slug = `/votelog/${node.id}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  if (node.internal.type === `MotionYaml`) {
    const id = node.id
    const slug = `/motions/${id}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }

  if (node.internal.type === `MotionCatYaml`) {
    const slug = `/motions/category/${node.sub_cat.replace(/ /g, "-")}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // People
  const people = await graphql(`
    query {
      allPeopleYaml {
        edges {
          node {
            fields {
              slug
            }
            name
            lastname
            party
          }
        }
      }
    }
  `)
  people.data.allPeopleYaml &&
    people.data.allPeopleYaml.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/people-template.js`),
        context: {
          slug: node.fields.slug,
          name: node.name,
          lastname: node.lastname,
          party: node.party,
        },
      })
    })
  // Party
  const parties = await graphql(`
    query {
      allPartyYaml(filter: { party_type: { eq: "พรรค" } }) {
        edges {
          node {
            fields {
              slug
            }
            name
          }
        }
      }
    }
  `)
  parties.data.allPartyYaml.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/party-template.js`),
      context: {
        slug: node.fields.slug,
        party: node.name,
      },
    })
  })
  // Vote Logs
  const votelogs = await graphql(`
    query {
      allVotelogYaml(filter: { is_active: { eq: true } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  votelogs.data.allVotelogYaml.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/votelog-template.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  // Vote Log Lists
  const allVotelogs = votelogs.data.allVotelogYaml.edges
  const votelogPerPage = 6
  const numPages = Math.ceil(allVotelogs.length / votelogPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/votelog` : `/votelog/page/${i + 1}`,
      component: path.resolve("./src/templates/votelog-list-template.js"),
      context: {
        limit: votelogPerPage,
        skip: i * votelogPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Motion
  const motions = await graphql(`
    query {
      allMotionYaml {
        edges {
          node {
            id
            select_committee
            main_cat
            votelog_id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  motions.data.allMotionYaml.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/motion-template.js"),
      context: {
        id: node.id,
        select_committee: node.select_committee,
        main_cat: node.main_cat,
        votelog_id: node.votelog_id,
      },
    })
  })

  // Motion Category
  const motionCats = await graphql(`
    query {
      allMotionCatYaml {
        edges {
          node {
            sub_cat
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  motionCats.data.allMotionCatYaml.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/motion-category-template.js"),
      context: {
        sub_cat: node.sub_cat,
      },
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/votelog/)) {
    page.matchPath = "/votelog/*"
    createPage(page)
  }
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  // Contributors
  const { data } = await axios.get(
    `https://api.github.com/repos/electinth/politician-directory/contributors`
  )

  data.forEach(contributor => {
    const meta = {
      id: createNodeId(`contributor-${contributor.id}`),
      parent: null,
      children: [],
      internal: {
        type: `Contributor`,
        contentDigest: createContentDigest(contributor),
      },
    }
    const node = Object.assign({}, contributor, meta)
    createNode(node)
  })
}
