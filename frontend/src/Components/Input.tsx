import React from "react";
import styled from "../Styles/typed-components";

const Container = styled.input`
  border: none;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.bgColor};
  border-radius: 3px;
  padding: 12.5px 10px;
  width: 100%;
  font-size: 12px;
  &:focus {
    outline: none;
    border-color: #b2b2b2;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

interface IProps {
  value: string;
  placeholder: string;
  type?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
}

const Input: React.SFC<IProps> = ({
  value,
  placeholder = "",
  type = "text",
  name = "",
  onChange,
  className,
  required = true
}) => (
  <Container
    value={value}
    placeholder={placeholder}
    type={type}
    onChange={onChange}
    name={name}
    className={className}
    required={required}
  />
);

export default Input;
