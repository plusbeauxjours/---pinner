import React from "react";
import styled from "styled-components";
import { HeartFilled, BubbleFilled } from "../Icons";
import { Link } from "react-router-dom";
import Bold from "./Bold";

const Square = styled.div<{ bg: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.whiteColor};
  background-position: cover;
  background-size: 100%;
`;

const Overlay = styled.div`
  color: white;
  z-index: 1;
  opacity: 0;
  svg {
    fill: white;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

const Count = styled.div`
  display: flex;
  align-items: center;
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
  z-index: 5;
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
    <Square bg={file}>
      <Caption text={caption} />
      <Overlay>
        <Count>
          <HeartFilled />
          <CountNumber>{likeCount}</CountNumber>
        </Count>
        <Count>
          <BubbleFilled />
          <CountNumber>{commentCount}</CountNumber>
        </Count>
      </Overlay>
    </Square>
  </Link>
);

export default SquareCard;
