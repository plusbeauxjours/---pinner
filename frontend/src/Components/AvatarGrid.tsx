import React from "react";
import styled from "../Styles/typed-components";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
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
    fill: ${props => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: ${props => props.theme.hoverColor};
    }
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  position: relative;
`;

const SAvatar = styled(Avatar)``;

interface IProps extends RouteComponentProps<any> {
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
              <SAvatar size={"md"} url={user.actor.profile.avatarUrl} />
            </Link>
          </AvatarContainer>
        ))}
      {usersNow &&
        usersNow.map(user => (
          <AvatarContainer key={user.id}>
            <Link to={`/${user.profile.username}`}>
              <SAvatar size={"md"} url={user.profile.avatarUrl} />
            </Link>
          </AvatarContainer>
        ))}
      {coffees &&
        coffees.map(coffee => (
          <AvatarContainer key={coffee.uuid}>
            {console.log(location)}
            <Link
              to={{
                pathname: `/c/${coffee.uuid}`,
                state: { from: location.pathname, coffeeModalOpen: true }
              }}
            />
          </AvatarContainer>
        ))}
    </Grid>
  </>
);

export default withRouter(AvatarGrid);
