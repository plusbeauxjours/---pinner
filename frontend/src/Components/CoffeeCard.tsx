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
  position: absolute;
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
  position: relative;
`;

const Tips = styled.div`
  display: flex;
  position: relative;
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
  margin-top: 10px;
  margin-bottom: 15px;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const SText = styled(Bold)`
  margin-bottom: 3px;
  display: flex;
  justify-content: center;
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
  naturalTime: string;
  isSelf?: boolean;
  status: string;
  toggleCoffeeReportModal?: () => void;
  type?: string;
  getCoffeeId?: any;
  getRequestingCoffeeId?: any;
}

const CoffeeCard: React.SFC<IProps> = ({
  id,
  avatar,
  username,
  target,
  expires,
  naturalTime,
  isSelf,
  status,
  toggleCoffeeReportModal,
  type,
  getCoffeeId,
  getRequestingCoffeeId
}) => {
  return (
    <>
      {(() => {
        switch (type) {
          case "myRequestingCoffee":
            return (
              <Container>
                <Tips>
                  <ListOverlay onClick={() => getRequestingCoffeeId(id)}>
                    <List />
                  </ListOverlay>
                  <Link to={`/c/${id}`}>
                    <Icon>
                      <LoaderData />
                    </Icon>
                    <Location>{id}</Location>
                    <SText text={username} />
                    <Location>{target}</Location>
                    <Location>{naturalTime}</Location>
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
                    {(() => {
                      switch (target) {
                        case "EVERYONE":
                          return (
                            <>
                              <Icon>E</Icon>
                            </>
                          );
                        case "GENDER":
                          return (
                            <>
                              <Icon>G</Icon>
                            </>
                          );
                        case "NATIONALITY":
                          return (
                            <>
                              <Icon>N</Icon>
                            </>
                          );
                        case "FOLLOWERS":
                          return (
                            <>
                              <Icon>F</Icon>
                            </>
                          );
                        default:
                          return null;
                      }
                    })()}
                    <Location>{id}</Location>
                    <SText text={username} />
                    <Location>{target}</Location>
                    <Location>{expires}</Location>
                  </Link>
                </Tips>
              </Container>
            );
          case "reportCoffees":
            return (
              <Container>
                <Tips>
                  {!isSelf && (
                    <ListOverlay onClick={toggleCoffeeReportModal}>
                      <List />
                    </ListOverlay>
                  )}
                  <Link to={`/c/${id}`}>
                    <SAvatar url={avatar} size="md" />
                    <SText text={username} />
                    <Location>
                      {target}
                      {id}
                    </Location>
                    <Location>{naturalTime}</Location>
                  </Link>
                </Tips>
              </Container>
            );
          default:
            return null;
        }
      })()}
    </>
  );
};

export default CoffeeCard;
