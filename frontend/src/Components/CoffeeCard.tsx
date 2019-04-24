import React from "react";
import styled from "src/Styles/typed-components";
import Avatar from "./Avatar";
import Bold from "./Bold";
import { List } from "../Icons";
import { Link } from "react-router-dom";
import LoaderData from "./LoaderData";

const ListOverlay = styled.div`
  z-index: 1;
  opacity: 0;
  display: flex;
  align-self: flex-end;
  cursor: pointer;
  svg {
    fill: white;
    transition: fill 0.3s ease-in-out;
    &:hover {
      fill: red;
    }
  }
  transition: opacity 0.3s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${props => props.theme.headerColor};
  width: 170px;
  height: 200px;
  padding: 10px;
  margin-right: 5px;
  margin-bottom: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    ${ListOverlay} {
      opacity: 1;
    }
  }
`;

const SAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  height: 120px;
`;

const SBold = styled(Bold)`
  margin-bottom: 3px;
  display: block;
`;

const Id = styled.div`
  color: red
  position: absolute;
  font-size: 20px;
`;
const Location = styled.span`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 200;
`;

interface IProps {
  id: string;
  avatar?: string;
  username: string;
  isFollowing: boolean;
  currentCity: string;
  currentCountry: string;
  target: string;
  expires: string;
  isSelf: boolean;
  status: string;
  requestingCoffees: boolean;
  followersModalOpen?: boolean;
  toggleFollowersModal?: () => void;
}

const CoffeeCard: React.SFC<IProps> = ({
  id,
  avatar,
  username,
  target,
  expires,
  isSelf,
  status,
  requestingCoffees,
  followersModalOpen,
  toggleFollowersModal
}) => {
  return (
    <>
      {requestingCoffees ? (
        <Link to={`/c/${id}`}>
          <Container>
            <Icon>
              <LoaderData />
            </Icon>

            <Location>{id}</Location>
            <SBold text={username} />
            <Location>{target}</Location>
            <Location>{expires}</Location>
          </Container>
        </Link>
      ) : (
        // <Link to={`/c/${id}`}>
        //   <Container>
        //     <Location>{id}</Location>
        //     <SBold text={username} />
        //     <Location>{target}</Location>
        //     <Location>{expires}</Location>
        //   </Container>
        // </Link>
        <Link to={`/c/${id}`}>
          <Container>
            <ListOverlay>
              <List />
            </ListOverlay>
            <SAvatar url={avatar} size="md" />
            <Id>{id}</Id>
            <SBold text={username} />
            <Location>{target}</Location>
            <Location>{expires}</Location>
          </Container>
        </Link>
      )}
    </>
  );
};

export default CoffeeCard;
