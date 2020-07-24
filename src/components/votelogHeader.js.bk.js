import React, { useState } from 'react';

const cssContainer = {
  padding: '56px 63px',
  display: 'flex',
  justifyContent: 'space-between'
}
const cssTitle = {
  fontSize: '4.8rem',
  marginBottom: '50px'
}
const cssBtn = {
  fontSize: '18px',
  color: 'grey',
  border: '2px solid grey',
  borderRadius: '50px',
  width: '180px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  "&:hover": {
    border: '2px solid #000000',
    color: 'black',
  },
}
const cssVoteBox = {
  width: '164px',
  height: '145px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.8rem',
}
const cssVoteNo = {
  fontSize: '4.8rem'
}
const VotelogHeader = () => {
  return (
    <div css={cssContainer}>
      <div>
        <div css={cssTitle}>
          ผลการลงมติ
        </div>
        <div style={{display: 'flex'}}>
          <div css={cssBtn}>
            ดูรายคน
          </div>
          <div css={cssBtn}>
            ดูแยกประเภทส.ว.
          </div>
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <div css={cssVoteBox} style={{ background: '#76C8B8'}}>
          <div>
            มติผ่าน
          </div>
          <div css={cssVoteNo}>
            145
          </div>
        </div>
        <div css={cssVoteBox} style={{ background: '#F0324B'}}>
          <div>
            มติไม่ผ่าน
          </div>
          <div>
            0
          </div>
        </div>
      </div>
    </div>
  )
}

export default VotelogHeader