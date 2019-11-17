import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

import { politicianPicture } from "../utils"

export const ProfilePicture = props => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "images/people/placeholder@3x.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 84) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [imageStyle, setImageStyle] = useState({ display: "display" })
  const [placeholderStyle, setPlaceholderStyle] = useState({ display: "none" })

  const onImageError = e => {
    setImageStyle({ display: "none" })
    setPlaceholderStyle({ display: "block" })
  }

  return (
    <div
      css={{
        flex: "0 0 84px",
        borderRadius: 84,
        width: 84,
        height: 84,
        float: "left",
        marginBottom: 0,
        marginRight: "2rem",
        border: "2px solid var(--cl-black)",
        background: "var(--cl-gray-2) no-repeat",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
      style={
        {
          // backgroundImage: `url(${politicianPicture(props)})`,
        }
      }
    >
      <img
        src={politicianPicture(props)}
        alt={`${props.title} ${props.name} ${props.lastname}`}
        css={{ width: "100%" }}
        style={imageStyle}
        onError={onImageError}
      ></img>
      <Img
        fluid={data.placeholderImage.childImageSharp.fluid}
        style={placeholderStyle}
      />
    </div>
  )
}

const cssName = {
  fontFamily: "var(--ff-title)",
  fontSize: "2.4rem",
  lineHeight: 1.2,
  marginBottom: "0.5rem",
}

const MPInfo = props => (
  <div>
    <div css={cssName}>{`${props.title} ${props.name} ${props.lastname}`}</div>
    <div>
      {props.mp_type === "บัญชีรายชื่อ"
        ? `ส.ส. ${props.mp_type}` +
          (props.mp_list ? ` ลำดับที่ ${props.mp_list}` : ``)
        : `ส.ส. ${props.mp_type} จังหวัด${props.mp_province} เขต ${props.mp_zone}`}{" "}
      พรรค{`${props.party}`}
    </div>
  </div>
)

const SenatorInfo = props => (
  <div>
    <div css={cssName}>{`${props.title} ${props.name} ${props.lastname}`}</div>
  </div>
)

const memberDetailsCss = {
  fontSize: "1.8rem",
  fontFamily: "var(--ff-text)",
}

const CabinetInfo = props => (
  <div>
    <div css={cssName}>{`${props.title} ${props.name} ${props.lastname}`}</div>
    <div css={memberDetailsCss}>{props.cabinet_position}</div>
    {props.party ? <div css={memberDetailsCss}>พรรค{props.party}</div> : null}
  </div>
)

const PeopleCard = ({ type, ...props }) => {
  let peopleInfo
  if (type === "mp" || props.is_mp) {
    peopleInfo = MPInfo(props)
  } else if (type === "senator" || props.is_senator) {
    peopleInfo = SenatorInfo(props)
  } else if (type === "cabinet" || props.is_cabinet) {
    peopleInfo = CabinetInfo(props)
  }

  return (
    <Link
      to={`/people/${props.name}-${props.lastname}`}
      key={props.id}
      css={{
        display: "flex",
        flex: "0 1 455px",
        padding: "4rem",
        paddingRight: "2rem",
        border: "1px solid var(--cl-gray-2)",
        borderRadius: "1rem",
        background: "var(--cl-white)",
        marginBottom: "1rem",
        fontSize: "1.8rem",
        "&:nth-of-type(2n+1)": {
          marginRight: "1rem",
        },
        color: "inherit",
        "&:hover": {
          textDecoration: "none",
        },
      }}
      style={{ ...(props.style || {}) }}
    >
      <ProfilePicture {...props}></ProfilePicture>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {peopleInfo}
      </div>
    </Link>
  )
}

export default PeopleCard
