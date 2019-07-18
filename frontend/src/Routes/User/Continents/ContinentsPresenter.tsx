import React from "react";
import styled from "../../../Styles/typed-components";
import { Link } from "react-router-dom";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";

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

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
  @media screen and (max-width: 935px) {
    margin: 0 10px 0 10px;
  }
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 5fr 1fr 1fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: grey;
  }
  &:not(:last-child) {
    border-bottom: 1px solid grey;
  }
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

const Header = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const GreyText = styled(Bold)`
  color: #999;
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border-bottom: 1px solid grey;
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
  data?: any;
  loading: boolean;
  userName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  continentList: any;
}

const ContinentsPresenter: React.FunctionComponent<IProps> = ({
  data: { topContinents: { continents = null } = {} } = {},
  loading,
  userName,
  onChange,
  search,
  continentList
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && continents) {
    return (
      <>
        <SWrapper>
          <PHeader>
            <AvatarContainer>
              <CAvatar
                size="lg"
                url={
                  "http://playwares.com/files/attach/images/23503529/733/482/043/c64e3f04515122d1aee2879590ee250c.jpg"
                }
              />
              total km
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <Username>{userName} Continents</Username>
                <Input
                  placeholder="Seardddch"
                  value={search}
                  onChange={onChange}
                />
              </UserNameRow>
              {continentList.length !== 0 &&
                continentList &&
                continentList.map(continent => (
                  <UserRow key={continent.id}>
                    <Link to={`/continent/${continent.continentCode}`}>
                      <Header>
                        <SAvatar size={"sm"} url={continent.continentPhoto} />
                        <HeaderColumn>
                          <HeaderText text={continent.continentName} />
                        </HeaderColumn>
                      </Header>
                    </Link>
                    <GreyText text={`x ${continent.count}`} />
                    <GreyText text={`${continent.diff} d`} />
                  </UserRow>
                ))}
              {continentList.length === 0 &&
                !search &&
                continents &&
                continents.map(continent => (
                  <UserRow key={continent.id}>
                    <Link to={`/continent/${continent.continentCode}`}>
                      <Header>
                        <SAvatar size={"sm"} url={continent.continentPhoto} />
                        <HeaderColumn>
                          <HeaderText text={continent.continentName} />
                        </HeaderColumn>
                      </Header>
                    </Link>
                    <GreyText text={`x ${continent.count}`} />
                    <GreyText text={`${continent.diff} d`} />
                  </UserRow>
                ))}
            </UserContainer>
          </PHeader>
          <GreyLine />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default ContinentsPresenter;
