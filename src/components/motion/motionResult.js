import React from "react"
import { Link } from "gatsby"

const MotionResult = ({ members }) => {
  return (
    <div>
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
                    {member.name} {member.lastname} {member.party}
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

export default MotionResult
