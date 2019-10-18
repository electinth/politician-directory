import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"

import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export const query = graphql`
  query {
    allPeopleYaml {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          title
          name
          cabinet_position
          prev_polit_pos
          is_cabinet
          is_senator
          is_mp
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
          name
          short_name
        }
      }
    }
    allVotelogYaml {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          title
          vote_date
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
          {data.allPeopleYaml.edges
            .filter(({ node }) => node.is_cabinet)
            .map(({ node }) => (
              <li>
                <Link
                  to={node.fields.slug}
                >{`${node.title} ${node.name}`}</Link>
              </li>
            ))}
        </ul>
      </li>
      <li>
        <Link to="/representatives/">ส.ส.</Link>
        <ul>
          {data.allPeopleYaml.edges
            .filter(({ node }) => node.is_mp)
            .map(({ node }) => (
              <li>
                <Link
                  to={node.fields.slug}
                >{`${node.title} ${node.name}`}</Link>
              </li>
            ))}
        </ul>
      </li>
      <li>
        <Link to="/senate/">ส.ว.</Link>
        <ul>
          {data.allPeopleYaml.edges
            .filter(({ node }) => node.is_senator)
            .map(({ node }) => (
              <li>
                <Link
                  to={node.fields.slug}
                >{`${node.title} ${node.name}`}</Link>
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
        <Link to="/votelog/">บันทึกมติ</Link>
        <ul>
          {data.allVotelogYaml.edges.map(({ node }) => (
            <li>
              <Link to={node.fields.slug}>{`${node.title}`}</Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
