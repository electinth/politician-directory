import React, { useState, useEffect, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"

import "./votesearch.css"
import search_img from "../../images/icons/search/search.png"

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
      data.allVotelogYaml.edges.map(e => {
        const { title, legal_title, fields } = e.node

        return {
          title,
          legal_title,
          slug: fields.slug,
        }
      }),
    [data]
  )

  const [filteredQuery, setFilteredQuery] = useState(/*<Query[]>*/ [])
  const [searchText, setSearchText] = useState(/*<string>*/ "")
  const handleSearchChange = e => setSearchText(e.target.value)

  useEffect(() => {
    const formattedSearchText = searchText.trim()
    if (!formattedSearchText) return

    const filtered = transformedQuery.filter(({ title, legal_title }) => {
      return (
        legal_title.includes(formattedSearchText) ||
        title.includes(formattedSearchText)
      )
    })

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
          src={search_img}
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
