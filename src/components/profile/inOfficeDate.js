import React from "react"

import { formatDate } from "../../utils"

// component to show active date range
const InOfficeDate = profile => {
  const range = [profile.established_date, profile.dissolved_date]
  if (range[0]) range[0] = formatDate(range[0])
  if (range[1]) range[1] = formatDate(range[1])
  else range[1] = "Now"

  return (
    <p>
      {range[0]} - {range[1]}
    </p>
  )
}

export default InOfficeDate
