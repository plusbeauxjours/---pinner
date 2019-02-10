import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import { Profile, Compass, HeartEmpty } from "../../Icons";
import Me from "../Me";

const Header = styled.header`
  background-color: white;
  height: 75px;
  border: ${props => props.theme.boxBorder};
  border-top: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const SWrapper = styled(Wrapper)`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

const Column = styled.div`
  width: 33%;
  &:first-child {
    margin-right: auto;
  }
  &:last-child {
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
  }
  &:nth-child(2) {
    display: flex;
    justify-content: center;
  }
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.bgColor};
  border-radius: 3px;
  padding: 5px;
  font-size: 14px;
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

const Icon = styled.span`
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
`;
interface IProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}
const HeaderPresenter: React.SFC<IProps> = ({ onSubmit, onChange, search }) => (
  <Header>
    <SWrapper>
      <Column>
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </Link>
      </Column>
      <Column>
        <form onSubmit={onSubmit}>
          <Input placeholder="Search" value={search} onChange={onChange} />
        </form>
      </Column>
      <Column>
        <Icon>
          <Link to="/explore">
            <Compass />
          </Link>
        </Icon>
        <Icon>
          <Link to="#">
            <HeartEmpty />
          </Link>
        </Icon>
        <Icon>
          <Me>
            {me => (
              <Link to={`/${me ? me.user.username : ""}`}>
                <Profile />
              </Link>
            )}
          </Me>
        </Icon>
      </Column>
    </SWrapper>
  </Header>
);

export default HeaderPresenter;
