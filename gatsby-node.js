/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const axios = require(`axios`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// You can delete this file if you're not using it
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `PeopleYaml`) {
    const slug = `/people/${node.name}-${node.lastname}`
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
      allVotelogYaml {
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
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  // Contributors
  const { data } = await axios.get(
    `https://api.github.com/repos/codeforthailand/politician-directory/contributors`
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
