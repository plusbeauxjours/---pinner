import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Profile, HeartEmpty, Compass, SearchIcon } from "../../Icons";

import Wrapper from "../Wrapper";
import Me from "../Me";
import { RouteComponentProps, withRouter } from "react-router";
import Search from "../Search/";
import { keyframes } from "styled-components";

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

const Icon = styled.span`
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
`;

const ModalAnimation = keyframes`
	  from{
	    opacity:0;
	    transform:scale(1.1);
	  }
	  to{
	    opacity:1;
	    transform:none;
	  }
  `;

const ModalContainer = styled.div`
  z-index: 8;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

const Modal = styled.div`
  top: 30%;
  width: 30%;
  z-index: 10;
  position: absolute;
  margin-top: 80px;
  animation: ${ModalAnimation} 0.1s linear;
`;

const Input = styled.input`
  z-index: 10;
  top: 30%;
  width: 30%;
  border: 0;
  position: absolute;
  display: flex;
  align-self: center;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  padding: 5px;
  color: white;
  background-color: transparent;
  font-size: 34px;
  font-weight: 100;
  transition: border-bottom 0.1s linear;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
  animation: ${ModalAnimation} 0.1s linear;
`;

interface IProps extends RouteComponentProps<any> {
  currentLat: number;
  currentLng: number;
  currentCity: string;
  modalOpen: boolean;
  search: string;
  toggleModal: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeaderPresenter: React.SFC<IProps> = ({
  currentLat,
  currentLng,
  currentCity,
  modalOpen,
  search,
  toggleModal,
  onChange
}) => (
  <Header>
    {modalOpen && (
      <ModalContainer>
        <ModalOverlay onClick={toggleModal} />
        <Input
          autoFocus={true}
          placeholder="Search"
          value={search}
          onChange={onChange}
        />
        <Modal>
          <Search search={search} />
        </Modal>
      </ModalContainer>
    )}
    <SWrapper>
      <Column>
        <Link
          to={{
            pathname: "/",
            state: {
              currentLat,
              currentLng,
              currentCity
            }
          }}
        >
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

      <Icon onClick={toggleModal}>
        <SearchIcon />
      </Icon>
      <Column>
        <Icon>
          <Link to="/notification">
            <HeartEmpty />
          </Link>
        </Icon>
        <Icon>
          <Me>
            {user => (
              <Link
                to={{
                  pathname: `/${user ? user.username : ""}`,
                  state: {
                    currentLat,
                    currentLng,
                    currentCity
                  }
                }}
              >
                <Profile />
              </Link>
            )}
          </Me>
        </Icon>
      </Column>
    </SWrapper>
  </Header>
);

export default withRouter(HeaderPresenter);
