import React from "react"

import "./votesearch.css"
import search_img from "../../images/icons/search/search.png"

export default function VoteSearch() {
  return (
    <div className="votesearch-container">
      <input
        className="votesearch-input"
        type="text"
        placeholder="พิมพ์ชื่อมติ"
      />
      <button className="votesearch-button" type="button">
        <img
          src={search_img}
          alt="ค้นหา"
          loading="lazy"
          decoding="async"
          width="15"
          height="15"
        />
      </button>
      <ul className="votesearch-result">
        <li>
          <span>ไม่มีมติชื่อนี้</span>
        </li>
        <li>
          <a href="/votelog/92">
            ลงมติไม่ไว้วางใจ นายจุติ ไกรฤกษ์
            รัฐมนตรีว่าการกระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์
          </a>
        </li>
        <li>
          <a href="/votelog/92">
            ลงมติไม่ไว้วางใจ นายจุติ ไกรฤกษ์
            รัฐมนตรีว่าการกระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์
          </a>
        </li>
        <li>
          <a href="/votelog/92">
            ลงมติไม่ไว้วางใจ นายจุติ ไกรฤกษ์
            รัฐมนตรีว่าการกระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์
          </a>
        </li>
        <li>
          <a href="/votelog/92">
            ลงมติไม่ไว้วางใจ นายจุติ ไกรฤกษ์
            รัฐมนตรีว่าการกระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์
          </a>
        </li>
        <li>
          <a href="/votelog/92">
            ลงมติไม่ไว้วางใจ นายจุติ ไกรฤกษ์
            รัฐมนตรีว่าการกระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์
          </a>
        </li>
      </ul>
    </div>
  )
}
