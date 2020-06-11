import React from "react"
import { Link } from "gatsby"
import FloatingCard from "./floatingCard"
import { motionCategorySlug } from "../utils"

const MotionSubCatCard = ({ type, ...props }) => {
  return (
    <Link
      to={`/motions/category/${motionCategorySlug(props.title)}`}
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
        <div
          css={{
            flexShrink: "0",
            width: "40px",
            display: "flex",
            marginRight: "16px",
          }}
        >
          <img
            src={`/motion/icons/${motionCategorySlug(props.title)}.png`}
            css={{ marginBottom: "0" }}
          />
        </div>
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
