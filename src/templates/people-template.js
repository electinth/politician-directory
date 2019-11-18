import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { formatNumber, ageFromBirthdate, politicianPicture } from "../utils"
import ExternalLink from "../components/externalLink"
import OfficialWebsite from "../components/profile/officialWebsite"
import PeopleVote from "../components/peopleVote"
import PeopleStatus from "../components/peopleStatus"

import styles from "./people-template.module.css"
import "../styles/profile-book.css"

export const query = graphql`
  query($slug: String!, $name: String!, $lastname: String!, $party: String!) {
    person: peopleYaml(fields: { slug: { eq: $slug } }) {
      id
      title
      name
      lastname
      gender
      bio
      birthdate
      education
      graduation
      degree
      ex_occupation
      cabinet_position
      is_cabinet
      is_senator
      is_mp
      is_active
      mp_type
      mp_province
      mp_zone
      mp_list
      vote
      senator_method
      committee {
        set
        position
      }
      party
      asset
      debt
      quotes
      quotes_url
      facebook
      twitter
    }
    peopleVoteYaml(name: { eq: $name }, lastname: { eq: $lastname }) {
      votelog {
        key
        value
      }
    }
    partyYaml(name: { eq: $party }) {
      color
    }
    allVotelogYaml(filter: { is_active: { eq: true } }) {
      nodes {
        id
        fields {
          slug
        }
        title
        description_th
        legal_title
        vote_date
      }
    }
  }
`

const cssH1 = {
  fontSize: "4rem",
}

const cssH2 = { fontSize: "2.4rem" }

const cssSection = {
  paddingTop: "3rem",
  paddingBottom: "8rem",
  h2: {
    fontSize: "4.8rem",
    textAlign: "center",
  },
}
const cssSectionBlack = {
  ...cssSection,
  color: "var(--cl-white)",
  background: "var(--cl-black)",
  h2: {
    ...cssSection.h2,
    color: "var(--cl-white)",
  },
  blockquote: {
    color: "var(--cl-white)",
    lineHeight: 1.8,
    border: "none",
    fontSize: "3.6rem",
    fontStyle: "normal",
    fontFamily: "var(--ff-title)",
  },
}

const cssEngTitle = {
  fontSize: "2.4rem",
  textAlign: "left",
  margin: "1.5rem 0 1.2rem 0",
}

const cssRightPage = {
  fontSize: "1.8rem",
  p: {
    marginBottom: "1rem",
  },
  a: {
    color: "var(--cl-black)",
    textDecoration: "underline",
  },
  ".official-website a": {
    textDecoration: "none",
  },
}

const MPParty = person => (
  <div>
    {person.is_mp ? (
      <p css={{ fontWeight: "bold" }}>
        {person.party ? (
          <Link to={`/party/${person.party}`}>พรรค {person.party}</Link>
        ) : (
          "ไม่สังกัดพรรค"
        )}
      </p>
    ) : null}
  </div>
)

const PersonAffiliation = person => (
  <div>
    {!person.is_cabinet ? null : (
      <p css={{ fontWeight: "bold" }}>คณะรัฐมนตรี</p>
    )}

    {!person.is_senator ? null : (
      <p css={{ fontWeight: "bold" }}>สมาชิกวุฒิสภา {person.senator_method}</p>
    )}

    {!person.is_mp ? null : person.mp_type === "แบ่งเขต" ? (
      <p css={{ fontWeight: "bold" }}>
        สมาชิกสภาผู้แทนราษฎร แบ่งเขต จังหวัด {person.mp_province}
        เขต {person.mp_zone} จากคะแนนโหวต {formatNumber(person.vote)} คะแนน
      </p>
    ) : (
      <p css={{ fontWeight: "bold" }}>
        สมาชิกสภาผู้แทนราษฎร บัญชีรายชื่อ ลำดับที่ {person.mp_list}
      </p>
    )}
  </div>
)

const PersonPosition = person => (
  <div css={{ fontSize: "1.4rem" }}>
    {person.cabinet_position.length > 0 ? (
      <p>
        {person.cabinet_position.map((pos, i) => (
          <span key={pos}>
            {i > 0 && ", "}
            {pos}{" "}
          </span>
        ))}
      </p>
    ) : null}

    {person.committee.length > 0 ? (
      <p>
        {person.committee
          .filter(pos => pos.set && pos.position)
          .map((pos, i) => (
            <span key={`${pos.set} ${pos.position}`}>
              {i > 0 && ", "}
              {pos.position} {pos.set}{" "}
            </span>
          ))}
      </p>
    ) : null}
  </div>
)

const PersonRecord = person => (
  <p>
    <span>
      <strong>เพศ</strong> {person.gender}
    </span>{" "}
    <span>
      <strong>อายุ</strong> {ageFromBirthdate(person.birthdate)} ปี
    </span>{" "}
    <span>
      <strong>การศึกษา</strong> {person.education}
    </span>{" "}
    <span>
      {person.graduation}
      {person.degree ? ` (${person.degree})` : null}
    </span>{" "}
    <span>
      <strong>อาชีพเดิม</strong> {person.ex_occupation}
    </span>
  </p>
)

const LinkPoliticsAndBusiness = (name, lastname, party) => {
  return (
    <ExternalLink
      href={`https://elect.in.th/politics-and-business/#/p/${party}/person/${name} ${lastname}`}
    >
      <strong>ตรวจสอบประวัติทางธุรกิจ</strong>
    </ExternalLink>
  )
}

const PersonFinance = person => (
  <p>
    {/**
    <span><strong>ทรัพย์สิน</strong> {person.asset}</span>
    {" "}
    <span><strong>หนี้สิน</strong> {person.deby}</span>
    {" "}
     */}
    {person.mp_type !== "" &&
      LinkPoliticsAndBusiness(person.name, person.lastname, person.party)}
  </p>
)

const PeoplePage = props => {
  const { person, peopleVoteYaml, partyYaml, allVotelogYaml } = props.data

  const pageBGColor = partyYaml !== null ? partyYaml.color : "var(--cl-gray-4)"
  const personFullName = `${person.title} ${person.name} ${person.lastname}`

  return (
    <Layout
      pageStyles={{
        background: pageBGColor,
      }}
    >
      <SEO title={personFullName} />

      <section className="section">
        <div className="book">
          <div className="page leftPage">
            <div css={{ textAlign: "center", marginTop: "5rem" }}>
              <div
                css={{
                  height: 160,
                  width: 160,
                  borderRadius: 80,
                  margin: "0 auto",
                  overflow: "hidden",
                  marginBottom: 20,
                }}
              >
                <img
                  css={{
                    maxHeight: 240,
                  }}
                  alt=""
                  src={politicianPicture(person)}
                />
              </div>
              <h1 css={{ ...cssH1, margin: "1rem 0 0 0" }}>{personFullName}</h1>
              <PeopleStatus isActive={person.is_active} />
            </div>
            <p css={{ marginTop: "3rem", marginBottom: "5rem" }}>
              {person.bio}
            </p>

            {/*
            <h2 style={{ ...cssEngTitle }}>25th House of Representative</h2>
            <h2 style={{ ...cssEngTitle }}>About</h2>
            <p css={{ ...cssPageP }}>{house.description}</p>
            <h2 css={{ ...cssEngTitle }}>Official Website</h2>
            <OfficialWebsite {...house}></OfficialWebsite>
            <h2 css={{ ...cssEngTitle }}>In Office</h2>
            <InOfficeDate {...house}></InOfficeDate>
            <h2 style={{ ...cssEngTitle }}>Key Members</h2>
            {keyMembers.map(x => {
              return (
                <div className="peopleCard" key={x.id}>
                  <PeopleCardMini key={x.id} {...x} />
                </div>
              )
            })}
             */}
          </div>
          <div className="page" css={cssRightPage}>
            <h2 css={{ ...cssH2, marginTop: "1rem", textAlign: "center" }}>
              ข้อมูลพื้นฐาน
            </h2>
            <hr className={`${styles.hr}`} />
            <MPParty {...person}></MPParty>
            <PersonAffiliation {...person}></PersonAffiliation>
            <PersonPosition {...person}></PersonPosition>

            <hr className={`${styles.hr}`} />

            <PersonRecord {...person}></PersonRecord>

            <hr className={`${styles.hr}`} />

            <PersonFinance {...person}></PersonFinance>

            <hr className={`${styles.hr}`} />

            <h2 css={{ ...cssEngTitle }}>Official Website</h2>
            <OfficialWebsite {...person}></OfficialWebsite>
          </div>
        </div>
      </section>

      {person.quotes ? (
        <section
          css={{
            ...cssSectionBlack,
            paddingTop: "6.4rem",
            paddingBottom: "5.2rem",
          }}
        >
          <div className="container">
            <div css={{ display: "flex", marginBottom: "3.6rem" }}>
              <div
                css={{
                  fontSize: "12rem",
                  fontFamily: "var(--ff-text)",
                  marginTop: "-3rem",
                  marginRight: "1.6rem",
                }}
              >
                “
              </div>
              <blockquote>{person.quotes}</blockquote>
            </div>
            <div
              css={{
                display: "flex",
                justifyContent: "flex-end",
                fontFamily: "var(--ff-title)",
                fontSize: "3.6rem",
              }}
            >
              <div css={{ marginRight: "4rem" }}>⎯⎯</div>
              <div>
                <div css={{ marginBottom: "0.5rem", lineHeight: 1 }}>
                  {personFullName}
                </div>
                <div>
                  <ExternalLink
                    href={person.quotes_url}
                    css={{
                      textDecoration: "underline",
                      fontSize: "2.4rem",
                      color: "white",
                    }}
                  >
                    อ้างอิง
                  </ExternalLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {person.is_mp ? (
        <PeopleVote
          peopleVoteYaml={peopleVoteYaml}
          allVotelogYaml={allVotelogYaml}
        />
      ) : null}

      {/*
      <section
        css={{
          ...cssSectionWhite,
        }}
      >
        <div className="container">
          <h2
            css={{
              fontSize: "4.8rem",
              textAlign: "center",
            }}
          >
            การปรากฏตัวบนข่าวล่าสุด
          </h2>
          <div></div>
        </div>
      </section>
      */}
    </Layout>
  )
}

export default PeoplePage
