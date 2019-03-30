import React from "react";
import styled from "styled-components";
import Bold from "./Bold";
import { Gear } from "../Icons";

const Container = styled.div`
  margin-bottom: 7px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const GearContainer = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const SBold = styled(Bold)`
  margin-right: 5px;
`;

interface IProps {
  id?: number;
  username: string;
  comment: string;
  getCommentId?: any;
  onClick?: any;
}

const Comment: React.SFC<IProps> = ({
  id,
  username,
  comment,
  getCommentId
}) => (
  <Container>
    <SBold text={username} />
    {comment}
    <GearContainer onClick={() => getCommentId(id)}>
      <Gear />
    </GearContainer>
  </Container>
);

export default Comment;
