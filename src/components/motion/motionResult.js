import React from "react"
import Profile from "./profile"
import styled from "@emotion/styled"
import _ from "lodash"

const motionresult = ({ className, members }) => {
  const by_party = _.groupBy(members, "party")

  console.log(by_party)
  window._ = _
  return (
    <div className={className}>
      <h3>ผลการลงมติ</h3>
      <section>
        <h3>แต่งตั้งคณะกรรมาธิการ</h3>
      </section>
      <section>
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
                      <span>
                        {p} {m.length}
                      </span>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
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
