import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"

import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export const query = graphql`
  query {
    allProfileYaml {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          prefix
          name
          positions
          in_cabinet
          in_senate
          in_representatives
        }
      }
    }
    allPartyYaml {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          short
          name
        }
      }
    }
    allMemoYaml {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          name
          date
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>ใครคือผู้แทนของเรา</h1>
    <p>ค้นหา ตรวจสอบ โปร่งใส</p>

    <div style={{ maxWidth: `600px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <h2
      css={css`
        margin-bottom: ${rhythm(1 / 4)};
      `}
    >
      สารบัญ
    </h2>
    <ul>
      <li>
        <Link to="/cabinet/">ครม.</Link>
        <ul>
          {data.allProfileYaml.edges
            .filter(({ node }) => node.in_cabinet)
            .map(({ node }) => (
              <li>
                <Link
                  to={node.fields.slug}
                >{`${node.prefix} ${node.name}`}</Link>
              </li>
            ))}
        </ul>
      </li>
      <li>
        <Link to="/representatives/">ส.ส.</Link>
        <ul>
          {data.allProfileYaml.edges
            .filter(({ node }) => node.in_representatives)
            .map(({ node }) => (
              <li>
                <Link
                  to={node.fields.slug}
                >{`${node.prefix} ${node.name}`}</Link>
              </li>
            ))}
        </ul>
      </li>
      <li>
        <Link to="/senate/">ส.ว.</Link>
        <ul>
          {data.allProfileYaml.edges
            .filter(({ node }) => node.in_senate)
            .map(({ node }) => (
              <li>
                <Link
                  to={node.fields.slug}
                >{`${node.prefix} ${node.name}`}</Link>
              </li>
            ))}
        </ul>
      </li>
      <li>
        <Link to="/party/พปชร">พรรคการเมือง</Link>
        <ul>
          {data.allPartyYaml.edges.map(({ node }) => (
            <li>
              <Link to={node.fields.slug}>{`${node.name}`}</Link>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <Link to="/memo/">บันทึกมติ</Link>
        <ul>
          {data.allMemoYaml.edges.map(({ node }) => (
            <li>
              <Link to={node.fields.slug}>{`${node.name}`}</Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
