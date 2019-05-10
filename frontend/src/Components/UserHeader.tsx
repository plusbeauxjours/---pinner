import React from "react";
import styled from "styled-components";
import Bold from "./Bold";
import Input from "./Input";
import Avatar from "./Avatar";

const Header = styled.header`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 50px;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const SAvatar = styled(Avatar)``;

const Location = styled.span`
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const SText = styled(Bold)`
  display: flex;
`;

const ExtendedInput = styled(Input)`
  width: 287px;
  height: 48px;
`;

const Target = styled.div`
  display: flex;
  bottom: 0;
  font-size: 30px;
  font-weight: 200;
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
  type?: string;
  target?: string;
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
  cityName,
  type,
  target
}) => {
  return (
    <Header>
      {(() => {
        switch (target) {
          case "EVERYONE":
            return (
              <>
                <Target>E</Target>
              </>
            );
          case "GENDER":
            return (
              <>
                <Target>G</Target>
              </>
            );
          case "NATIONALITY":
            return (
              <>
                <Target>N</Target>
              </>
            );
          case "FOLLOWERS":
            return (
              <>
                <Target>F</Target>
              </>
            );
          default:
            return <SAvatar size={size} url={avatar} />;
        }
      })()}
      <HeaderColumn>
        <SText text={username} />
        <Location>
          {(() => {
            switch (type) {
              case "coffee":
                return <>{currentCity}</>;
              default:
                return (
                  <>
                    {editMode || cardEditMode ? (
                      <>
                        <ExtendedInput
                          onChange={onInputChange}
                          type={"text"}
                          placeholder={currentCity}
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
                  </>
                );
            }
          })()}
        </Location>
      </HeaderColumn>
    </Header>
  );
};

export default UserHeader;
