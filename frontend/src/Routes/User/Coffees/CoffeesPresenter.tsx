import React from "react";
import { Link } from "react-router-dom";
import styled from "../../../Styles/typed-components";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import { BACKEND_URL } from "src/constants";

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

const InfoRow = styled.span``;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
`;

const CAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 300px;
  width: 300px;
  margin-right: 20px;
  @media screen and (max-width: 600px) {
    margin-right: 0px;
  }
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
  flex-direction: row;
  height: 50px;
  grid-template-columns: 3fr 1fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: grey;
  }
  border-bottom: 1px solid grey;
  &:not(:last-child) {
    border-bottom: 1px solid grey;
  }
`;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  userName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  coffeesList: any;
}

const CoffeesPresenter: React.FunctionComponent<IProps> = ({
  data: { getCoffees: { coffees = null } = {} } = {},
  loading,
  userName,
  onChange,
  search,
  coffeesList
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && coffees) {
    return (
      <SWrapper>
        <PHeader>
          <AvatarContainer>
            <CAvatar
              size="lg"
              url={
                "https://media.hojunara.com/wp-content/uploads/2015/01/%EC%BD%94%EC%95%8C%EB%9D%BC.jpg"
              }
            />
            <InfoRow>
              <SText text={String("undefined")} />
              Count
            </InfoRow>
          </AvatarContainer>
          <UserContainer>
            <UserNameRow>
              <Username>{userName} Coffees</Username>
              <Input
                autoFocus={true}
                placeholder={"Search"}
                onChange={onChange}
                value={search}
                autoComplete={"off"}
              />
            </UserNameRow>
            {coffeesList.length !== 0 &&
              coffeesList.map(coffee => (
                <UserRow key={coffee.uuid}>
                  <Link to={`/c/${coffee.uuid}`}>
                    <AvatarContainer>
                      <Avatar
                        size={"sm"}
                        url={`${BACKEND_URL}/media/${
                          coffee.host.profile.avatar.thumbnail
                        }`}
                      />
                      <HeaderColumn>
                        <CText text={coffee.host.username} />
                        <Explain>with same nationality</Explain>
                      </HeaderColumn>
                    </AvatarContainer>
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
                    <AvatarContainer>
                      <Avatar
                        size={"sm"}
                        url={`${BACKEND_URL}/media/${
                          coffee.host.profile.avatar.thumbnail
                        }`}
                      />
                      <HeaderColumn>
                        <CText text={coffee.host.username} />
                        <Explain>with same nationality</Explain>
                      </HeaderColumn>
                    </AvatarContainer>
                    <GreyText text={coffee.target} />
                    <GreyText text={coffee.expires} />
                  </Link>
                </UserRow>
              ))}
          </UserContainer>
        </PHeader>
      </SWrapper>
    );
  }
  return null;
};

export default CoffeesPresenter;
