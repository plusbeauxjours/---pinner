import React from "react";
import styled from "../Styles/typed-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { Upload } from "../Icons";
import { BACKEND_URL } from "src/constants";

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

const AvatarGrid: React.FunctionComponent<IProps> = ({
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
              <SAvatar
                size={"md"}
                url={`${BACKEND_URL}/media/${user.actor.profile.avatarUrl}`}
              />
            </Link>
          </AvatarContainer>
        ))}
      {usersNow &&
        usersNow.map(user => (
          <AvatarContainer key={user.id}>
            <Link to={`/${user.profile.username}`}>
              <SAvatar
                size={"md"}
                url={
                  user.profile.avatarUrl
                    ? `${BACKEND_URL}/media/${user.profile.avatarUrl}`
                    : "https://banner2.kisspng.com/20180613/vtt/kisspng-computer-icons-avatar-user-profile-icon-design-cli-5b2114b0368752.5561258815288946402234.jpg"
                }
              />
            </Link>
          </AvatarContainer>
        ))}
      {coffees &&
        coffees.map(coffee => (
          <AvatarContainer key={coffee.uuid}>
            <Link
              to={{ pathname: `/c/${coffee.uuid}`, state: { modalOpen: true } }}
            />
          </AvatarContainer>
        ))}
    </Grid>
  </>
);

export default AvatarGrid;
