import React from "react";
import { Link } from "react-router-dom";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Bold from "../../Components/Bold";
// import AvatarGrid from "../../Components/AvatarGrid";
import UserHeader from "../../Components/UserHeader";
import CoffeeBtn from "src/Components/CoffeeBtn";
import Avatar from "../../Components/Avatar";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: flex;
  padding: 40px 15px 40px 15px;
  @media screen and (max-width: 600px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

// const GreyLine = styled.div`
//   margin-top: 10px;
//   margin-bottom: 10px;
//   border-bottom: 1px solid grey;
//   @media screen and (max-width: 935px) {
//     margin: 0 10px 0 10px;
//   }
// `;

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
    background-color: grey;
  }
  border-bottom: 1px solid grey;
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
`;

const Target = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  font-size: 20px;
  font-weight: 200;
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

const GreyText = styled(Bold)`
  color: #999;
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.bgColor};
  border-radius: 3px;
  padding: 5px;
  color: white;
  font-size: 12px;
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

interface IProps {
  coffeeData?: any;
  coffeeLoading: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  coffeesList: any;
}

const CoffeesPagePresenter: React.SFC<IProps> = ({
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
              <Input placeholder="Search" value={search} onChange={onChange} />
            </UserNameRow>
            {coffeesList.length !== 0 &&
              coffeesList.map(coffee => (
                <React.Fragment key={coffee.id}>
                  <Link to={`/c/${coffee.id}`}>
                    <UserRow>
                      <UserHeader
                        username={coffee.city.cityName}
                        currentCity={coffee.city.country.countryName}
                        avatar={coffee.host.profile.avatar}
                        size={"sm"}
                        type={"coffee"}
                        target={coffee.target}
                      />
                      <GreyText text={coffee.target} />
                      <GreyText text={coffee.expires} />
                    </UserRow>
                  </Link>
                </React.Fragment>
              ))}
            {coffeesList.length === 0 &&
              !search &&
              coffees &&
              coffees.map(coffee => {
                return (
                  <UserRow key={coffee.id}>
                    <Link to={`/c/${coffee.id}`}>
                      <AvatarContainer>
                        {(() => {
                          switch (coffee.target) {
                            case "EVERYONE":
                              return (
                                <>
                                  <Target>E</Target>
                                  <SAvatar
                                    size={"sm"}
                                    url={coffee.host.profile.avatar}
                                  />
                                </>
                              );
                            case "GENDER":
                              return (
                                <>
                                  <Target>G</Target>
                                  <SAvatar
                                    size={"sm"}
                                    url={coffee.host.profile.avatar}
                                  />
                                </>
                              );
                            case "NATIONALITY":
                              return (
                                <>
                                  <Target>N</Target>
                                  <SAvatar
                                    size={"sm"}
                                    url={coffee.host.profile.avatar}
                                  />
                                </>
                              );
                            case "FOLLOWERS":
                              return (
                                <>
                                  <Target>F</Target>
                                  <SAvatar
                                    size={"sm"}
                                    url={coffee.host.profile.avatar}
                                  />
                                </>
                              );
                            default:
                              return null;
                          }
                        })()}
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
                              case "FOLLOWERS":
                                return <Explain>with followers</Explain>;
                              default:
                                return null;
                            }
                          })()}
                        </HeaderColumn>
                      </AvatarContainer>
                    </Link>
                    <CoffeeBtn
                      coffeeId={coffee.id}
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
