import React, { Component } from "react"

import _ from "lodash"

import Waffle from "../components/waffle"

class WaffleFilter extends Component {
  state = {
    // data: this.props.data,
    data_of_interest: this.props.data,
    data_the_rest: this.props.data,
    currentFilter: {
      gender: "ทุกเพศ",
      generation: "ทุกช่วงวัย",
      education: "การศึกษาทั้งหมด",
      occupation_group: "ทุกกลุ่มอาชีพ (เดิม)",
    },
  }

  componentDidMount() {
    let currentFilter = { ...this.state.currentFilter }
    currentFilter["gender"] = "หญิง"
    let data_of_interest = []
    let data_the_rest = []
    this.props.data.forEach(person => {
      let interested = false
      for (var key in currentFilter) {
        if (
          /// if default filter then don't change interest
          ![
            "ทุกเพศ",
            "ทุกช่วงวัย",
            "การศึกษาทั้งหมด",
            "ทุกกลุ่มอาชีพ (เดิม)",
          ].includes(currentFilter[key]) &&
          person.node[key] === currentFilter[key]
        ) {
          interested = true
        }
      }
      if (interested) {
        data_of_interest.push(person)
      } else {
        data_the_rest.push(person)
      }
    })
    this.setState({ data_of_interest, data_the_rest })
  }

  render() {
    return (
      <Waffle
        data={[this.state.data_of_interest, this.state.data_the_rest]}
        colors={[`var(--cl-pink)`, `var(--cl-gray-3)`]}
      />
    )
  }
}

export default ({ data }) => {
  const generationList = [
    [74, "Silent"],
    [55, "Baby Boomer"],
    [39, "Gen X"],
    [25, "Millenial"],
  ]

  data.forEach(person => {
    const age = parseInt(person.node.birthdate)
    generationList.some(([maxAge, generation]) => {
      person.node.generation = generation
      return age >= maxAge
    })
    console.log(age, person.node.generation)
  })
  console.log("generation", data)

  return <WaffleFilter data={data} />
}
