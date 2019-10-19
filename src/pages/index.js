import React from "react"
import { graphql, Link } from "gatsby"

import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Button from "../components/button"

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
  <Layout
    pageStyles={{
      background: "var(--cl-pink)",
    }}
  >
    <SEO title="Home" />
    <h1
      css={{
        fontSize: "6rem",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 0,
        paddingTop: "6rem",
      }}
    >
      ใครคือผู้แทนของเรา
    </h1>
    <h2 css={{ fontSize: "4.8rem", textAlign: "center" }}>
      ค้นหา ตรวจสอบ โปร่งใส
    </h2>

    <div css={{ maxWidth: `600px`, margin: `0 auto 1.45rem` }}>
      <Image />

      <div css={{ textAlign: "center" }}>
        <Button to="/about">เกี่ยวกับเรา</Button>
      </div>
    </div>
    <h2
      css={{
        marginBottom: rhythm(1 / 4),
      }}
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
