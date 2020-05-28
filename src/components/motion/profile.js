import React from "react"

import styled from "@emotion/styled"

import { politicianPicture } from "../../utils"

const ProfilePic = ({ name, last_name }) => {
  const profile = { name, lastname: last_name }
  return <img src={politicianPicture(profile)} alt="" />
}

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

export default Profile
