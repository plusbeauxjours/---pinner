import React from "react";
import styled from "../Styles/typed-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const Grid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(50px, 50px));
  grid-gap: 15px;
  padding: 20px;
`;

const AvatarContainer = styled.div``;

const SAvatar = styled(Avatar)``;
interface IProps {
  usersBefore?: any;
  usersNow?: any;
  coffees?: any;
}

const AvatarGrid: React.SFC<IProps> = ({ usersBefore, usersNow, coffees }) => (
  <Grid>
    {usersBefore &&
      usersBefore.map(user => (
        <AvatarContainer key={user.id}>
          <Link to={`/${user.actor.profile.username}`}>
            <SAvatar size={"md"} url={user.actor.profile.avatar} />
          </Link>
        </AvatarContainer>
      ))}
    {usersNow &&
      usersNow.map(user => (
        <AvatarContainer key={user.id}>
          <Link to={`/${user.profile.username}`}>
            <SAvatar size={"md"} url={user.profile.avatar} />
          </Link>
        </AvatarContainer>
      ))}
    {coffees &&
      coffees.map(coffee => (
        <AvatarContainer key={coffee.id}>
          <Link to={`/c/${coffee.id}`}>
            <SAvatar size={"md"} url={coffee.host.profile.avatar} />
          </Link>
        </AvatarContainer>
      ))}
  </Grid>
);

export default AvatarGrid;
