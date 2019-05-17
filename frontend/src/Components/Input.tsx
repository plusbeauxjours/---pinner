import React from "react";
import styled from "../Styles/typed-components";

const Container = styled.input`
  border: none;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  background-color: ${props => props.theme.whiteColor};
  border-radius: 3px;
  padding: 12.5px 10px;
  width: 100%;
  font-size: 12px;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    outline: none;
    border-bottom-color: #2c3e50;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

interface IProps {
  value?: string;
  placeholder?: string;
  type?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  onKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  autoFocus?: boolean;
}

const Input: React.SFC<IProps> = ({
  value,
  placeholder = "",
  type = "text",
  name = "",
  onChange,
  className,
  required = true,
  onKeyUp,
  autoFocus
}) => (
  <Container
    autoFocus={autoFocus}
    value={value}
    placeholder={placeholder}
    type={type}
    onChange={onChange}
    name={name}
    className={className}
    required={required}
    onKeyUp={onKeyUp}
  />
);

export default Input;
