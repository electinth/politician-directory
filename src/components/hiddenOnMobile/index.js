import React from "react"

import PropTypes from "prop-types"

import "../../styles/global.css"
import "./index.css"

const HiddenOnMobile = ({ children, style }) => (
  <div className="hidden-on-mobile" style={style}>
    {children}
  </div>
)

HiddenOnMobile.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
}

HiddenOnMobile.defaultProps = {
  children: <></>,
  style: {},
}

export default HiddenOnMobile
