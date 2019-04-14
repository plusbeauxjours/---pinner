import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Profile, HeartEmpty, Compass } from "../../Icons";
// import { Compass } from "../../Icons";

import Wrapper from "../Wrapper";
import Me from "../Me";

const Header = styled.header`
  background-color: white;
  height: 55px;
  width: 100%;
  border: ${props => props.theme.boxBorder};
  border-top: none;
  position: fixed;
  top: 0;
  z-index: 10;
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
  color: white;
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
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M12.02 0c6.614.011 11.98 5.383 11.98 12 0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12 0-6.617 5.367-11.989 11.981-12h.039zm3.694 16h-7.427c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771 3.669-.76 6.671-3.35 8.008-6.771m-14.974 0h-5.524c1.338 3.421 4.34 6.011 8.009 6.771-1.164-1.369-2.059-3.786-2.485-6.771m-.123-7h-5.736c-.331 1.166-.741 3.389 0 6h5.736c-.188-1.814-.215-3.925 0-6m8.691 0h-7.685c-.195 1.8-.225 3.927 0 6h7.685c.196-1.811.224-3.93 0-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736c.741-2.612.331-4.835 0-6m-12.825-7.771c-3.669.76-6.671 3.35-8.009 6.771h5.524c.426-2.985 1.321-5.403 2.485-6.771m5.954 6.771c-.639-4.266-2.242-7-3.714-7-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771c1.164 1.368 2.059 3.786 2.485 6.771h5.523c-1.337-3.421-4.339-6.011-8.008-6.771" />
          </svg>
        </Link>
      </Column>
      <Icon>
        <Link to="/match">
          <Compass />
        </Link>
      </Icon>
      <Column>
        <form onSubmit={onSubmit}>
          <Input placeholder="Search" value={search} onChange={onChange} />
        </form>
      </Column>
      <Column>
        <Icon>
          <Link to="/notification">
            <HeartEmpty />
          </Link>
        </Icon>
        <Icon>
          <Me>
            {user => (
              <Link to={`/${user ? user.username : ""}`}>
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
