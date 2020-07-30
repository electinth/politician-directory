import React from 'react';

const cssChart = {
  width: '90%',
  height: '30px',
  margin: '50px auto',
  background: 'var(--cl-vote-yes)',
  "&:hover": {
    border: '2px solid black',
    cursor: "pointer"
  },
}
const MockBarchart = ({ setPopupState, setVoteId }) => {
  const showPopup = () => {
    setPopupState(true)
  }
  const voteIdSelected = () => {
    setVoteId('10')
  }
  return (
    <div>
      <div css={cssChart} onClick={ () => {showPopup(); voteIdSelected();} } />     
    </div>
  )
}

export default MockBarchart