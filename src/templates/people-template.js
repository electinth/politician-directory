import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ExternalLink from "../components/externalLink"
import { ageFromBirthdate, politicianPicture } from "../utils"

import styles from "./people-template.module.css"

export const query = graphql`
  query($slug: String!) {
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

const PeoplePage = ({ data: { peopleYaml } }) => (
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
                  สมาชิกสภาผู้แทนราษฎร แบ่งเขต จังหวัด {peopleYaml.mp_province}{" "}
                  เขต {peopleYaml.mp_zone}
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
              <ExternalLink href="https://elect.in.th/politics-and-business">
                ตรวจสอบประวัติทางธุรกิจ
              </ExternalLink>
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
          paddingTop: "6.4rem",
          paddingBottom: "5.2rem",
        }}
      >
        <div
          className="container"
          css={{ display: "flex", flexDirection: "column" }}
        >
          <div css={{ display: "flex", marginBottom: "3.6rem" }}>
            <div
              css={{
                fontSize: "4.8rem",
                fontFamily: "var(--ff-title)",
                marginRight: "1.6rem",
              }}
            >
              "
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
            <div css={{ marginRight: "2rem" }}>—</div>
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
          สรุปการลงมติในสภา
        </h2>
        <div css={{ textAlign: "center" }}>
          ทั้งหมด เห็นด้วย ไม่เห็นด้วย งดออกเสียง ไม่เข้าประชุม
        </div>
      </div>
    </section>
  </Layout>
)

export default PeoplePage
