import React from "react";
import styled from "styled-components";
import { HeartFilled, BubbleFilled } from "../Icons";
import { Link } from "react-router-dom";
import { List } from "../Icons";
import Bold from "./Bold";
import { BACKEND_URL } from "../constants";

const Square = styled.div<{ bg: string }>`
  display: flex;
  justify-content: center;
  align-self: center;
  height: 100%;
  width: 100%;
  background-image: url(${props => props.bg});
  background-position: cover;
  background-size: 100%;
`;

const ListOverlay = styled.div`
  padding: 10px;
  z-index: 0;
  opacity: 0;
  display: flex;

  position: absolute;
  align-self: flex-start;
  justify-self: flex-end;
  cursor: pointer;
  svg {
    fill: white;
    transition: fill 0.3s ease-in-out;
    &:hover {
      fill: red;
    }
  }
  transition: opacity 0.1s ease-in-out;
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 0;
  opacity: 0;
  svg {
    fill: white;
  }
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
  &:hover {
    opacity: 1;
    ${ListOverlay} {
      opacity: 1;
    }
  }
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  &:first-child {
    margin-right: 40px;
  }
`;

const CountNumber = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
`;

const Caption = styled(Bold)`
  position: absolute;
  display: flex;
  align-self: center;
  justify-self: center;
  z-index: 0;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
  color: grey;
`;

interface IProps {
  id?: string;
  file?: string;
  caption: string;
  commentCount?: number;
  likeCount?: number;
}

const SquareCard: React.SFC<IProps> = ({
  id,
  file,
  caption,
  commentCount,
  likeCount
}) => (
  <Link to={`/p/${id}`}>
    <Square bg={`${BACKEND_URL}/media/${file}`}>
      <Caption text={caption} />
      <Overlay>
        <ListOverlay>
          <List />
        </ListOverlay>
        <Count>
          <HeartFilled />
          <CountNumber>{likeCount}</CountNumber>
          <BubbleFilled />
          <CountNumber>{commentCount}</CountNumber>
        </Count>
      </Overlay>
    </Square>
  </Link>
);

export default SquareCard;
