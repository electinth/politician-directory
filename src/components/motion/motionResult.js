import React from "react"
import Profile from "./profile"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import _ from "lodash"
import { split_array } from "../waffle"

const Waffle = ({ partyMember }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-flow: row wrap;
      `}
    >
      {split_array(partyMember, 10, (tenth, ti) => (
        <div
          key={ti}
          className="tenth"
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin-right: 1px;
          `}
        >
          {split_array(tenth, 5, (fifth, fi) => (
            <div
              key={fi}
              className="fifth"
              css={css`
                display: flex;
                flex-flow: row nowrap;
                margin-right: 1px;
              `}
            >
              {fifth.map((_, i) => (
                <div
                  key={i}
                  css={css`
                    width: 8px;
                    height: 8px;
                    background-color: var(--cl-gray-3);
                    margin-right: 1px;
                    margin-bottom: 1px;
                  `}
                ></div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const VoteWaffle = ({ members, color }) => (
  <div
    css={css`
      display: flex;
      flex-flow: row wrap;
    `}
  >
    {split_array(members, 100, (hundred, hi) => (
      <div
        key={hi}
        css={css`
          display: flex;
          flex-flow: row wrap;
          margin-right: 2px;
          width: 92px;
          align-items: flex-start;
        `}
      >
        {split_array(hundred, 25, (quarter, qi) => (
          <div
            key={qi}
            css={css`
              display: flex;
              flex-flow: row wrap;
              width: 45px;
              margin-right: 1px;
              margin-bottom: 1px;
            `}
          >
            {quarter.map((_, i) => (
              <div
                key={i}
                css={css`
                  width: 8px;
                  height: 8px;
                  background-color: ${color};
                  margin-right: 1px;
                  margin-bottom: 1px;
                `}
              ></div>
            ))}
          </div>
        ))}
      </div>
    ))}
  </div>
)

const Card = styled.div`
  background-color: rgb(250, 250, 250);
  border: 1px solid var(--cl-gray-4);
`

const ResultStatus = styled.h3`
  border-left: 6px solid var(--cl-black);
  font-size: 26px;
  padding: 20px 15px;
`

const VOTELOG_MAP = [
  {
    en: "approve",
    th: "เห็นด้วย",
    color: "var(--cl-vote-yes)",
  },
  {
    en: "disprove",
    th: "ไม่เห็นด้วย",
    color: "var(--cl-vote-no)",
  },
  {
    en: "abstained",
    th: "ไม่ออกเสียง",
    color: "var(--cl-vote-abstained)",
  },
  {
    en: "absent",
    th: "ไม่ลงคะแนน",
    color: "var(--cl-vote-absent)",
  },
]

const motionresult = ({ className, votelog, members }) => {
  const by_party = _.groupBy(members, "party")

  return (
    <>
      <h3
        css={css`
          font-size: 20px;
          margin: 15px 0;
        `}
      >
        ผลการลงมติ
      </h3>
      <Card className={className}>
        <ResultStatus>แต่งตั้งคณะกรรมาธิการ</ResultStatus>
        <section
          css={css`
            padding: 20px 30px;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-evenly;
          `}
        >
          {VOTELOG_MAP.map(({ en, th, color }) => {
            return (
              <div key={en}>
                <h5
                  css={css`
                    font-size: 14px;
                    margin: 10px 0;
                  `}
                >
                  {th}{" "}
                  <span
                    css={css`
                      color: var(--cl-gray-1);
                    `}
                  >
                    {votelog[en]}
                  </span>
                </h5>
                <VoteWaffle
                  members={[...Array(votelog[en]).keys()]}
                  color={color}
                />
              </div>
            )
          })}
        </section>
        <section
          css={css`
            padding: 20px 30px;
          `}
        >
          <h3
            css={css`
              font-size: 18px;
            `}
          >
            ข้อมูลแต่งตั้งคณะกรรมาธิการ
          </h3>
          <div
            css={css`
              background-color: white;
              padding: 25px 15px;
            `}
          >
            <h4
              css={css`
                font-size: 16px;
                margin-bottom: 25px;
              `}
            >
              คณะกรรมาธิการวิสามัญพิจารณาศึกษาแนวทางการบริหารจัดการลุ่มน้ำทั้งระบบ
            </h4>
            <div className="committee">
              <div className="committee-member">
                <h4>สมาชิก ({members.length})</h4>
                <ul
                  css={css`
                    margin: 30px 0;
                  `}
                >
                  {members.map(member => (
                    <Profile
                      key={member.name + member.lastname}
                      name={member.name}
                      last_name={member.lastname}
                      party={member.party}
                      slug={member.fields.slug}
                      oneline
                    />
                  ))}
                </ul>
              </div>
              <div className="committee-party">
                <h4>สัดส่วน</h4>
                {Object.entries(by_party)
                  .sort((a, b) => b[1].length - a[1].length)
                  .map(([p, m]) => {
                    if (p === "") return
                    return (
                      <div key={p}>
                        <h5
                          css={css`
                            margin-top: 8px;
                            margin-bottom: 2px;
                            font-size: 12px;
                          `}
                        >
                          {p} ({m.length})
                        </h5>
                        <Waffle partyMember={m} />
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </section>
      </Card>
    </>
  )
}
const MotionResult = styled(motionresult)`
  & .committee {
    display: flex;

    &-member {
      flex: 1;
    }

    &-party {
      width: 30%;
    }

    & h4 {
      font-size: 15px;
    }
    & ul {
      list-style: none;
    }
  }
`

export default MotionResult
