import React, { useState } from "react"
import PropTypes from "prop-types"

import "./votesearch.css"
import searchImg from "../../images/icons/search/search.png"

export default function VoteSearchInput({
  children,
  onChange,
  onChangeText,
  ...inputProps
}) {
  const [searchText, setSearchText] = useState("")
  const handleSearchChange = e => {
    setSearchText(e.target.value)
    onChange?.(e)
    onChangeText?.(e.target.value)
  }

  return (
    <div className="votesearch-container">
      <input
        className="votesearch-input"
        type="text"
        placeholder="พิมพ์ชื่อมติ"
        value={searchText}
        onChange={handleSearchChange}
        {...inputProps}
      />
      <img
        className="votesearch-decor"
        src={searchImg}
        alt=""
        loading="lazy"
        decoding="async"
        width="15"
        height="15"
        aria-hidden="true"
      />
      {children}
    </div>
  )
}

VoteSearchInput.propTypes = {
  children: PropTypes.node,
  onChangeText: PropTypes.func,
}
