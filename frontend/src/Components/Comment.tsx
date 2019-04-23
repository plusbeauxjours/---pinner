import React from "react";
import styled from "styled-components";
import Bold from "./Bold";
import { Delete } from "../Icons";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Front = styled.span``;

const Back = styled.span`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-left: 15px;
  cursor: pointer;
  svg {
    fill: white;
  }
`;

const SBold = styled(Bold)`
  margin-right: 5px;
`;

const TimeStamp = styled.span`
  text-transform: uppercase;
  font-size: 10px;
  line-height: 18px;
  display: block;
  color: white;
`;

interface IProps {
  id?: number;
  username: string;
  comment: string;
  getCommentId?: any;
  onClick?: any;
  naturalTime?: string;
}

const Comment: React.SFC<IProps> = ({
  id,
  username,
  comment,
  getCommentId,
  naturalTime
}) => (
  <Container>
    <Front>
      <SBold text={username} />
      {comment}
    </Front>
    <Back>
      {naturalTime && <TimeStamp>{naturalTime}</TimeStamp>}
      <Icon onClick={() => getCommentId(id)}>
        <Delete />
      </Icon>
    </Back>
  </Container>
);

export default Comment;
