import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ExternalLink from "../components/externalLink"
import { ageFromBirthdate, politicianPicture } from "../utils"
import PeopleVote from "../components/peopleVote"
import PeopleStatus from "../components/peopleStatus"

import styles from "./people-template.module.css"

const LinkPoliticsAndBusiness = (name, lastname, party) => {
  return (
    <ExternalLink
      href={`https://elect.in.th/politics-and-business/#/p/${party}/person/${name} ${lastname}`}
    >
      ตรวจสอบประวัติทางธุรกิจ
    </ExternalLink>
  )
}

export const query = graphql`
  query($slug: String!, $name: String!, $lastname: String!, $party: String!) {
    peopleYaml(fields: { slug: { eq: $slug } }) {
      id
      title
      name
      lastname
      gender
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
      committee {
        set
        position
      }
      vote
      party
      asset
      debt
      quotes
      quotes_url
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
    allVotelogYaml {
      nodes {
        id
        title
        legal_title
        vote_date
      }
    }
  }
`

// const cssH1 = { fontSize: "4.8rem" }
const cssH2 = { fontSize: "2.4rem" }
const cssSection = { paddingBottom: "8rem" }
const cssSectionWhite = {
  ...cssSection,
  background: "var(--cl-white)",
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

const PeoplePage = ({
  data: { peopleYaml, peopleVoteYaml, partyYaml, allVotelogYaml },
}) => (
  <Layout
    pageStyles={{
      background: partyYaml !== null ? partyYaml.color : "var(--cl-gray-4)",
    }}
  >
    <SEO
      title={`${peopleYaml.title} ${peopleYaml.name} ${peopleYaml.lastname}`}
    />
    <section css={{ ...cssSection, paddingTop: "6rem" }}>
      <div className="container">
        <div className={`${styles.card}`}>
          <div
            css={{
              width: "50%",
              textAlign: "center",
              padding: "50px 0",
              background: "linear-gradient(to right, #FFFFFF, #EAEAEA)",
            }}
          >
            <div
              css={css`
                height: 160px;
                width: 160px;
                border-radius: 80px;
                margin: 0 auto;
                overflow: hidden;
                margin-bottom: 20px;
              `}
            >
              <img
                css={css`
                  max-height: 240px;
                `}
                alt=""
                src={politicianPicture(peopleYaml)}
              />
            </div>
            <h1
              css={{
                marginTop: 0,
                fontSize: "3.2rem",
              }}
            >{`${peopleYaml.title} ${peopleYaml.name} ${peopleYaml.lastname}`}</h1>
            <PeopleStatus isActive={peopleYaml.is_active} />
            <h3>ตำแหน่งปัจจุบัน:</h3>
            <ul>
              {peopleYaml.cabinet_position.map(position => (
                <li key={position}>{`${position}`}</li>
              ))}
            </ul>
            <h3>
              คณะรัฐมนตรี: {`${peopleYaml.is_cabinet ? "ใช่" : "ไม่ใช่"}`}
            </h3>
            <h3>ส.ว.: {`${peopleYaml.is_senator ? "ใช่" : "ไม่ใช่"}`}</h3>
            <h3>ส.ส.: {`${peopleYaml.is_mp ? "ใช่" : "ไม่ใช่"}`}</h3>
          </div>
          <div css={{ width: "50%" }}>
            <div css={{ padding: "10px" }}>
              <h2 css={{ ...cssH2, textAlign: "center" }}>ข้อมูลพื้นฐาน</h2>
              <hr className={`${styles.hr}`} />
              <div>
                <p>
                  {peopleYaml.party ? (
                    <Link to={`/party/${peopleYaml.party}`}>
                      พรรค {peopleYaml.party}
                    </Link>
                  ) : (
                    "ไม่สังกัดพรรค"
                  )}
                </p>
              </div>
              <div>
                {peopleYaml.mp_type === "แบ่งเขต" ? (
                  <p>
                    สมาชิกสภาผู้แทนราษฎร แบ่งเขต จังหวัด{" "}
                    {peopleYaml.mp_province} เขต {peopleYaml.mp_zone}
                  </p>
                ) : (
                  <p>
                    สมาชิกสภาผู้แทนราษฎร บัญชีรายชื่อ ลำดับที่
                    {peopleYaml.mp_zone}
                  </p>
                )}
              </div>
              <div>
                {peopleYaml.committee.map((com, i) => (
                  <span key={`${com.set}${i}`}>
                    {com.set} {com.position}
                  </span>
                ))}
              </div>

              <hr className={`${styles.hr}`} />
              <div>
                <span>เพศ {peopleYaml.gender}</span>
                {" / "}
                <span>อายุ {ageFromBirthdate(peopleYaml.birthdate)} ปี</span>
                {" / "}
                <span>การศึกษา {peopleYaml.education}</span>{" "}
                <span>
                  {peopleYaml.graduation}
                  {peopleYaml.degree ? ` (${peopleYaml.degree})` : null}
                </span>
                {" / "}
                <span>อาชีพเดิม {peopleYaml.ex_occupation}</span>
              </div>

              <hr className={`${styles.hr}`} />
              <div>
                <span>ทรัพย์สิน {peopleYaml.asset}</span>
                {" / "}
                <span>หนี้สิน {peopleYaml.deby}</span>
                {" / "}
                {peopleYaml.mp_type !== "" &&
                  LinkPoliticsAndBusiness(
                    peopleYaml.name,
                    peopleYaml.lastname,
                    peopleYaml.party
                  )}
              </div>

              <hr className={`${styles.hr}`} />
              <div>Official Link</div>
              <div>Facebook | Twitter | Website | Instagram</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {peopleYaml.quotes ? (
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
                fontSize: "4.8rem",
                fontFamily: "var(--ff-title)",
                marginRight: "1.6rem",
              }}
            >
              “
            </div>
            <blockquote>{peopleYaml.quotes}</blockquote>
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
              <div css={{ marginBottom: "0.5rem" }}>
                {`${peopleYaml.title} ${peopleYaml.name} ${peopleYaml.lastname}`}
              </div>
              <div>
                <ExternalLink
                  href={peopleYaml.quotes_url}
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
    <hr />
    <PeopleVote
      peopleVoteYaml={peopleVoteYaml}
      allVotelogYaml={allVotelogYaml}
    />
  </Layout>
)

export default PeoplePage
