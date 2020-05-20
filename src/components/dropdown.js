import React, { Component } from "react"

import { css, Global } from "@emotion/core"

class DropDown extends Component {
  container = React.createRef()

  state = {
    show: false,
  }

  handleFilter = (e, field) => {
    this.setState({ show: !this.state.show })
    this.props.handleFilter(e, field)
  }
  handleClickOutside = e => {
    if (this.container.current && !this.container.current.contains(e.target)) {
      this.setState({
        show: false,
      })
    }
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }
  render() {
    return (
      <li ref={this.container}>
        <button
          onClick={() => this.setState({ show: !this.state.show })}
          className="currentFilter"
        >
          {this.props.currentFilter[this.props.filter]}
          <span>
            <i
              className="arrow-down"
              style={this.state.show ? { transform: "rotate(180deg)" } : {}}
            ></i>
          </span>
        </button>
        {this.state.show ? (
          <div className="menuItems">
            <button onClick={e => this.handleFilter(e, this.props.filter)}>
              {this.props.choices.default}
            </button>
            {this.props.choices.others.map((choice, index) => (
              <button
                key={index}
                onClick={e => this.handleFilter(e, this.props.filter)}
              >
                {choice}
              </button>
            ))}
          </div>
        ) : null}
      </li>
    )
  }
}

export default ({ choices, currentFilter, handleFilter }) => {
  return (
    <ul className="current-filter-list" css={{ marginLeft: 0 }}>
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
            margin-left: 1rem;
          }

          .current-filter-list {
            text-align: center;
            list-style: none;
            button {
              text-align: left;
              background: var(--cl-pink);
              border: 1px var(--cl-black) solid;
              cursor: pointer;
              min-width: 165px;
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
            min-width: 165px;
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
      {Object.entries(choices).map(([filter, choices]) => (
        <DropDown
          key={filter}
          currentFilter={currentFilter}
          handleFilter={handleFilter}
          filter={filter}
          choices={choices}
        />
      ))}
    </ul>
  )
}
