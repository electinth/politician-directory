import React, { useState, useEffect, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"

import "./votesearch.css"
import searchImg from "../../images/icons/search/search.png"

export default function VoteSearch() {
  const data = useStaticQuery(graphql`
    {
      allVotelogYaml(filter: { is_active: { eq: true } }) {
        edges {
          node {
            title
            legal_title
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const transformedQuery = useMemo(
    () =>
      data.allVotelogYaml.edges.map(({ node }) => {
        const { title, legal_title, fields } = node

        return {
          title,
          legal_title,
          slug: fields.slug,
        }
      }),
    [data]
  )

  const [filteredQuery, setFilteredQuery] = useState([])
  const [searchText, setSearchText] = useState("")
  const handleSearchChange = e => setSearchText(e.target.value)

  useEffect(() => {
    const trimmedSearchText = searchText.trim()
    if (!trimmedSearchText) return
    const matchConsecutiveSpaces = /\s+/g
    const searchRegExp = new RegExp(
      trimmedSearchText.replace(matchConsecutiveSpaces, "|"),
      "g"
    )

    const filtered = transformedQuery.filter(({ title, legal_title }) =>
      searchRegExp.test(title + legal_title)
    )

    setFilteredQuery(filtered)
  }, [searchText, transformedQuery])

  return (
    <div className="votesearch-origin">
      <div className="votesearch-container">
        <input
          className="votesearch-input"
          type="text"
          placeholder="พิมพ์ชื่อมติ"
          value={searchText}
          onChange={handleSearchChange}
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
        {searchText && (
          <ul className="votesearch-result">
            {filteredQuery.length ? (
              filteredQuery.map(({ title, slug }) => (
                <li key={slug}>
                  <a href={slug}>{title}</a>
                </li>
              ))
            ) : (
              <li>
                <span>ไม่มีมติชื่อนี้</span>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
