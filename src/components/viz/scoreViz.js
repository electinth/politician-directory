import React, { useRef, useEffect, useState } from "react"
import * as d3 from "d3"
import { relative } from "path"

const cssLollipopCon = {
  height: "43.6rem",
  background: "rgba(238,240,144, 0.1)",
  marginTop: "2.6rem",
  overflowX: "scroll",
  overflowY: "hidden",
  position: "relative",
}

const cssLabel = {
  width: "7.6rem",
  height: "2.4rem",
  borderRadius: "0.3rem",
  position: "relative",
  background: "#EEF090",
  textAlign: "center",
  fontSize: "1.4rem",
  marginBottom: "0.8rem",
  zIndex: 9,
  left: 0,
}

const cssLabelCon = {
  height: "39.4rem",
  width: "24rem",
  position: "sticky",
  marginTop: "-34rem",
  left: 0,
  zIndex: 9,
}

const cssScoreText = {
  fontSize: "1.2rem",
}

const cssTooltipStyle = {
  position: "absolute",
  width: "20.6rem",
  height: "10.8rem",
  background: "#fff",
  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "0.4rem",
  padding: "1.2rem",
  p: {
    fontSize: "1.2rem",
    marginBottom: "0.4rem",
  },
  a: {
    textDecoration: "underline",
    fontSize: "1rem",
    color: "#999C00",
  },
}

const type = ["position", "find", "job"]
const typeColor = d3
  .scaleOrdinal()
  .domain(type)
  .range(["#999C00", "#5739AC", "#FEACAC"])

function prepareData(data) {
  const meanScore =
    data.map(d => d.score).reduce((acc, cur) => acc + cur, 0) / data.length
  const criteriaScore = [50, 60, 70, 80, 100]

  const posScore = criteriaScore.map(score => {
    return data.findIndex(d => d.score === score)
  })
  return {
    criteriaScore,
    meanScore,
    posScore,
  }
}

function createChart(
  data,
  timelineRef,
  lollipopRef,
  setTooltip,
  setTooltipStyle
) {
  const { criteriaScore, meanScore, posScore } = prepareData(data)

  const miniHeight = 88
  const miniWidth = timelineRef.current.clientWidth

  const mainHeight = 394
  const mainMargin = {
    left: 20,
    right: 20,
    bottom: 16,
    top: 34,
  }

  const maxWidth = 12000

  function brushmove() {
    const extentX = d3.event.selection
    const newXcor = -extentX[0] * 9.142
    d3.select(lollipopRef.current).style(
      "transform",
      `translate(${newXcor}px,0px)`
    )
  }

  function scroll() {
    const gBrush = d3.select(".brush")
    let selection = d3.brushSelection(gBrush.node())
    let size = selection[1] - selection[0],
      range = xTimeline.range(),
      x0 = d3.min(range),
      x1 = d3.max(range) + xTimeline.bandwidth(),
      dx = -d3.event.deltaX,
      topSection

    if (selection[0] - dx < x0) {
      topSection = x0
    } else if (selection[1] - dx > x1) {
      topSection = x1 - size
    } else {
      topSection = selection[0] - dx
    }

    gBrush.call(brush.move, [topSection, topSection + size])
  }

  const brush = d3
    .brushX()
    .extent([[0, 0], [miniWidth, miniHeight]])
    .on("brush", brushmove)

  const timelineSvg = d3
    .select(timelineRef.current)
    .append("svg")
    .attr("width", miniWidth)
    .attr("height", miniHeight)
    .style("pointer-events", "none")

  const xTimeline = d3
    .scaleBand()
    .domain(
      data.map(function(d) {
        return d.id
      })
    )
    .range([0, miniWidth])
    .padding(0.2)

  timelineSvg.append("g").attr("class", "brush")
  // .call(brush)
  // .call(brush.move, [0, 142])

  const yTimeline = d3
    .scaleLinear()
    .domain([0, 100])
    .range([miniHeight, 0])

  const miniBar = timelineSvg
    .selectAll("timelineBar")
    .data(data)
    .enter()
  miniBar
    .append("rect")
    .attr("class", "miniBar")
    .attr("x", function(d) {
      return xTimeline(d.id)
    })
    .attr("y", function(d) {
      return yTimeline(d.score)
    })
    .attr("width", xTimeline.bandwidth())
    .attr("height", function(d) {
      return miniHeight - yTimeline(d.score)
    })
    .attr("fill", function(d) {
      return typeColor(d.type)
    })

  d3.selectAll(".handle").style("pointer-events", "none")
  d3.select(".overlay").style("pointer-events", "none")

  posScore.forEach(pos => {
    if (pos === -1) return
    timelineSvg
      .append("line")
      .attr("x1", xTimeline(data[pos].id))
      .attr("x2", xTimeline(data[pos].id))
      .attr("y1", 0)
      .attr("y2", 88)
      .attr("stroke", "#AEAEAE")
      .attr("stroke-dasharray", "4")
  })

  const lolliSvg = d3
    .select(lollipopRef.current)
    .append("svg")
    .attr("height", mainHeight + mainMargin.top)
    .attr("width", maxWidth)
    .attr("overflow-x", "scroll")
  // .on("wheel.zoom", scroll)

  const xLolli = d3
    .scaleBand()
    .domain(data.map(d => d.id))
    .range([0, maxWidth])
    .paddingInner(0.9)
    .paddingOuter(0.5)

  lolliSvg
    .append("g")
    .attr("transform", `translate(0,378)`)
    .call(
      d3
        .axisBottom(xLolli)
        .tickSizeOuter(0)
        .tickSizeInner(0)
        .tickFormat(function(_, i) {
          return i + 1
        })
    )

  const yLolli = d3
    .scaleLinear()
    .domain([0, 100])
    .range([mainHeight, mainMargin.top + 40])

  lolliSvg
    .selectAll("group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "group")
    .append("rect")
    .attr("class", "lolliBar")
    .attr("x", function(d) {
      return xLolli(d.id)
    })
    .attr("y", function(d) {
      return yLolli(d.score) - mainMargin.bottom
    })
    .attr("width", xLolli.bandwidth())
    .attr("height", function(d) {
      return mainHeight - yLolli(d.score)
    })
    .attr("fill", function(d) {
      return typeColor(d.type)
    })

  d3.selectAll(".group")
    .append("circle")
    .attr("class", "cirecleAvt")
    .attr("cx", function(d) {
      return xLolli(d.id) + xLolli.bandwidth() / 2
    })
    .attr("cy", function(d) {
      return yLolli(d.score) - mainMargin.bottom - 20
    })
    .attr("r", "20")
    .style("fill", "#69b3a2")
    .style("cursor", "pointer")
    .style("stroke", "black")
    .on("mouseover", function(d) {
      const tooltipTop =
        d.score < 50
          ? yLolli(d.score) - mainMargin.bottom - 20 - 150
          : yLolli(d.score)
      setTooltip(d)
      setTooltipStyle({
        ...cssTooltipStyle,
        top: tooltipTop,
        left: xLolli(d.id) + xLolli.bandwidth() / 2,
        overflow: "hidden",
        opacity: 1,
      })
    })
    .on("click", function(d) {})
    .on("mouseout", function(d) {
      setTooltipStyle({
        width: 0,
        height: 0,
        top: null,
        left: null,
        opacity: 0,
      })
    })

  d3.selectAll(".group")
    .append("text")
    .attr("class", "percentText")
    .attr("x", function(d) {
      return xLolli(d.id) - 5
    })
    .attr("y", function(d) {
      return yLolli(d.score) - mainMargin.bottom - 20 - 30
    })
    .attr("fill", "#828282")
    .attr("font-size", "1.2rem")
    .attr("dominant-baseline", "middle")
    // .attr("text-anchor", "middle")
    .text(function(d) {
      return `${d.score}%`
    })

  d3.select(".selection")
    .attr("fill", "#EEF090")
    .attr("stroke-width", 1)
    .attr("stroke", "rgba(0,0,0,0.2)")

  criteriaScore.forEach((score, i) => {
    const strokeType = score === 100 ? "stroke-width" : "stroke-dasharray"
    lolliSvg
      .append("line")
      .attr("x1", 0)
      .attr("x2", maxWidth)
      .attr("y1", yLolli(score) - mainMargin.bottom)
      .attr("y2", yLolli(score) - mainMargin.bottom)
      .attr("stroke", "#AEAEAE")
      .attr(strokeType, "2")
  })

  const meanLine = lolliSvg.append("g")
  meanLine
    .append("line")
    .attr("x1", 0)
    .attr("x1", maxWidth)
    .attr("y1", yLolli(meanScore) - mainMargin.bottom)
    .attr("y2", yLolli(meanScore) - mainMargin.bottom)
    .attr("stroke", "#F0324B")
}

function updateChart(filter) {
  if (filter === "position") {
    d3.selectAll(".group").style("opacity", function(d) {
      return filter !== d.type ? "0.1" : "1"
    })
  } else if (filter === "find") {
    d3.selectAll(".group").style("opacity", function(d) {
      return filter !== d.type ? "0.1" : "1"
    })
  } else if (filter === "job") {
    d3.selectAll(".group").style("opacity", function(d) {
      return filter !== d.type ? "0.1" : "1"
    })
  } else {
    d3.selectAll(".group").style("opacity", function(d) {
      return "1"
    })
  }
}

function CreateLabel({ data, index }) {
  const grade = ["A", "B", "C", "D", "F"]
  return (
    <div css={{ ...cssLabel }}>
      <strong>{grade[index]}</strong>{" "}
      <span css={{ ...cssScoreText }}>0 คน</span>
    </div>
  )
}

export default function(props) {
  const { data, filter } = props
  const { criteriaScore } = prepareData(data)
  const timelineRef = useRef(null)
  const lollipopRef = useRef(null)

  const [tooltip, setTooltip] = useState(null)
  const [tooltipStyle, setTooltipStyle] = useState({
    position: "absolute",
    width: 0,
    left: null,
    top: null,
    opacity: 0,
  })

  useEffect(() => {
    createChart(data, timelineRef, lollipopRef, setTooltip, setTooltipStyle)
  }, [])

  useEffect(() => {
    updateChart(filter)
  }, [filter])

  return (
    <div>
      <div ref={timelineRef} width="100%" />
      <div css={{ ...cssLollipopCon }}>
        {tooltip ? (
          <div css={{ ...tooltipStyle }}>
            <strong>
              <p>{tooltip.name}</p>
            </strong>
            <p>ระยะเวลาทำงาน 145 ครั้ง</p>
            <p>เข้าลงมติ {tooltip.score} ครั้ง</p>
            <a>ดูโปรไฟล์</a>
          </div>
        ) : (
          <></>
        )}
        <div ref={lollipopRef} />
        <div css={{ ...cssLabelCon }}>
          {criteriaScore.map((data, index) => {
            return <CreateLabel data={data} key={index} index={index} />
          })}
        </div>
      </div>
    </div>
  )
}
