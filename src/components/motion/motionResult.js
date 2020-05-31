import React from "react"
import Profile from "./profile"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import _ from "lodash"

const Waffle = ({ party, partyMember }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-flow: row wrap;
      `}
    >
      {partyMember.map(member => (
        <div
          css={css`
            width: 10%;
            padding-top: 10%;
            background-color: var(--cl-gray-2);
            margin: 1.5px;
          `}
        ></div>
      ))}
    </div>
  )
}

const Card = styled.div`
  background-color: rgb(250, 250, 250);
  border: 1px solid var(--cl-gray-4);
`

const ResultStatus = styled.h3`
  border-left: 6px solid var(--cl-black);
  font-size: 26px;
  padding: 20px 15px;
`
const motionresult = ({ className, members }) => {
  const by_party = _.groupBy(members, "party")

  return (
    <>
      <h3>ผลการลงมติ</h3>
      <Card className={className}>
        <ResultStatus>แต่งตั้งคณะกรรมาธิการ</ResultStatus>
        <section
          css={css`
            padding: 20px 30px;
          `}
        >
          <h3>ข้อมูลแต่งตั้งคณะกรรมาธิการ</h3>
          <div>
            <h4>
              คณะกรรมาธิการวิสามัญพิจารณาศึกษาแนวทางการบริหารจัดการลุ่มน้ำทั้งระบบ
            </h4>
            <div className="committee">
              <div className="committee-member">
                <h4>สมาชิก ({members.length})</h4>
                <ul>
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
                        <Waffle party={p} partyMember={m} />
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
