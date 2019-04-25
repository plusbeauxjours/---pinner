import React from "react";
import styled from "styled-components";
import Bold from "./Bold";
import Avatar from "./Avatar";
import Input from "./Input";

const Header = styled.header`
  padding: 12px;
  margin: 0 15px 0 15px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const Location = styled.span`
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const SAvatar = styled(Avatar)``;

const SBold = styled(Bold)`
  display: flex;
`;

const ExtendedInput = styled(Input)`
  width: 287px;
  height: 48px;
`;

interface IProps {
  username: string;
  avatar: string;
  currentCity?: string;
  currentCountry?: string;
  size?: string;
  editMode?: boolean;
  cardEditMode?: boolean;
  editCardOnKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cityName?: string;
}

const UserHeader: React.SFC<IProps> = ({
  username,
  avatar,
  currentCity,
  currentCountry,
  size,
  editMode,
  cardEditMode,
  onInputChange,
  editCardOnKeyUp,
  cityName
}) => {
  return (
    <Header>
      <SAvatar size={size} url={avatar} />
      <HeaderColumn>
        <SBold text={username} />
        <Location>
          {editMode || cardEditMode ? (
            <>
              <ExtendedInput
                onChange={onInputChange}
                type={"text"}
                value={cityName}
                placeholder={cityName}
                name={"cityName"}
                onKeyUp={editCardOnKeyUp}
              />
              , {currentCountry}
            </>
          ) : (
            <>
              {currentCity}, {currentCountry}
            </>
          )}
        </Location>
      </HeaderColumn>
    </Header>
  );
};

export default UserHeader;
