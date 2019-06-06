import React from "react";
import styled from "src/Styles/typed-components";
import UserHeader from "./UserHeader";
import Bold from "../Components/Bold";

import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #2d3a41;
  width: 100%;
  border-radius: 3px;
  border: ${props => props.theme.boxBorder};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 10px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #e6e6e6;
  }
`;

const UBold = styled(Bold)`
  font-weight: 100;
  font-size: 7px;
`;

interface IProps {
  id: string;
  avatar: string;
  username: string;
  currentCity: string;
  currentCountry: string;
  isFollowing?: boolean;
  isSelf?: boolean;
  size: string;
  target?: string;
}

const CoffeeRow: React.SFC<IProps> = ({
  id,
  avatar,
  username,
  currentCity,
  currentCountry,
  isSelf,
  isFollowing,
  target
}) => {
  return (
    <>
      <Link to={`/c/${id}`}>
        <Container>
          <UserHeader
            username={username}
            currentCity={currentCity}
            currentCountry={currentCountry}
            avatar={avatar}
            size={"sm"}
          />
          <UBold text={target} />
        </Container>
      </Link>
    </>
  );
};
export default CoffeeRow;
