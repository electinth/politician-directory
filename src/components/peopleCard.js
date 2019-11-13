import React from "react"
import { Link } from "gatsby"

import { politicianPicture } from "../utils"

const MPInfo = props => (
  <div>
    <div
      css={{
        fontFamily: "var(--ff-title)",
        fontSize: "2.4rem",
        a: { color: "inherit" },
      }}
    >
      <Link to={`/people/${props.name}-${props.lastname}`}>
        {`${props.title} ${props.name} ${props.lastname}`}
      </Link>
    </div>
    <div>
      {props.mp_type === "บัญชีรายชื่อ"
        ? `ส.ส. ${props.mp_type} ลำดับที่ ${props.mp_list}`
        : `ส.ส. ${props.mp_type} จังหวัด${props.mp_province} เขต ${props.mp_zone}`}
    </div>
    <div>พรรค{`${props.party}`}</div>
  </div>
)

const SenatorInfo = props => (
  <div>
    <div
      css={{
        fontFamily: "var(--ff-title)",
        fontSize: "2.4rem",
        a: { color: "inherit" },
      }}
    >
      <Link to={`/people/${props.name}-${props.lastname}`}>
        {`${props.title} ${props.name} ${props.lastname}`}
      </Link>
    </div>
  </div>
)

const CabinetInfo = props => (
  <div>
    <div
      css={{
        fontFamily: "var(--ff-title)",
        fontSize: "2.4rem",
        a: { color: "inherit" },
      }}
    >
      <Link to={`/people/${props.name}-${props.lastname}`}>
        {`${props.title} ${props.name} ${props.lastname}`}
      </Link>
    </div>
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
  console.log(props)

  return (
    <div
      key={props.id}
      css={{
        display: "block",
        flex: "1 1 360px",
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
      }}
    >
      <div>
        <Link to={`/people/${props.name}-${props.lastname}`}>
          <div
            css={{
              borderRadius: 84,
              width: 84,
              height: 84,
              float: "left",
              marginBottom: 0,
              marginRight: "2rem",
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
      <div>{peopleInfo}</div>
    </div>
  )
}

export default PeopleCard
