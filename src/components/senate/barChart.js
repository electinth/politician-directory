import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

const cssHightChart = {
  marginBottom: "42px",
}

function DrawChart({
  data,
  types,
  width_of_barChart,
  is_yAxis,
  color_bars,
  is_starter_bars,
  height_svg,
  is_On,
  isShowAll,
  setVoteId,
  setPopupState,
  filter_senatorId,
  is_mobile,
  senatorTypeId,
}) {
  const smallTranslateWidth = window.innerWidth < 768 ? 115 : 220
  const translateWidth = 300
  const diff_width = 400
  const ref = useRef()
  const margin = {
      top: 0,
      right: is_mobile ? 0 : !is_yAxis ? 0 : 80,
      bottom: 0,
      left: !is_yAxis ? 0 : 80,
    },
    height = is_On ? 300 : height_svg,
    width = width_of_barChart
  let is_mobile_center = 0
  let is_line_center = 0
  if (senatorTypeId === 1) {
    is_mobile_center = document.body.clientWidth / 2 - 80
    is_line_center = document.body.clientWidth / 2 + 3.5
  } else if (senatorTypeId === 2) {
    is_mobile_center = document.body.clientWidth / 4 - width / 4 + 5
    is_line_center = document.body.clientWidth / 2
  } else if (senatorTypeId === 3) {
    is_mobile_center = 10
    is_line_center = document.body.clientWidth / 2 + 18
  }
  useEffect(() => {
    if (is_starter_bars) {
      d3.selectAll("g").remove()
      d3.select(".percentLine").remove()
    }
    draw_bar()
  }, [filter_senatorId])

  useEffect(() => {
    if (is_starter_bars) {
      d3.selectAll("g").remove()
      d3.select(".percentLine").remove()
    }
    draw_bar()
  }, [data])

  useEffect(() => {
    console.log(senatorTypeId, "<--- senatorTypeId")
    if (is_mobile) {
      d3.select(".charts").remove()
      d3.select(".percentLine").remove()
    }
    draw_bar()
  }, [senatorTypeId])

  useEffect(() => {
    console.log("is_on ->>", is_On)
    if (is_starter_bars) {
      d3.selectAll("g").remove()
      d3.select(".percentLine").remove()
    }
    if (isShowAll) {
      d3.selectAll("g").remove()
      d3.select(".percentLine").remove()
      if (is_On) {
        d3.select(".chart").style("overflow-y", "hidden")
      }
      d3.select("svg").attr("height", height)
    } else {
      if (is_On) {
        d3.selectAll(".chart").attr("height", height)
      } else {
        d3.selectAll(".chart")
          .attr("height", height)
          .style("overflow-y", "visible")
      }
      d3.selectAll("svg").attr("height", height)
    }
    draw_bar()
  }, [is_On])

  function draw_bar() {
    d3.select(ref.current)
      .attr("className", "chart")
      .attr(
        "width",
        is_mobile
          ? document.body.clientWidth - 25
          : filter_senatorId
          ? width - 40
          : width
      )
      .attr("height", height)

    const fullScreen = is_mobile
      ? window.innerWidth - 25
      : window.innerWidth - 100
    d3.select(".chart-wrapper").style("width", `${fullScreen}px`)

    const chart = d3.select(ref.current)
    let series = d3.stack().keys(types.slice(1))(data)

    const color = d3
      .scaleOrdinal()
      .domain(series.map(d => d.key))
      .range(color_bars)
      .unknown("#ccc")

    let vote_dates = data.map(d => d.vote_date)
    let y = d3
      .scaleBand()
      .domain(vote_dates)
      .range([0, height])
      .padding(0.2)

    let x = d3
      .scaleLinear()
      .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
      .nice()
      .range([0, filter_senatorId ? width - diff_width : width - margin.right])

    let y_filter_senatorId = d3
      .scaleBand()
      .domain(d3.range(filter_senatorId ? filter_senatorId.length : 10))
      .range([0, height])
      .padding(0.2)

    let yAxis = g =>
      g
        .attr("className", "yAxis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call(g => g.selectAll(".domain").remove())
        .call(g => g.selectAll("line").remove())
        .attr("height", y.bandwidth())

    const g = chart
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .attr("className", "charts")

    if (!filter_senatorId != "") {
      chart
        .append("line")
        .attr("class", "percentLine")
        .attr(
          "x1",
          is_mobile
            ? is_line_center
            : (is_starter_bars && !isShowAll) || window.innerWidth < 768
            ? width / 2 + 40
            : width / 2
        )
        .attr(
          "x2",
          is_mobile
            ? is_line_center
            : (is_starter_bars && !isShowAll) || window.innerWidth < 768
            ? width / 2 + 40
            : width / 2
        )
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#AEAEAE")
        .attr("stroke-dasharray", "4")
    }
    const rects = g
      .selectAll("g")
      .data(series)
      .enter()
      .append("g")
      .attr("fill", d => color(d.key))

    const mouseover = d => {
      if (d.data) {
        d3.selectAll(".rect" + d.data.id).style("stroke", "black")
      } else {
        d3.selectAll(".rect" + d.key).style("stroke", "black")
      }
    }
    const mouseout = d => {
      if (d.data) {
        d3.selectAll(".rect" + d.data.id).style("stroke", "none")
      } else {
        d3.selectAll(".rect" + d.key).style("stroke", "none")
      }
    }
    const onClick = d => {
      if (d.data) {
        d3.selectAll(`.rect${d.data.id}`).style("stroke", "black")
        setVoteId(d.data.id)
        setPopupState(true)
      } else {
        d3.selectAll(".rect" + d.key).style("stroke", "black")
        setVoteId(d.key)
        setPopupState(true)
      }
    }
    rects
      .selectAll("rect")
      .data(d => d)
      .join(enter =>
        enter
          .append("rect")
          .attr("x", d => x(d[0]))
          .attr("y", d => y(d.data.vote_date))
          .attr("width", d => x(d[1]) - x(d[0]))
          .attr("height", y.bandwidth())
          .attr("class", d => "rect" + d.data.id)
          .on("mouseover", mouseover)
          .on("mouseout", mouseout)
          .on("click", onClick)
          .attr(
            "transform",
            `translate(${
              is_mobile
                ? is_mobile_center
                : filter_senatorId
                ? translateWidth
                : 0
            }, 0)`
          )
      )

    if (filter_senatorId) {
      chart
        .append("g")
        .attr("className", "charts")
        .selectAll("rect")
        .data(filter_senatorId)
        .join(enter =>
          enter
            .append("rect")
            .attr("x", d => x(d[0]))
            .attr("y", (d, i) => y_filter_senatorId(i))
            .attr("width", d => (1 / 250) * width)
            .attr("height", y_filter_senatorId.bandwidth())
            .attr(
              "transform",
              `translate(${filter_senatorId ? smallTranslateWidth : 0}, 0)`
            )
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("click", onClick)
            .attr("class", d => "rect" + d.key)
            .attr("fill", function(d) {
              if (d.value === "1") {
                return color_bars[0]
              } else if (d.value === "2") {
                return color_bars[1]
              } else if (d.value === "3") {
                return color_bars[2]
              } else if (d.value === "4") {
                return color_bars[3]
              } else if (d.value === "5") {
                return color_bars[4]
              }
            })
        )
    }
    if (is_yAxis) {
      if (!is_On) {
        g.append("g").call(yAxis)
      }
      if (is_On) {
        g.append("text")
          .attr("x", -70)
          .attr("y", 15)
          .style("font-size", "8px")
          .text(data[0].vote_date)
        g.append("text")
          .attr("x", -70)
          .attr("y", height - 3)
          .style("font-size", "8px")
          .text(data[data.length - 1].vote_date)
      }
    }
  }
  return (
    <div className="chart-wrapper" css={cssHightChart}>
      <svg ref={ref}></svg>
    </div>
  )
}

export default DrawChart
