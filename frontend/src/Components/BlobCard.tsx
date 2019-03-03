import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { HeartFilled, BubbleFilled } from "../Icons";

const BlobWrapper = styled.div`
  max-width: 160px;
  height: 160px;
  width: 160px;
  margin: 0 auto;
`;

const Blob = styled.div<ITheme>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  background: white;
  background-size: cover;
  border: 1px;
  border-radius: ${props => props.borderRadius};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
`;

const Caption = styled.div<ITheme>`
  z-index: 2;
  position: absolute;
  font: ${props => props.fontColor || "Roboto"};
  color: ${props => props.fontColor || "#2F5567"};
  font-size: ${props => props.fontSize || "20px"};
  font-weight: 200;
  text-align: center;
  text-transform: capitalize;
`;

const Overlay = styled.div<ITheme>`
  color: white;
  z-index: 4;
  opacity: 0;
  svg {
    fill: white;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.14);
  background-size: cover;
  border-radius: ${props => props.borderRadius};
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

interface ITheme {
  borderRadius?: string;
  bgColor?: string;
  font?: string;
  fontColor?: string;
  fontSize?: string;
}

interface IProps {
  id: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  borderRadius: string;
  bgColor: string;
  font: string;
  fontColor: string;
  fontSize: string;
  file?: string;
}

const BlobCard: React.SFC<IProps> = ({
  id,
  caption,
  commentCount,
  likeCount,
  borderRadius
}) => (
  <Link to={`/p/${id}`}>
    <BlobWrapper>
      <Blob borderRadius={borderRadius}>
        <Caption>{caption}</Caption>
        <Overlay borderRadius={borderRadius}>
          <Count>
            <HeartFilled />
            <CountNumber>{likeCount}</CountNumber>
          </Count>
          <Count>
            <BubbleFilled />
            <CountNumber>{commentCount}</CountNumber>
          </Count>
        </Overlay>
      </Blob>
    </BlobWrapper>
  </Link>
);

export default BlobCard;
