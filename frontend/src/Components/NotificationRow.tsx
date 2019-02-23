import React from "react";
import styled from "src/Styles/typed-components";

const Container = styled.div``;

const TimeStamp = styled.span`
  text-transform: uppercase;
  font-size: 10px;
  line-height: 18px;
  margin-top: 10px;
  display: block;
  color: ${props => props.theme.greyColor};
`;

interface IProps {
  className?: any;
  id: string;
  key: string;
  createdAt: string;
}
const NotificationRow: React.SFC<IProps> = ({ id, key, createdAt }) => (
  <Container>
    <TimeStamp>{createdAt}</TimeStamp>
  </Container>
);

export default NotificationRow;
