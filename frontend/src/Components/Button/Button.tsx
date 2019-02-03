import React from "react";
import PropTypes from "prop-types";
import styled from "src/Styles/typed-components";

const SButton = styled.button`
  border: 0;
  padding: 7px 0px;
  color: white;
  background-color: ${props => props.theme.blueColor};
  opacity: ${props => (props.active ? 1 : 0.8)};
  font-weight: 600;
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
`;

const Button = ({ text, active, onClick }) => (
  <SButton active={active} onClick={onClick}>
    {text}
  </SButton>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
