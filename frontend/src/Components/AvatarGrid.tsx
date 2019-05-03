import React from "react";
import styled from "../Styles/typed-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { Upload } from "../Icons";

const Grid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(50px, 50px));
  grid-gap: 15px;
  padding: 20px;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-items: center;
  svg {
    fill: white;
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: grey;
    }
  }
`;

const AvatarContainer = styled.div``;

const SAvatar = styled(Avatar)``;
interface IProps {
  knowingFollowers?: any;
  usersBefore?: any;
  usersNow?: any;
  coffees?: any;
  toggleRequestModal?: () => void;
}

const AvatarGrid: React.SFC<IProps> = ({
  knowingFollowers,
  usersBefore,
  usersNow,
  coffees,
  toggleRequestModal
}) => (
  <>
    <Grid>
      {toggleRequestModal && (
        <Icon onClick={toggleRequestModal}>
          <Upload />
        </Icon>
      )}
      {knowingFollowers &&
        knowingFollowers.map(knowingFollower => (
          <AvatarContainer key={knowingFollower.id}>
            <Link to={`/${knowingFollower.username}`}>
              <SAvatar size={"md"} url={knowingFollower.avatar} />
            </Link>
          </AvatarContainer>
        ))}
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
  </>
);

export default AvatarGrid;
