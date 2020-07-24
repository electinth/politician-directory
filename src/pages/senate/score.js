// import React, { useState } from "react"
// import Layout from "../../components/layout"
// import faker from "faker"

// import ScoreViz from "../../components/viz/scoreViz"

// const cssHeader = {
//   width: "100vw",
//   height: "6rem",
//   background: "#000000",
//   padding: "0 4.8rem 0 2rem",
//   marginBottom: "5.6rem",
//   display: "flex",
//   alignItems: "center",
//   h1: {
//     fontSize: "3.2rem",
//     color: "#FFFFFF",
//     flex: 1,
//   },
//   button: {
//     border: "none",
//     cursor: "pointer",
//     fontSize: "1.8rem",
//     height: "100%",
//     width: "19.5rem",
//     background: "inherit",
//     color: "#EEF090",
//     borderBottom: `0.5rem solid #EEF090`,
//   },
// }

// const cssBody = {
//   padding: "5.6rem 4.3rem 3.3rem 4.3rem",
// }

// const cssSection = {
//   display: "flex",
// }

// const cssSectionLeft = {
//   display: "flex",
//   flex: 1,
//   flexDirection: "column",
//   h1: {
//     fontSize: "4.8rem",
//     fontWeight: "bold",
//     marginTop: 0,
//   },
//   selectcon: {
//     h3: {
//       fontSize: "1.8rem",
//       fontFamily: "Noto Sans Thai",
//     },
//     buttoncon: {
//       display: "flex",
//       marginTop: "1.4rem",
//       marginBottom: "2.4rem",
//     },
//   },
// }

// const cssSectionRight = {
//   width: "32.8rem",
//   borderLeft: "1px solid #000000",
//   paddingLeft: "4.4rem",
//   fontFamily: "Noto Sans Thai",
//   h1: {
//     fontSize: "1.8rem",
//     fontWeight: "bold",
//   },
//   criteria: {
//     fontSize: "1.4rem",
//   },
// }

// const cssViz = {
//   width: "100%",
//   marginTop: "4rem",
// }

// const cssFilterBtn = {
//   cursor: "pointer",
//   background: "#fff",
//   borderRadius: "5rem",
//   marginRight: "0.5rem",
//   width: "25rem",
//   height: "4rem",
//   display: "flex",
//   alignItems: "center",
//   paddingLeft: "1.6rem",
// }

// const cssCircle = {
//   width: "1rem",
//   height: "1rem",
//   marginRight: "1.2rem",
//   borderRadius: "50%",
// }

// const Motion = () => {
//   const [filter, setFilter] = useState(null)

//   const handleFilterClick = newFilter => {
//     if (filter === newFilter) {
//       setFilter(null)
//     } else {
//       setFilter(newFilter)
//     }
//   }

//   const type = ["position", "find", "job"]
//   const mockData = [...Array(250)]
//     .map((_, i) => {
//       return {
//         id: i,
//         name: faker.name.findName(),
//         score: Math.floor(Math.random() * 100),
//         type: type[Math.floor(Math.random() * 3)],
//       }
//     })
//     .sort((a, b) => {
//       return a.score - b.score
//     })

//   return (
//     <Layout pageStyles={{ background: "#fff" }}>
//       <header css={{ ...cssHeader }}>
//         <h1>ตรวจงาน สว.</h1>
//         <button>คะแนนจิตพิสัย สว.</button>
//         <button
//           style={{ color: "#FFFFFF", borderColor: `rgba(255, 255, 255, 0.3)` }}
//         >
//           ผลการลงมติ
//         </button>
//       </header>
//       <body css={{ ...cssBody }}>
//         <section css={{ ...cssSection }}>
//           <div css={{ ...cssSectionLeft }}>
//             <h1>คะแนนจิตพิสัย ส.ว.</h1>
//             <selectcon>
//               <b>เลือกดูตามประเภทส.ว.</b>
//               <buttoncon>
//                 <div
//                   css={{
//                     ...cssFilterBtn,
//                     border:
//                       filter === "position"
//                         ? "0.2rem solid rgba(0, 0, 0, 1)"
//                         : "0.2rem solid rgba(0, 0, 0, 0.3)",
//                   }}
//                   onClick={() => handleFilterClick("position")}
//                 >
//                   <div css={{ ...cssCircle, background: "#999C00" }} />
//                   โดยตำแหน่ง <span style={{ color: "#999C00" }}> (6 คน)</span>
//                 </div>
//                 <div
//                   css={{
//                     ...cssFilterBtn,
//                     border:
//                       filter === "find"
//                         ? "0.2rem solid rgba(0, 0, 0, 1)"
//                         : "0.2rem solid rgba(0, 0, 0, 0.3)",
//                   }}
//                   onClick={() => handleFilterClick("find")}
//                 >
//                   <div css={{ ...cssCircle, background: "#5739AC" }} />
//                   คสช. สรรหา <span style={{ color: "#5739AC" }}> (50 คน)</span>
//                 </div>
//                 <div
//                   css={{
//                     ...cssFilterBtn,
//                     border:
//                       filter === "job"
//                         ? "0.2rem solid rgba(0, 0, 0, 1)"
//                         : "0.2rem solid rgba(0, 0, 0, 0.3)",
//                   }}
//                   onClick={() => handleFilterClick("job")}
//                 >
//                   <div css={{ ...cssCircle, background: "#FEACAC" }} />
//                   ตามกลุ่มอาชีพ
//                   <span style={{ color: "#FEACAC" }}> (194 คน)</span>
//                 </div>
//               </buttoncon>
//               การเข้าประชุมและการลงมติในที่ประชุมถือเป็นหน้าที่หลักของ ส.ว.
//               รัฐธรรมนูญกำหนดเงื่อนไขการพ้นตำแหน่ง ของ ส.ว.
//               ที่ไม่เข้าร่วมประชุมสภาไว้ว่าภายในหนึ่งสมัย ต้องเข้าประชุม 75 %
//               ยกเว้นประธานวุฒิสภาอนุญาตให้ขาด ครบวาระ 1 ปีไปแล้ว
//               มาลองสำรวจดูกันว่า ส.ว. ในสภาของเรา ใครมา-ขาดการลงมติมากน้อยแค่ไหน
//             </selectcon>
//           </div>
//           <div css={{ ...cssSectionRight }}>
//             <h1>เกณฑ์การให้คะแนน</h1>
//             <criteria>
//               เข้าลงมติ = 1 คะแนน/ครั้ง
//               <br />
//               ขาดลงมติ = 0 คะแนน/ครั้ง
//               <br /> <b>เกรด A</b> = เข้า 80%ขึ้นไป
//               <br /> <b>เกรด B</b> = เข้า 70-79%
//               <br /> <b>เกรด C</b> = เข้า 60-69%
//               <br /> <b>เกรด D</b> = เข้า 50-59%
//               <br /> <b>เกรด F</b> = เข้าไม่ถึง 50%
//             </criteria>
//           </div>
//         </section>
//         <div css={{ ...cssViz }}>
//           <ScoreViz data={mockData} filter={filter} />
//         </div>
//       </body>
//     </Layout>
//   )
// }

// export default Motion
