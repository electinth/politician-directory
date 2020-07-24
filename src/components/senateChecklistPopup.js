import React from "react"

const cssContainer = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  zIndex: "100"
}
const cssPopup = {
  width: "900px",
  display: "flex",
  background: "#EEF090",
  boxShadow: "8px 8px 0px #000000",
  border: "2px solid #000000",
  borderRadius: "10px"
}
const cssColumn = {
  width: "50%",
  height: "100%",
  padding: "3rem 5.2rem 4.3rem 4rem",
  wordBreak: "break-word"
}
const cssTitle = {
  fontFamily: "var(--ff-title)",
  fontSize: "4.8rem",
  fontWeight: "800",
  marginBottom: "3.5rem"
}
const cssHighlight = {
  fontFamily: "var(--ff-title)",
  fontSize: "3.2rem",
  textAlign: "center",
  paddingBottom: "2.3rem",
  borderBottom: "4px solid black"
}
const cssDetail = {
  fontSize: "1.8rem",
  lineHeight: "1.4"
}
const cssAnnotation = {
  fontSize: "1.2rem"
}
const cssListItem = {
  marginTop: "1.8rem",
  listStylePosition: "inside"
}
const cssLine = {
  borderBottom: "1px solid black",
  paddingBottom: "1.5rem"
}

const senateChecklistPopup = () => {
  return (
    <div css={cssContainer}>
      <div css={cssPopup}>
        <div css={cssColumn}
          style={{
            background: "linear-gradient(90deg, #FFFFFF 2.54%, rgba(255, 255, 255, 0) 100%), #F6F6F6",
            mixBlendMode: "multiply",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div css={cssTitle}>
              ตรวจงาน ส.ว.
            </div>
            <div css={cssDetail}>
              24 พ.ค. 2562 สมาชิกวุฒิสภา (ส.ว.) แต่งตั้งทั้ง 250 คน 
              เข้าสู่ตำแหน่งผ่านกระบวนการคัดเลือกจาก คสช. มีวาระการทำงาน 5 ปี
              ตามที่รัฐธรรมนูญ 2560 กำหนดเอกสาร บันทึกการลงมติรายบุคคลของ ส.ว. 
              ไม่ได้เผยแพร่ให้บุคคลทั่วไปค้นหาได้ในเว็ปไซต์ เพราะไม่ได้มีข้อบังคับ ส.ว. 
              กำหนดไว้ แต่ iLaw ได้ใช้สิทธิผ่าน พ.ร.บ.ข้อมูลข่าวสารของราชการ 
              พ.ศ.2540 เพื่อขอข้อมูลจากสำนักเลขาธิการวุฒิสภา 
              และได้บันทึกการลงมติรายบุคคลตั้งแต่การประชุมครั้งที่ 9 (5 ส.ค. 2562) 
              จนถึงครั้งที่ 22 (24 ก.พ. 2563) รวมการประชุม 34 ครั้ง 145 มติมา
            </div>
          </div>
          <div css={cssAnnotation}>
            หมายเหตุ : บันทึกการลงมติรายบุคคลของ ส.ว. 
            ในการประชุมครั้งที่ 1-8 ซึ่งมีการลงมติทั้งหมด 7 มติ 
            เป็นการประชุมในสถานที่ชั่วคราว หอประชุมใหญ่บริษัททีโอที 
            จำกัด(มหาชน) โดยใช้ระบบการลงคะแนนด้วยการ 
            เขียนลงกระดาษทั้งหมด ไม่ถูกนำมานับรวมกับ 145 มติ
            ในรายงานนี้ อ่านเพิ่มเติม
            <a href="https://ilaw.or.th/node/5663" target="_blank"
            style={{ marginLeft: "5px" }}>
              https://ilaw.or.th/node/5663
            </a>
          </div>
        </div>
        <div css={cssColumn}>
          <div css={cssHighlight}>
            Highlight
          </div>
          <ul style={{ marginLeft: "0" }}>
            <li css={[cssListItem, cssLine]}>ส.ว. โหวตให้ความเห็นชอบทั้งหมด 145 มติ ค่าเฉลี่ยการลงมติเห็นชอบ 96.1%</li>
            <li css={[cssListItem, cssLine]}>ส่วนใหญ่เป็นเรื่องการพิจารณาแก้ไข ร่างข้อบังคับการประชุมวุฒิสภา</li>
            <li css={[cssListItem, cssLine]}>ในการประชุมวุฒิสภาตลอด 1 ปี พบว่า ส.ว. พิจารณาผ่านร่างกฎหมายที่มาจาก สภาผู้แทนราษฎร ทั้งหมด 5 ฉบับ</li>
            <li css={[cssListItem, cssLine]}>ส.ว.โควตาผู้นำเหล่าทัพ แทบไม่มาลงมติจนติดอันดับต้นๆ</li>
            <li css={cssListItem}>มีเพียงมติเดียวที่ ส.ว. ผู้นำเหล่าทัพเข้ามาโหวตผ่านโดยพร้อมเพรียง คือ พ.ร.ก.โอนอัตรากำลังพลและงบประมาณของ กองทัพบกไปเป็นของส่วนราชการในพระองค์</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default senateChecklistPopup