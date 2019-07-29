import React from "react";
import { Link } from "react-router-dom";
import styled from "../../../Styles/typed-components";

import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import { keyframes } from "styled-components";

const ModalContainer = styled.div`
  z-index: 101;
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
  z-index: 100;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.modalOverlayColor};
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

const InputContainer = styled.div`
  z-index: 110;
  top: 30%;
  width: 400px;
  border: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const SearchCitiesInput = styled.input`
  z-index: 110;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  padding: 5px;
  color: ${props => props.theme.color};
  background-color: transparent;
  font-size: 12px;
  font-weight: 100;
  transition: border-bottom 0.1s linear;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
  animation: ${ModalAnimation} 0.1s linear;
  margin-top: 20px;
  font-size: 34px;
`;

const Modal = styled.div`
  z-index: 101;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  animation: ${ModalAnimation} 0.1s linear;
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 5fr 1fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  &:not(:last-child) {
    border-bottom:  1px solid ${props => props.theme.borderColor};
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const GreyText = styled(Bold)`
  color: ${props => props.theme.greyColor};;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  position: block;
  font-size: 12px;
  font-weight: 200;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const CText = styled(Bold)`
  display: flex;
`;

const Explain = styled(Location)`
  color: grey;
`;

interface IProps {
  data?: any;
  loading: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  coffeesList: any;
  back: (event: any) => void;
}

const CoffeesPresenter: React.FunctionComponent<IProps> = ({
  data: { getCoffees: { coffees = null } = {} } = {},
  loading,
  onChange,
  search,
  coffeesList,
  back
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && coffees) {
    return (
      <ModalContainer>
        <ModalOverlay onClick={back} />
        <InputContainer>
          <SearchCitiesInput
            autoFocus={true}
            placeholder={"Search a City"}
            onChange={onChange}
            value={search}
            autoComplete={"off"}
          />
          <Modal>
            {coffeesList.length !== 0 &&
              coffeesList &&
              coffeesList.map(coffee => (
                <UserRow key={coffee.uuid}>
                  <Link to={`/c/${coffee.uuid}`}>
                    <Header>
                      <SAvatar
                        size={"sm"}
                        url={coffee.host.profile.avatarUrl}
                      />
                      <HeaderColumn>
                        <CText text={coffee.host.username} />
                        <Explain>with same nationality</Explain>
                      </HeaderColumn>
                    </Header>
                    <GreyText text={coffee.target} />
                    <GreyText text={coffee.expires} />
                  </Link>
                </UserRow>
              ))}
            {coffeesList.length === 0 &&
              !search &&
              coffees &&
              coffees.map(coffee => (
                <UserRow key={coffee.uuid}>
                  <Link to={`/c/${coffee.uuid}`}>
                    <Header>
                      <SAvatar
                        size={"sm"}
                        url={coffee.host.profile.avatarUrl}
                      />
                      <HeaderColumn>
                        <CText text={coffee.host.username} />
                        <Explain>with same nationality</Explain>
                      </HeaderColumn>
                    </Header>
                    <GreyText text={coffee.target} />
                    <GreyText text={coffee.expires} />
                  </Link>
                </UserRow>
              ))}
          </Modal>
        </InputContainer>
      </ModalContainer>
    );
  }
  return null;
};

export default CoffeesPresenter;
