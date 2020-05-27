import React from "react"

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
                  {member.name} {member.lastname} {member.party}
                </li>
              ))}
            </ul>
          </div>
          <div className="party-proportion"></div>
        </div>
      </section>
    </div>
  )
}

export default MotionResult
