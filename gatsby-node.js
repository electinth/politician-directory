/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

const { createFilePath } = require(`gatsby-source-filesystem`)

// You can delete this file if you're not using it
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `PeopleYaml`) {
    const slug = `/people/${node.id}`
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
          }
        }
      }
    }
  `)
  people.data.allPeopleYaml.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/people-template.js`),
      context: {
        slug: node.fields.slug,
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
