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
  if (node.internal.type === `ProfileYaml`) {
    const slug = `/profile/${node.id}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  if (node.internal.type === `PartyYaml`) {
    const slug = `/party/${node.short}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  if (node.internal.type === `MemoYaml`) {
    const slug = `/memo/${node.id}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // Profile
  const profiles = await graphql(`
    query {
      allProfileYaml {
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
  profiles.data.allProfileYaml.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/profile-template.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
  // Party
  const parties = await graphql(`
    query {
      allPartyYaml {
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
  // Memo
  const memoes = await graphql(`
    query {
      allMemoYaml {
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
  memoes.data.allMemoYaml.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/memo-template.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
