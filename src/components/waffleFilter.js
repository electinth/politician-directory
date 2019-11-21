import React, { Component } from "react"

import { css, Global } from "@emotion/core"

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
    showMenu: null,
    currentFilter: {
      house: "ทั้งหมด",
      gender: "ทุกเพศ",
      generation: "ทุกช่วงวัย",
      education: "การศึกษาทั้งหมด",
      occupation_group: "ทุกกลุ่มอาชีพ (เดิม)",
    },
  }

  handleHouse = e => {
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
      showMenu: null,
      currentFilter,
      house,
      data_of_interest,
      data_the_rest,
    })
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
              "ทั้งหมด",
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
      this.state.house,
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
    this.handleFilter({ target: { innerText: "หญิง" } }, "gender")
  }

  render() {
    console.log(this.state.data_of_interest)
    return (
      <>
        <Global
          styles={css`
            .arrow-down {
              margin-top: 5px;
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 10px solid var(--cl-black);
              float: right;
            }

            .current-filter-list {
              text-align: center;
              list-style: none;
              button {
                text-align: left;
                background: var(--cl-pink);
                border: 1px var(--cl-black) solid;
                cursor: pointer;
                width: 165px;
                height: 40px;
                margin: 1px 7.5px;
              }
              .currentFilter {
                border-radius: 7.5px;
              }
              button:focus {
                outline: none;
              }
              li {
                display: inline-block;
                position: relative;
              }
            }

            .menuItems {
              position: absolute;
              z-index: 1;
              border: 1px solid var(--cl-black);
              width: 165px;
              margin: 1px 7.5px;
              button {
                display: block;
                border: none;
                background-color: white;
                margin: 0px;
                width: 100%;
              }
              button:hover {
                background-color: var(--cl-pink);
              }
            }
          `}
        />
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
                : "เกิดในยุค " + this.state.currentFilter.generation
            } ${
              this.state.currentFilter.education === "การศึกษาทั้งหมด"
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
          <ul className="current-filter-list">
            <li>
              <button
                onClick={() => this.setState({ showMenu: 0 })}
                className="currentFilter"
              >
                {this.state.currentFilter.house}
                <span>
                  <i className="arrow-down"></i>
                </span>
              </button>
              {this.state.showMenu === 0 ? (
                <div className="menuItems">
                  <button onClick={e => this.handleHouse(e)}>ทั้งหมด</button>
                  {this.uniqueChoices("house").map(choice => (
                    <button onClick={e => this.handleHouse(e)}>{choice}</button>
                  ))}
                </div>
              ) : null}
            </li>
            <li>
              <button
                onClick={() => this.setState({ showMenu: 1 })}
                className="currentFilter"
              >
                {this.state.currentFilter.gender}
                <span>
                  <i className="arrow-down"></i>
                </span>
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
              <button
                onClick={() => this.setState({ showMenu: 2 })}
                className="currentFilter"
              >
                {this.state.currentFilter.generation}
                <span>
                  <i className="arrow-down"></i>
                </span>
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
              <button
                onClick={() => this.setState({ showMenu: 3 })}
                className="currentFilter"
              >
                {this.state.currentFilter.education}
                <span>
                  <i className="arrow-down"></i>
                </span>
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
              <button
                onClick={() => this.setState({ showMenu: 4 })}
                className="currentFilter"
              >
                {this.state.currentFilter.occupation_group}
                <span>
                  <i className="arrow-down"></i>
                </span>
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
            style={{ justifyContent: "center" }}
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

    if (person.node.is_mp) {
      person.node.house = "ส.ส."
    } else if (person.node.is_senator) {
      person.node.house = "ส.ว."
    } else {
      person.node.house = "ไม่ใช่ ส.ส. หรือ ส.ว."
    }
  })

  return <WaffleFilter data={data} />
}
