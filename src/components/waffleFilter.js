import React, { Component } from "react"

import Waffle from "../components/waffle"

const cssH1 = { fontSize: "4.8rem", marginTop: "4rem" }

class WaffleFilter extends Component {
  state = {
    data_of_interest: this.props.data,
    data_the_rest: this.props.data,
    showMenu: null,
    currentFilter: {
      gender: "ทุกเพศ",
      generation: "ทุกช่วงวัย",
      education: "การศึกษาทั้งหมด",
      occupation_group: "ทุกกลุ่มอาชีพ (เดิม)",
    },
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
            ![
              "ทุกเพศ",
              "ทุกช่วงวัย",
              "การศึกษาทั้งหมด",
              "ทุกกลุ่มอาชีพ (เดิม)",
            ].includes(filter[key])
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
    let currentFilter = { ...this.state.currentFilter }
    currentFilter[field] = e.target.innerText
    let [data_of_interest, data_the_rest] = this.filterData(
      this.props.data,
      currentFilter
    )
    this.setState({
      showMenu: null,
      currentFilter,
      data_of_interest,
      data_the_rest,
    })
  }

  uniqueChoices = group => [...new Set(this.props.data.map(x => x.node[group]))]

  componentDidMount() {
    let currentFilter = { ...this.state.currentFilter }
    currentFilter["gender"] = "หญิง"
    let [data_of_interest, data_the_rest] = this.filterData(
      this.props.data,
      currentFilter
    )
    this.setState({ currentFilter, data_of_interest, data_the_rest })
  }

  render() {
    return (
      <>
        <h2 css={{ ...cssH1 }}>สัดส่วนผู้แทนของเรา พวกเขาเป็นใครบ้าง</h2>
        <h2>
          <span css={{ fontSize: "7.2rem", verticalAlign: "middle" }}>
            {(
              (100 * this.state.data_of_interest.length) /
              this.props.data.length
            ).toFixed(2)}
            %
          </span>
          <span css={{ fontFamily: "var(--ff-text)", fontSize: "2.4rem" }}>
            ของผู้แทนในสภาทั้งหมดเป็น
          </span>
        </h2>
        <div css={{ margin: "50px auto 0 auto" }}>
          <ul>
            <li>
              <button onClick={() => this.setState({ showMenu: 1 })}>
                {this.state.currentFilter.gender}
              </button>
              {this.state.showMenu === 1 ? (
                <div className="menuItems">
                  <button onClick={e => this.handleFilter(e, "gender")}>
                    ทุกเพศ
                  </button>
                  {this.uniqueChoices("gender").map(choice => (
                    <button onClick={e => this.handleFilter(e, "gender")}>
                      {choice}
                    </button>
                  ))}
                </div>
              ) : null}
            </li>
            <li>
              <button onClick={() => this.setState({ showMenu: 2 })}>
                {this.state.currentFilter.generation}
              </button>
              {this.state.showMenu === 2 ? (
                <div className="menuItems">
                  <button onClick={e => this.handleFilter(e, "generation")}>
                    ทุกช่วงวัย
                  </button>
                  {this.uniqueChoices("generation").map(choice => (
                    <button onClick={e => this.handleFilter(e, "generation")}>
                      {choice}
                    </button>
                  ))}
                </div>
              ) : null}
            </li>
            <li>
              <button onClick={() => this.setState({ showMenu: 3 })}>
                {this.state.currentFilter.education}
              </button>
              {this.state.showMenu === 3 ? (
                <div className="menuItems">
                  <button onClick={e => this.handleFilter(e, "education")}>
                    การศึกษาทั้งหมด
                  </button>
                  {this.uniqueChoices("education").map(choice => (
                    <button onClick={e => this.handleFilter(e, "education")}>
                      {choice}
                    </button>
                  ))}
                </div>
              ) : null}
            </li>
            <li>
              <button onClick={() => this.setState({ showMenu: 4 })}>
                {this.state.currentFilter.occupation_group}
              </button>
              {this.state.showMenu === 4 ? (
                <div className="menuItems">
                  <button
                    onClick={e => this.handleFilter(e, "occupation_group")}
                  >
                    ทุกกลุ่มอาชีพ (เดิม)
                  </button>
                  {this.uniqueChoices("occupation_group").map(choice => (
                    <button
                      onClick={e => this.handleFilter(e, "occupation_group")}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              ) : null}
            </li>
          </ul>
          <Waffle
            data={[this.state.data_of_interest, this.state.data_the_rest]}
            colors={[`var(--cl-pink)`, `var(--cl-gray-3)`]}
          />
        </div>
      </>
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
  })

  return <WaffleFilter data={data} />
}
