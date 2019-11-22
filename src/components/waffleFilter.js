import React, { Component } from "react"

import _ from "lodash"

import Dropdown from "./dropdown"
import Waffle from "../components/waffle"

const cssH1 = { fontSize: "4.8rem", marginTop: "4rem" }

const formatHouse = house => {
  if (house === "ทั้งหมด") {
    return "ผู้แทนทั้งหมด"
  } else if (house === "ส.ส.") {
    return "สมาชิกสภาผู้แทนราษฎร"
  } else if (house === "ส.ว.") {
    return "สมาชิกวุฒิสภา"
  } else {
    return "ที่เป็นคนนอก"
  }
}

class WaffleFilter extends Component {
  state = {
    house: this.props.data,
    data_of_interest: [],
    data_the_rest: [],
    currentFilter: _.zipObject(
      Object.keys(this.props.choices),
      Object.values(this.props.choices).map(choice => choice.default)
    ),
  }

  filterData = (data, filter) => {
    let data_of_interest = []
    let data_the_rest = []
    data.forEach(person => {
      {
        let interested = true
        for (var key in filter) {
          if (
            /// if default filter then don't change interest
            !Object.values(this.props.choices)
              .map(choice => choice.default)
              .includes(filter[key])
          ) {
            interested = interested && person.node[key] === filter[key]
          }
        }
        if (interested) {
          data_of_interest.push(person)
        } else {
          data_the_rest.push(person)
        }
      }
    })
    return [data_of_interest, data_the_rest]
  }

  handleFilter = (e, field) => {
    if (field === "house") {
      let currentFilter = { ...this.state.currentFilter }
      let filter = e.target.innerText
      currentFilter["house"] = filter
      let house = [...this.props.data]
      if (filter !== "ทั้งหมด") {
        house = house.filter(
          x => x.node["house"] === filter && x.node["is_active"] === true
        )
      }
      let [data_of_interest, data_the_rest] = this.filterData(
        house,
        currentFilter
      )
      this.setState({
        currentFilter,
        house,
        data_of_interest,
        data_the_rest,
      })
    } else {
      let currentFilter = { ...this.state.currentFilter }
      currentFilter[field] = e.target.innerText
      let [data_of_interest, data_the_rest] = this.filterData(
        this.state.house,
        currentFilter
      )
      this.setState({
        currentFilter,
        data_of_interest,
        data_the_rest,
      })
    }
  }

  componentDidMount() {
    this.handleFilter({ target: { innerText: "หญิง" } }, "gender")
  }

  render() {
    return (
      <>
        <h2 css={{ ...cssH1 }}>สัดส่วนผู้แทนของเรา พวกเขาเป็นใครบ้าง</h2>
        <h2>
          <span css={{ fontSize: "7.2rem", verticalAlign: "middle" }}>
            {(
              (100 * this.state.data_of_interest.length) /
              this.state.house.length
            ).toFixed(2)}
            %
          </span>
          <span css={{ fontFamily: "var(--ff-text)", fontSize: "2.4rem" }}>
            {`ของ${formatHouse(this.state.currentFilter.house)} ${
              this.state.currentFilter.gender === "ทุกเพศ"
                ? ""
                : "เป็นเพศ" + this.state.currentFilter.gender
            } ${
              this.state.currentFilter.generation === "ทุกช่วงวัย"
                ? ""
                : "เกิดในยุค " +
                  this.state.currentFilter.generation.match(/([A-Za-z ]*) |/)[1]
            } ${
              this.state.currentFilter.education === "ทุกระดับการศึกษา"
                ? ""
                : (this.state.currentFilter.education === "สถาบันทหาร"
                    ? "จบการศึกษาจาก"
                    : "จบการศึกษาระดับ") + this.state.currentFilter.education
            } ${
              this.state.currentFilter.occupation_group ===
              "ทุกกลุ่มอาชีพ (เดิม)"
                ? ""
                : "เคยประกอบอาชีพ" + this.state.currentFilter.occupation_group
            }`}
          </span>
        </h2>
        <div css={{ margin: "50px auto 0 auto" }}>
          <Dropdown
            choices={this.props.choices}
            currentFilter={this.state.currentFilter}
            handleFilter={this.handleFilter}
          />
          <Waffle
            data={[this.state.data_of_interest, this.state.data_the_rest]}
            colors={[`var(--cl-pink)`, `var(--cl-gray-3)`]}
            borderColors={[`var(--cl-pink)`, `var(--cl-gray-3)`]}
            style={{ margin: "0 auto" }}
          />
        </div>
      </>
    )
  }
}

export default ({ data }) => {
  const generationList = [
    [74, "Silent | 74 ปีขึ้นไป"],
    [55, "Baby Boomer | 55 - 73 ปี"],
    [39, "Gen X | 39 - 54 ปี"],
    [25, "Millenial | 25 - 38 ปี"],
  ]

  data.forEach(person => {
    const age = parseInt(person.node.birthdate)
    generationList.some(([maxAge, generation]) => {
      person.node.generation = generation
      return age >= maxAge
    })

    if (person.node.is_mp) {
      person.node.house = "ส.ส."
    } else if (person.node.is_senator) {
      person.node.house = "ส.ว."
    } else {
      person.node.house = "ไม่ใช่ ส.ส. หรือ ส.ว."
    }
  })
  const uniqueChoices = group => [...new Set(data.map(x => x.node[group]))]
  const choices = {
    // house: { default: "ทั้งหมด", others: uniqueChoices("house") },
    house: {
      default: "ทั้งหมด",
      others: ["ส.ส.", "ส.ว.", "ไม่ใช่ ส.ส. หรือ ส.ว."],
    },
    gender: { default: "ทุกเพศ", others: uniqueChoices("gender") },
    generation: {
      default: "ทุกช่วงวัย",
      others: _.sortBy(uniqueChoices("generation"), x =>
        parseInt(x.match(/\d+/)[0])
      ),
    },
    education: {
      default: "ทุกระดับการศึกษา",
      others: [
        "ต่ำกว่าปริญญาตรี",
        "สถาบันทหาร",
        "ปริญญาตรี",
        "ปริญญาโท",
        "ปริญญาเอก",
        "ไม่พบข้อมูล",
      ],
    },
    occupation_group: {
      default: "ทุกกลุ่มอาชีพ (เดิม)",
      others: uniqueChoices("occupation_group"),
    },
  }
  console.log(choices)
  return <WaffleFilter data={data} choices={choices} />
}
