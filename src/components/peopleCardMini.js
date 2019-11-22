import React from "react"
import { Link } from "gatsby"

import { politicianPicture } from "../utils"

const MPInfo = props => (
  <div
    css={{
      fontFamily: "var(--ff-text)",
      fontWeight: "bold",
      fontSize: "1.6rem",
      a: { color: "inherit" },
      verticalAlign: "center",
      height: "100%",
    }}
  >
    <Link to={props.fields.slug}>{`${props.name} ${props.lastname}`}</Link>
  </div>
)

const PeopleCardMini = props => {
  // console.log(props)
  let peopleInfo = MPInfo(props)
  console.log("props", props)
  return (
    <div
      key={props.id}
      className={props.className}
      css={{
        display: "block",
        flex: "1 1 360px",
        fontSize: "1.8rem",
        marginBottom: "2rem",
      }}
    >
      <div style={{ marginBottom: "1rem", fontWeight: "medium" }}>
        {props.position}
      </div>
      <div>
        <Link to={props.fields.slug}>
          <div
            className="profile-picture"
            css={{
              borderRadius: 84,
              width: 41,
              height: 41,
              float: "left",
              marginBottom: 0,
              marginRight: "1rem",
              border: "2px solid var(--cl-black)",
              background: "var(--cl-gray-2) no-repeat",
              backgroundSize: "cover",
            }}
            style={{
              backgroundImage: `url(${politicianPicture(props)})`,
            }}
          ></div>
        </Link>
      </div>
      <div style={{ marginTop: "2rem" }}>{peopleInfo}</div>
    </div>
  )
}

export default PeopleCardMini
