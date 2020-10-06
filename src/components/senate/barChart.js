import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

function DrawChart({
  data,
  types,
  width_of_barChart,
  is_yAxis,
  color_bars,
  height_svg,
  is_On,
  isShowAll,
  setVoteId,
  setPopupState,
  filter_senatorId,
  is_mobile,
  senatorTypeId,
}) {
  const smallTranslateWidth = width_of_barChart / 6 / 2
  let is_active = []
  const translateWidth = width_of_barChart / 6
  let is_mobile_center = 0
  const ref = useRef()
  const getElm = document.getElementsByClassName("barChart-wrapper")
  const getElm_margin = getElm[0] ? getElm[0].offsetLeft : 0
  const margin = {
      top: 0,
      right:
        (!is_mobile && isShowAll) || (is_yAxis && isShowAll)
          ? getElm_margin
          : 0,
      bottom: 0,
      left: 0,
    },
    height = is_On ? 300 : height_svg,
    width = width_of_barChart

  if (senatorTypeId === 1 || senatorTypeId === 2) {
    is_mobile_center = (document.body.clientWidth - width - 100) / 2
  } else if (senatorTypeId === 3) {
    is_mobile_center = (document.body.clientWidth - width - 100) / 2
  }
  useEffect(() => {
    if (is_yAxis) {
      d3.selectAll("g").remove()
      d3.select(".percentLine").remove()
    }
    draw_bar()
  }, [filter_senatorId])

  useEffect(() => {
    if (is_yAxis) {
      d3.selectAll("g").remove()
      d3.select(".percentLine").remove()
    }
    draw_bar()
  }, [data])

  useEffect(() => {
    if (is_mobile) {
      d3.select(".charts").remove()
      d3.select(".percentLine").remove()
    }
    draw_bar()
  }, [senatorTypeId])

  useEffect(() => {
    if (is_yAxis) {
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
        is_mobile ? document.body.clientWidth : isShowAll ? width - 100 : width
      )
      .attr("height", height)

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
    const diff_filter_width = window.innerWidth < 768 ? 110 : 140
    let x = d3
      .scaleLinear()
      .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
      .nice()
      .range([
        0,
        filter_senatorId
          ? width_of_barChart -
            width_of_barChart / 6 -
            (1 / 250) * width -
            diff_filter_width
          : isShowAll
          ? width - 100 - margin.right
          : width - margin.right,
      ])

    let y_filter_senatorId = d3
      .scaleBand()
      .domain(d3.range(filter_senatorId ? filter_senatorId.length : 0))
      .range([0, height])
      .padding(0.2)

    let yAxis = g =>
      g
        .attr("className", "g-yAxis")
        .style("text-anchor", "start")
        .attr("transform", `translate(10, 0)`)
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call(g => g.selectAll(".domain").remove())
        .call(g => g.selectAll("line").remove())

    const all_axis = d3.select(".yAxis")

    const g = chart.append("g").attr("className", "charts-g")
    const diff_line = window.innerWidth < 768 ? 50 : 100
    if (!filter_senatorId) {
      chart
        .append("line")
        .attr("class", "percentLine")
        .attr(
          "x1",
          isShowAll
            ? width / 2 - diff_line
            : is_mobile
            ? (document.body.clientWidth - width - 100) / 2 + width / 2
            : width / 2
        )
        .attr(
          "x2",
          isShowAll
            ? width / 2 - diff_line
            : is_mobile
            ? (document.body.clientWidth - width - 100) / 2 + width / 2
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
        d3.selectAll(".rect" + d.data.id).style("cursor", "pointer")
      } else {
        d3.selectAll(".rect" + d.key).style("stroke", "black")
        d3.selectAll(".rect" + d.key).style("cursor", "pointer")
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
      d3.selectAll(".rect" + is_active[0]).style("stroke", "none")
      if (is_active.length === 2) is_active.splice(0, 1)
      if (d.data) {
        is_active.push(d.data.id)
        d3.selectAll(`.rect${d.data.id}`).style("stroke", "black")
        setVoteId(d.data.id)
      } else {
        is_active.push(d.key.id)
        d3.selectAll(".rect" + d.key).style("stroke", "black")
        setVoteId(d.key)
      }
      setPopupState(true)
      handleBtnClick(d.data.id)
    }
    const handleBtnClick = value => {
      console.log("senate_votelog_id", value)
      if (
        process.env.GATSBY_ENV !== "production" ||
        process.env.GATSBY_ENV === "development"
      ) {
        return
      }
      try {
        window.gtag("senate_votelog_id", "Click", {
          event_label: value,
        })
      } catch (e) {
        console.error(e)
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
        all_axis.append("g").call(yAxis)
      }
      if (is_On) {
        all_axis
          .append("g")
          .append("text")
          .attr("x", 0)
          .attr("y", 10)
          .style("font-size", "8px")
          .text(data[0].vote_date)
        all_axis
          .append("g")
          .append("text")
          .attr("x", 0)
          .attr("y", height - 3)
          .style("font-size", "8px")
          .text(data[data.length - 1].vote_date)
      }
    }
  }
  return (
    <div
      className="barChart-wrapper"
      style={{ display: "flex", marginBottom: "30px" }}
    >
      {is_yAxis != "" ? (
        <svg className="yAxis" style={{ width: "100px" }} />
      ) : (
        ""
      )}
      <svg ref={ref} className="barChart" style={{ overflow: "hidden" }} />
    </div>
  )
}

export default DrawChart
