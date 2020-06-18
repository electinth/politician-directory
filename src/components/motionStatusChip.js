import React from "react"

const MotionStatusChip = ({ status, style }) => {
  const displayTexts = {
    "1. รอบรรจุวาระ": "รอบรรจุวาระ",
    "2. สภาผู้แทนพิจารณา": "สภาผู้แทนพิจารณา",
    "3. ตั้ง กมธ. วิสามัญ": "ตั้ง กมธ. วิสามัญ",
    "4. ไม่ตั้ง กมธ. วิสามัญ": "ไม่ตั้ง กมธ. วิสามัญ",
    "5. ส่งครม.": "ส่งครม.",
  }

  const statusColors = {
    "1. รอบรรจุวาระ": "#E0A4C7",
    "2. สภาผู้แทนพิจารณา": "#A8DA9C",
    "3. ตั้ง กมธ. วิสามัญ": "#AFB0F5",
    "4. ไม่ตั้ง กมธ. วิสามัญ": "#E3A7A8",
    "5. ส่งครม.": "#94C3BF",
  }

  return (
    <div
      style={style}
      css={{
        border: "var(--cl-gray-4) 1px solid",
        borderRadius: "100px",
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        fontSize: "1.4rem",
        color: "var(--cl-gray-1)",
      }}
    >
      <div
        style={{
          height: "12px",
          width: "12px",
          marginRight: "10px",
          borderRadius: "50%",
          backgroundColor: statusColors[status],
          flexShrink: "0",
        }}
      ></div>
      {displayTexts[status]}
    </div>
  )
}

export default MotionStatusChip
