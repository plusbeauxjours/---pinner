import React from "react";
import styled from "../Styles/typed-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const Grid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 20px;
  padding: 20px;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SAvatar = styled(Avatar)`
  margin: 3px;
`;
interface IProps {
  usersBefore?: any;
  usersNow?: any;
}

const AvatarGrid: React.SFC<IProps> = ({ usersBefore, usersNow }) => (
  <Grid>
    {usersBefore &&
      usersBefore.map(user => (
        <AvatarContainer key={user.id}>
          <Link to={`/${user.actor.profile.username}`}>
            <SAvatar size={"sm"} url={user.actor.profile.avatar} />
          </Link>
        </AvatarContainer>
      ))}
    {usersNow &&
      usersNow.map(user => (
        <AvatarContainer key={user.id}>
          <Link to={`/${user.profile.username}`}>
            <SAvatar size={"sm"} url={user.profile.avatar} />
          </Link>
        </AvatarContainer>
      ))}
  </Grid>
);

export default AvatarGrid;
