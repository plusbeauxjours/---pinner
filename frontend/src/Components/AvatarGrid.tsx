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

const Target = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  font-size: 30px;
  font-weight: 200;
`;

const AvatarContainer = styled.div`
  display: flex;
  position: relative;
`;

const SAvatar = styled(Avatar)``;

interface IProps {
  usersBefore?: any;
  usersNow?: any;
  coffees?: any;
  toggleRequestModal?: () => void;
}

const AvatarGrid: React.SFC<IProps> = ({
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
            <Link
              to={{ pathname: `/c/${coffee.id}`, state: { modalOpen: true } }}
            >
              {(() => {
                switch (coffee.target) {
                  case "EVERYONE":
                    return (
                      <>
                        <Target>E</Target>
                        <SAvatar size={"md"} url={coffee.host.profile.avatar} />
                      </>
                    );
                  case "GENDER":
                    return (
                      <>
                        <Target>G</Target>
                        <SAvatar size={"md"} url={coffee.host.profile.avatar} />
                      </>
                    );
                  case "NATIONALITY":
                    return (
                      <>
                        <Target>N</Target>
                        <SAvatar size={"md"} url={coffee.host.profile.avatar} />
                      </>
                    );
                  default:
                    return null;
                }
              })()}
            </Link>
          </AvatarContainer>
        ))}
    </Grid>
  </>
);

export default AvatarGrid;
