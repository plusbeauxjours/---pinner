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
  toggleModal?: () => void;
}

const Comment: React.SFC<IProps> = ({ username, comment, toggleModal }) => (
  <Container>
    <SBold text={username} />
    {comment}
    <GearContainer onClick={toggleModal}>
      <Gear />
    </GearContainer>
  </Container>
);

export default Comment;
