import React from "react"

import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { politicianPicture } from "../../utils"

const ProfilePic = ({ name, last_name }) => {
  const profile = { name, lastname: last_name }
  return <img src={politicianPicture(profile)} alt="" />
}

export { ProfilePic }

const ProfileContainer = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  margin-bottom: 1.08rem;

  & .profile-pic {
    width: 40px;
    height: 40px;

    clip-path: circle(50%);
    margin-right: 15px;
  }
`

const profile = ({ name, last_name, party }) => {
  return (
    <ProfileContainer>
      <div className="profile-pic">
        <ProfilePic name={name} last_name={last_name} />
      </div>
      <div className="detail">
        <div className="name">
          {name} {last_name}
        </div>
        <div className="party">{party}</div>
      </div>
    </ProfileContainer>
  )
}
const Profile = styled(profile)``

const nominator = ({ className, motion: { purposers, seconders } }) => {
  return (
    <ul className={className}>
      <li>
        <h4>ผู้เสนอ</h4>
        <ul>
          {purposers.map(id => (
            <Profile key={id.name + id.last_name} {...id} />
          ))}
        </ul>
      </li>
      <li>
        <h4>ผู้รับรอง</h4>
        <ul
          css={css`
            /* height: 50vh;
            overflow-y: scroll; */
            list-style: none;

            & .party {
              color: grey;
            }
          `}
        >
          {seconders.map(id => (
            <Profile key={id.name + id.last_name} {...id} />
          ))}
        </ul>
      </li>
    </ul>
  )
}
const Nominator = styled(nominator)`
  height: 80vh;
  overflow-y: scroll;
  list-style: none;
  padding: 10px 20px;

  & > li > h4 {
    margin: 20px 0;
    font-size: 22px;
    color: var(--cl-gray-0);
  }
`

export default Nominator
