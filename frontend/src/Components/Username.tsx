import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
const Container = styled.span`
  font-weight: 600;
`;

interface IProps {
  username: string;
  className?: string;
}

const Username: React.SFC<IProps> = ({ username, className }) => (
  <Container className={className}>{username}</Container>
);

Username.propTypes = {
  username: PropTypes.string.isRequired
};

export default Username;
