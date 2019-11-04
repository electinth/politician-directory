import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PeopleVote from "../components/peopleVote"
import { ageFromBirthdate, politicianPicture } from "../utils"
import _ from "lodash"

import styles from "./people-template.module.css"

export const query = graphql`
  query($slug: String!, $title: String!, $name: String!, $lastname: String!) {
    peopleYaml(fields: { slug: { eq: $slug } }) {
      id
      title
      name
      lastname
      gender
      birthdate
      education
      graduation
      occupation
      cabinet_position
      prev_polit_pos
      is_cabinet
      is_senator
      is_mp
      mp_type
      mp_province
      mp_zone
      committee
      vote
      party
      asset
      debt
      quotes
      quotes_url
    }
    peopleVoteYaml(
      title: { eq: $title }
      name: { eq: $name }
      lastname: { eq: $lastname }
    ) {
      votelog {
        _1
        _2
        _3
        _4
        _5
        _6
      }
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
    lineHeight: 1.5,
  },
}

class PeoplePage extends React.Component {
  state = {
    peopleYaml: this.props.peopleYaml,
    allVote: this.props.allVote,
    activeFilter: 0,
    filterChoiceState: [
      { name: "ทั้งหมด", choice: 0 },
      { name: "เห็นด้วย", choice: 1 },
      { name: "ไม่เห็นด้วย", choice: 2 },
      { name: "งดออกเสียง", choice: 3 },
      { name: "ไม่เข้าประชุม", choice: 4 },
    ],
  }

  handleFilter = choice => {
    let allVote = this.props.allVote
    if (choice === 0) {
      this.setState({ allVote, activeFilter: choice })
    } else {
      allVote = _.filter(allVote, function(o) {
        return o["choice"] === String(choice)
      })
      this.setState({ allVote, activeFilter: choice })
    }
  }

  render() {
    const { peopleYaml, allVote, activeFilter, filterChoiceState } = this.state
    return (
      <Layout
        pageStyles={{
          background: "#eeeeee",
        }}
      >
        <SEO title="People" />
        <img
          css={css`
            max-height: 400px;
          `}
          alt=""
          src={politicianPicture(peopleYaml)}
        />
        <section css={{ ...cssSection, paddingTop: "6rem" }}>
          <div className="container">
            <div className={`${styles.card}`}>
              <div css={{ width: "50%" }}>
                <h1
                  css={{
                    marginTop: 0,
                    fontSize: "3.2rem",
                  }}
                >{`${peopleYaml.title} ${peopleYaml.name} ${peopleYaml.lastname}`}</h1>
                <h3>ตำแหน่งปัจจุบัน:</h3>
                <ul>
                  {peopleYaml.cabinet_position.map(position => (
                    <li key={position}>{`${position}`}</li>
                  ))}
                </ul>
                <h3>ตำแหน่งที่ผ่านมา:</h3>
                <ul>
                  {peopleYaml.prev_polit_pos.map(position => (
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
                <h2 css={{ ...cssH2 }}>ข้อมูลพื้นฐาน</h2>

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
                  {peopleYaml.committee.map(com => (
                    <span key={com}>{com}</span>
                  ))}
                </div>

                <hr className={`${styles.hr}`} />
                <div>
                  <span>เพศ {peopleYaml.gender}</span>
                  {" / "}
                  <span>อายุ {ageFromBirthdate(peopleYaml.birthdate)} ปี</span>
                  {" / "}
                  <span>การศึกษา {peopleYaml.education}</span>
                  <ul>
                    {peopleYaml.graduation.map(grad => (
                      <li key={grad}>{grad}</li>
                    ))}
                  </ul>
                  <span>อาชีพเดิม {peopleYaml.occupation}</span>
                </div>

                <hr className={`${styles.hr}`} />
                <div>
                  <span>ทรัพย์สิน {peopleYaml.asset}</span>
                  {" / "}
                  <span>หนี้สิน {peopleYaml.deby}</span>
                  {" / "}
                  <a
                    href="https://elect.in.th/politics-and-business"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ตรวจสอบประวัติทางธุรกิจ
                  </a>
                </div>

                <hr className={`${styles.hr}`} />
                <div>Official Link</div>
                <div>Facebook | Twitter | Website | Instagram</div>
              </div>
            </div>
          </div>
        </section>

        {peopleYaml.quotes ? (
          <section
            css={{
              ...cssSectionBlack,
            }}
          >
            <div className="container">
              <span css={{ color: "#fcbbdd", fontSize: "3.6rem" }}>"</span>
              <blockquote css={{ fontSize: "3.6rem" }}>
                {peopleYaml.quotes}
              </blockquote>
              <div className="quotes-reference">
                —{" "}
                {`${peopleYaml.title} ${peopleYaml.name} ${peopleYaml.lastname}`}
                (
                <a
                  href={peopleYaml.quotes_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  อ้างอิง
                </a>
                )
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
          allVote={allVote}
          handleFilter={this.handleFilter}
          filterChoiceState={filterChoiceState}
          activeFilter={activeFilter}
        />
      </Layout>
    )
  }
}

export default ({ data }) => {
  const peopleYaml = data.peopleYaml
  const voteLog = data.peopleVoteYaml.votelog
  const allVote = data.allVotelogYaml.nodes
  // merge allVote and voteLog into allVote
  for (const [k, v] of Object.entries(voteLog)) {
    allVote.forEach(log => {
      if (`_${log.id}` === String(k)) {
        log["choice"] = v
      }
    })
  }
  console.log(allVote)

  return <PeoplePage peopleYaml={peopleYaml} allVote={allVote} />
}
