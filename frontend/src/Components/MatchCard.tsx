import React from "react";
import styled from "src/Styles/typed-components";
import Avatar from "./Avatar";
import Bold from "./Bold";
import CoffeeBtn from "src/Components/CoffeeBtn";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${props => props.theme.headerColor};
  width: 170px;
  height: 200px;
  padding: 10px;
  margin-right: 5px;
  margin-bottom: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const SBold = styled(Bold)`
  margin-bottom: 3px;
  display: block;
`;

const Location = styled.span`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 200;
`;

interface IProps {
  id: string;
  host: any;
  guest: any;
  currentCity: string;
  currentCountry: string;
  expires: string;
  isMatching: boolean;
  isGuest: boolean;
  isHost: boolean;
}

const MatchCard: React.SFC<IProps> = ({
  id,
  host,
  guest,
  currentCity,
  currentCountry,
  expires,
  isMatching,
  isGuest,
  isHost
}) => {
  return (
    <>
      <Container>
        {isGuest ? (
          <>
            <SAvatar url={host.profile.avatar} size="sm" />
            <SBold text={host.username} />
            <Location>
              {currentCity}, {currentCountry}
            </Location>
            <Location>{expires}</Location>
            <Location>{isMatching}</Location>
            <Location>YOU ARE GUEST</Location>
          </>
        ) : (
          <>
            <SAvatar url={guest.profile.avatar} size="sm" />
            <SBold text={guest.username} />
            <Location>
              {currentCity}, {currentCountry}
            </Location>
            <Location>{expires}</Location>
            <Location>{isMatching}</Location>
            <Location>YOU ARE HOST</Location>
          </>
        )}
        {isMatching ? <CoffeeBtn isMatching={isMatching} matchId={id} /> : null}
      </Container>
    </>
  );
};
export default MatchCard;
