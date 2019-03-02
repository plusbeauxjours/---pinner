import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { HeartFilled, BubbleFilled } from "../../Icons";

const BlobWrapper = styled.div`
  max-width: 400px;
  height: 250px;
  width: 250px;

  margin: 0 auto;
`;

const Blob = styled.div<IProps>`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  background: #87e3ad;
  background-size: cover;
  border-radius: ${props => props.borderRadius};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
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
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  background-size: cover;
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
  file?: string;
  commentCount?: number;
  likeCount?: number;
  borderRadius: string;
}

const BlobCardPresenter: React.SFC<IProps> = ({
  id,
  commentCount,
  likeCount,
  borderRadius
}) => (
  <Link to={`/p/${id}`}>
    <BlobWrapper>
      <Blob borderRadius={borderRadius}>
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
      </Blob>
    </BlobWrapper>
  </Link>
);

export default BlobCardPresenter;
