import React, { Component } from "react"

import { css, Global } from "@emotion/core"

class ToggleSwitch extends Component {
  switchOn = (
    <div>
      <div className="arrow up up_limitShow" />
      <div className="arrow down down_limitShow" />
    </div>
  )
  switchOff = (
    <div>
      <div className="arrow down down_showAll" />
      <div className="switch_line" />
      <div className="arrow up up_showAll" />
    </div>
  )
  render() {
    return (
      <>
        <input
          checked={this.props.is_On}
          onChange={this.props.handleToggle}
          className="switch-checkbox"
          id={`switch`}
          type="checkbox"
        />
        <label className="switch-label" htmlFor={`switch`}>
          <div style={{ opacity: this.props.is_On ? "0.5" : "1" }}>
            {this.switchOn}
          </div>
          <span className={`switch-button`} />
          <div style={{ opacity: !this.props.is_On ? "0.5" : "1" }}>
            {this.switchOff}
          </div>
        </label>
      </>
    )
  }
}

export default ({ is_On, handleToggle }) => {
  return (
    <div>
      <Global
        styles={css`
          .switch-checkbox {
            visibility: hidden;
          }
          .switch-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            width: 60px;
            height: 30px;
            background: #f7f7f7;
            border-radius: 5px;
            border: 1px solid #e0e0e0;
            position: absolute;
            transition: background-color 0.1s;
            top: 0;
          }
          .switch-label .switch-button {
            border: 1px solid #e0e0e0;
            content: "";
            left: -1px;
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 5px;
            transition: 0.1s;
            background: white;
          }

          .switch-checkbox:checked + .switch-label .switch-button {
            left: calc(100% + 1px);
            transform: translateX(-100%);
          }

          .switch-label:active .switch-button {
            width: 32px;
          }

          .arrow {
            border: 2px solid #aeaeae;
            border-width: 0 2px 2px 0;
            display: inline-block;
            padding: 3px;
            z-index: 10;
            position: absolute;
          }

          .up {
            transform: rotate(-135deg);
          }
          .down {
            transform: rotate(45deg);
          }
          .up_limitShow {
            margin: -8px 0 0 10px;
          }
          .down_limitShow {
            margin: 0 0 0 10px;
          }
          .down_showAll {
            margin: -12px 0 0 -18px;
          }
          .up_showAll {
            margin: 5px 0 0 -18px;
          }
          .switch_line {
            border: 1px solid #aeaeae;
            transform: rotate(180deg);
            z-index: 10;
            position: absolute;
            height: 2px;
            width: 12px;
            margin: -1px 0 0 -20px;
          }
        `}
      />
      <ToggleSwitch is_On={is_On} handleToggle={handleToggle} />
    </div>
  )
}
