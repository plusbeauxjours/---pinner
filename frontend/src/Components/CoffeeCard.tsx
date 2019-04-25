import React from "react";
import styled from "src/Styles/typed-components";
import Avatar from "./Avatar";
import Bold from "./Bold";
import { List } from "../Icons";
import { Link } from "react-router-dom";
import LoaderData from "./LoaderData";

const ListOverlay = styled.div`
  margin: 10px 10px 0 0;
  z-index: 10;
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
  border: 1px solid ${props => props.theme.headerColor};
  margin-right: 5px;
  margin-bottom: 25px;
`;

const Tips = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 170px;
  height: 200px;

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
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  width: 170px;
  height: 100px;
`;

const SBold = styled(Bold)`
  margin-bottom: 3px;
  display: block;
`;

const Id = styled.div`
  color: red;
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
  isSelf?: boolean;
  status: string;
  requestingCoffees: boolean;
  toggleCoffeeModal: () => void;
  toggleCoffeeReportModal?: () => void;
  type?: string;
  getCoffeeId?: any;
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
  toggleCoffeeModal,
  toggleCoffeeReportModal,
  type,
  getCoffeeId
}) => {
  return (
    <>
      {(() => {
        switch (type) {
          case "requestingCoffee":
            return (
              <Container>
                <Tips>
                  <ListOverlay onClick={() => getCoffeeId(id)}>
                    <List />
                  </ListOverlay>
                  <Link to={`/c/${id}`}>
                    <Icon>
                      <LoaderData />
                    </Icon>
                    <Location>{id}</Location>
                    <SBold text={username} />
                    <Location>{target}</Location>
                    <Location>{expires}</Location>
                  </Link>
                </Tips>
              </Container>
            );
          case "myCoffees":
            return (
              <Container>
                <Tips>
                  <ListOverlay onClick={() => getCoffeeId(id)}>
                    <List />
                  </ListOverlay>
                  <Link to={`/c/${id}`}>
                    <Location>{id}</Location>
                    <SBold text={username} />
                    <Location>{target}</Location>
                    <Location>{expires}</Location>
                  </Link>
                </Tips>
              </Container>
            );
          default:
            return (
              <Container>
                <Tips>
                  {isSelf ? (
                    <ListOverlay onClick={() => getCoffeeId(id)}>
                      <List />
                    </ListOverlay>
                  ) : (
                    <ListOverlay onClick={toggleCoffeeReportModal}>
                      <List />
                    </ListOverlay>
                  )}
                  <Link to={`/c/${id}`}>
                    <SAvatar url={avatar} size="md" />
                    <Id>{id}</Id>
                    <SBold text={username} />
                    <Location>{target}</Location>
                    <Location>{expires}</Location>
                  </Link>
                </Tips>
              </Container>
            );
        }
      })()}
    </>
  );
};

export default CoffeeCard;
