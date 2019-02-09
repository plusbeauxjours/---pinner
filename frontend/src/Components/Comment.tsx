import React from "react";
import styled from "styled-components";
import Bold from "./Bold";

const Container = styled.div`
  margin-bottom: 7px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SBold = styled(Bold)`
  margin-right: 5px;
`;

interface IProps {
  id?: number;
  username: string;
  comment: string;
}

const Comment: React.SFC<IProps> = ({ id, username, comment }) => (
  <Container>
    <SBold text={username} />
    {comment}
  </Container>
);

export default Comment;
