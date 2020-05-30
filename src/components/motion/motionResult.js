import React from "react"
import { Link } from "gatsby"
import Profile from "./profile"
import styled from "@emotion/styled"

const motionresult = ({ className, members }) => {
  return (
    <div className={className}>
      <h3>ผลการลงมติ</h3>
      <section>
        <h3>แต่งตั้งคณะกรรมาธิการ</h3>
      </section>
      <section>
        <h3>ข้อมูลแต่งตั้งคณะกรรมาธิการ</h3>
        <div>
          <h4></h4>
          <div className="member-list">
            <ul>
              {members.map(member => (
                <li key={member.name + member.lastname}>
                  <Link to={member.fields.slug}>
                    <Profile
                      name={member.name}
                      last_name={member.lastname}
                      party={member.party}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="party-proportion">{members.length}</div>
        </div>
      </section>
    </div>
  )
}
const MotionResult = styled(motionresult)`
  & ul {
    list-style: none;
  }
`

export default MotionResult
