import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import PeopleAvatar from "../peopleAvatar"

const ProfileContainer = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  margin-bottom: 1.08rem;

  & .profile-pic {
    width: ${({ oneline }) => (oneline ? "24px" : "40px")};
    height: ${({ oneline }) => (oneline ? "24px" : "40px")};

    clip-path: circle(50%);
    margin-right: 15px;
  }

  & .name a {
    color: var(--cl-black);
  }

  & .party a {
    color: var(--cl-gray-1);
  }

  & .oneline {
    display: flex;
    width: 100%;

    & .name {
      flex: 1;
    }

    & .party {
      flex: 0 0 100px;
    }
  }
`

const Profile = ({ name, last_name, party, slug, oneline }) => {
  return (
    <ProfileContainer oneline={oneline}>
      <div className="profile-pic">
        <PeopleAvatar name={name} lastname={last_name} />
      </div>
      <div className={oneline && "oneline"}>
        <div className="name">
          <Link to={slug || `/people/${name}-${last_name}`}>
            {name} {last_name}
          </Link>
        </div>
        <div className="party">
          <Link to={`/party/${party}`}>{party}</Link>
        </div>
      </div>
    </ProfileContainer>
  )
}

export default Profile
