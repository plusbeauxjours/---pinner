import React from "react";
import { Link } from "react-router-dom";
import styled from "../../../Styles/typed-components";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Bold from "../../../Components/Bold";
import CoffeeBtn from "src/Components/CoffeeBtn";
import Avatar from "../../../Components/Avatar";
import { BACKEND_URL } from "src/constants";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const PHeader = styled.header`
  display: flex;
  margin-top: 30px;
  @media screen and (max-width: 600px) {
    padding: 0 15px 0 15px;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const UserContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    min-width: 300px;
  }
`;

const UserRow = styled.div`
  display: grid;
  height: 50px;
  grid-template-columns: 4fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgba(128, 128, 128, 0.5);
  }
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  &:last-child {
    margin-bottom: 15px;
  }
`;

const CText = styled(Bold)`
  display: flex;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  position: block;
  font-size: 12px;
  font-weight: 200;
`;

const Explain = styled(Location)`
  color: grey;
`;

const AvatarContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const SAvatar = styled(Avatar)``;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  color: white;
  font-size: 12px;
  font-weight: 100;
  &:focus {
    outline: none;
    &::-webkit-input-placeholder {
      color: transparent;
    }
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    text-align: right;
  }
`;

interface IProps {
  coffeeData?: any;
  coffeeLoading: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  coffeesList: any;
}

const CoffeesPagePresenter: React.FunctionComponent<IProps> = ({
  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,
  onChange,
  search,
  coffeesList
}) => {
  if (coffeeLoading) {
    return <Loader />;
  } else if (!coffeeLoading && coffees) {
    return (
      <SWrapper>
        <PHeader>
          <UserContainer>
            <UserNameRow>
              <Username>NEED SOME COFFEE NOW</Username>
              <Input
                placeholder="Search users who wants coffee"
                value={search}
                onChange={onChange}
              />
            </UserNameRow>
            {coffeesList.length !== 0 &&
              coffeesList.map(coffee => {
                return (
                  <UserRow key={coffee.uuid}>
                    <Link to={`/c/${coffee.uuid}`}>
                      <AvatarContainer>
                        <SAvatar
                          size={"sm"}
                          url={`${BACKEND_URL}/media/${
                            coffee.host.profile.avatar.thumbnail
                          }`}
                        />
                        <HeaderColumn>
                          <CText text={coffee.host.username} />
                          {(() => {
                            switch (coffee.target) {
                              case "EVERYONE":
                                return <Explain>with Someone</Explain>;
                              case "GENDER":
                                return <Explain>with same gender</Explain>;
                              case "NATIONALITY":
                                return <Explain>with same nationality</Explain>;
                              default:
                                return null;
                            }
                          })()}
                        </HeaderColumn>
                      </AvatarContainer>
                    </Link>
                    <CoffeeBtn
                      coffeeId={coffee.uuid}
                      isMatching={coffee.isMatching}
                      isSelf={coffee.host.profile.isSelf}
                    />
                  </UserRow>
                );
              })}
            {coffeesList.length === 0 &&
              !search &&
              coffees &&
              coffees.map(coffee => {
                return (
                  <UserRow key={coffee.uuid}>
                    <Link to={`/c/${coffee.uuid}`}>
                      <AvatarContainer>
                        <SAvatar
                          size={"sm"}
                          url={`${BACKEND_URL}/media/${
                            coffee.host.profile.avatar.thumbnail
                          }`}
                        />
                        <HeaderColumn>
                          <CText text={coffee.host.username} />
                          {(() => {
                            switch (coffee.target) {
                              case "EVERYONE":
                                return <Explain>with Someone</Explain>;
                              case "GENDER":
                                return <Explain>with same gender</Explain>;
                              case "NATIONALITY":
                                return <Explain>with same nationality</Explain>;
                              default:
                                return null;
                            }
                          })()}
                        </HeaderColumn>
                      </AvatarContainer>
                    </Link>
                    <CoffeeBtn
                      coffeeId={coffee.uuid}
                      isMatching={coffee.isMatching}
                      isSelf={coffee.host.profile.isSelf}
                    />
                  </UserRow>
                );
              })}
          </UserContainer>
        </PHeader>
      </SWrapper>
    );
  }
  return null;
};

export default CoffeesPagePresenter;
