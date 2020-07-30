import React, { Component } from "react"

import { css, Global } from "@emotion/core"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

class DropDown extends Component {
  container = React.createRef()
  state = {
    show: false,
    is_senate: this.props.is_senate,
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
    this.setState({ is_senate: false })
  }
  render() {
    return (
      <li ref={this.container}>
        <button
          onClick={() => this.setState({ show: !this.state.show })}
          className="currentFilter"
        >
          {this.state.is_senate ? (
            <Img fixed={this.props.clock_image} />
          ) : (
            this.props.currentFilter[this.props.filter]
          )}
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
              {this.state.is_senate ? (
                <div>
                  <Img fixed={this.props.clock_image} className="clock_image" />
                  <div className="clock_text">เวลาล่าสุด</div>
                </div>
              ) : (
                this.props.choices.default
              )}
            </button>
            {this.props.choices.others.map((choice, i) => (
              <button onClick={e => this.handleFilter(e, this.props.filter)}>
                <div
                  className="bulletChoice"
                  style={{ backgroundColor: this.props.colors[i] }}
                />
                <div className="cssChoice">{choice}</div>
              </button>
            ))}
          </div>
        ) : null}
      </li>
    )
  }
}

export default ({
  choices,
  currentFilter,
  handleFilter,
  is_senate,
  colors,
}) => {
  const data = useStaticQuery(graphql`
    query {
      clock: file(relativePath: { eq: "images/clock/clock.png" }) {
        childImageSharp {
          fixed(height: 15) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <ul className="current-filter-list" css={{ marginLeft: 0 }}>
      {is_senate ? (
        <Global
          styles={css`
            .arrow-down {
              margin-top: 3px;
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 8px solid #aeaeae;
              float: right;
              margin-left: 1rem;
            }

            .current-filter-list {
              text-align: center;
              list-style: none;
              position: absolute;
              button {
                text-align: left;
                background: white;
                border: 1px solid #e0e0e0;
                cursor: pointer;
                min-width: 50px;
                height: 31px;
                margin: 1px 7.5px;
              }
              .currentFilter {
                border-radius: 7.5px;
                margin: 0 0 0 5rem;
              }
              .currentFilter:hover {
                background-color: #eef090;
              }
              button:focus {
                outline: none;
                border: 1px solid #000000;
                box-sizing: border-box;
                border-radius: 5px;
              }
              li {
                display: inline-block;
                position: relative;
              }
            }

            .menuItems {
              position: absolute;
              z-index: 1;
              box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2),
                0 6px 10px 0 rgba(0, 0, 0, 0.19);
              min-width: 185px;
              margin: 1px 7.5px;
              button {
                display: block;
                border: none;
                background-color: white;
                margin: 0px;
                width: 100%;
              }
              button:hover {
                background-color: #eef090;
              }
            }
            .bulletChoice,
            .clock_image {
              content: "";
              display: inline-block;
              width: 15px;
              height: 15px;
              border-radius: 7.5px;
              margin-left: 20px;
            }
            .cssChoice,
            .clock_text {
              display: inline-block;
              position: absolute;
              margin: -2px 0 0 15px;
            }
            .clock_image {
              margin-top: 5px;
            }
            .clock_text {
              margin-top: 3px;
            }
          `}
        />
      ) : (
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
      )}
      {Object.entries(choices).map(([filter, choices], key) => (
        <DropDown
          currentFilter={currentFilter}
          handleFilter={handleFilter}
          filter={filter}
          choices={choices}
          key={key}
          is_senate={is_senate}
          colors={colors}
          clock_image={data.clock.childImageSharp.fixed}
        />
      ))}
    </ul>
  )
}
