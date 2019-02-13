import React from "react";
import styled from "styled-components";
import { HeartFilled, BubbleFilled } from "../Icons";
import { Link } from "react-router-dom";

const Square = styled.div<IProps>`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.bg});
  background-position: cover;
  background-size: 100%;
`;

const Overlay = styled.div`
  color: white;
  opacity: 0;
  svg {
    fill: white;
  }
  display: flex;
  align-items: center;
  justify-content: center;
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

interface IProps {
  id?: string;
  files?: any;
  bg?: string;
  commentCount?: number;
  likeCount?: number;
}

const SquareCard: React.SFC<IProps> = ({
  id,
  files,
  commentCount,
  likeCount
}) => (
  <Link to={`/p/${id}`}>
    <Square bg={files[0].url}>
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
