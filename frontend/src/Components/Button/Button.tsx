import React from "react";
import styled from "src/Styles/typed-components";

const SButton = styled.button`
  border: 0;
  padding: 7px 0px;
  color: white;
  background-color: ${props => props.theme.blueColor};
  font-weight: 600;
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

interface IProps {
  text: string;
  onClick: any;
}

const Button: React.SFC<IProps> = ({ text, onClick }) => (
  <SButton onClick={onClick}>{text}</SButton>
);

export default Button;
