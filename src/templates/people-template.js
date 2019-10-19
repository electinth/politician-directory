import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ageFromBirthdate } from "../utils"

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
    lineHeight: 1.5,
  },
}

const PeoplePage = ({ data: { peopleYaml } }) => (
  <Layout
    pageStyles={{
      background: "#eeeeee",
    }}
  >
    <SEO title="People" />
    <img css={css`
        max-height: 400px;
      `} src={`https://elect.thematter.co/data/politicians/${peopleYaml.name}-${peopleYaml.lastname}.jpg`} />
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
              <p>พรรค {peopleYaml.party || "ไม่มีข้อมูล"}</p>
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
                <span>{com}</span>
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
            — {`${peopleYaml.title} ${peopleYaml.name} ${peopleYaml.lastname}`}(
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
