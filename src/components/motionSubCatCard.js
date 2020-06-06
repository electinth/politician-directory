import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import FloatingCard from "./floatingCard"
import { categorySlug } from "../utils"

const MotionSubCatCard = ({ type, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "images/people/placeholder.png" }
      ) {
        childImageSharp {
          fixed(height: 48) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Link
      to={categorySlug(props.title)}
      key={props.id}
      className={props.className}
      css={{
        textDecoration: "none",
        "&:hover": {
          textDecoration: "none",
        },
        ...props.css,
      }}
      style={props.style}
    >
      <FloatingCard
        style={{
          padding: "2rem",
          display: "flex",
          flex: "0 1 4.5rem",
          justifyContent: "space-between",
          height: "100px",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Img
          fixed={data.placeholderImage.childImageSharp.fixed}
          css={{ marginRight: "16px", flexShrink: "0" }}
        />
        <div css={{ flexGrow: "1" }}>
          <h2 style={{ margin: "0" }}>{props.title}</h2>
        </div>
        <div
          css={{
            display: "flex",
            backgroundColor: "#F6F6F6",
            borderRadius: "50%",
            marginLeft: "16px",
            width: "4.5rem",
            height: "4.5rem",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: "0",
          }}
        >
          <div css={{ color: "var(--cl-black)" }}>{props.count}</div>
        </div>
      </FloatingCard>
    </Link>
  )
}

export default MotionSubCatCard
