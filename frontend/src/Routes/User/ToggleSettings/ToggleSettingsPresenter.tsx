import React from "react";
import { ToggleOn, ToggleOff } from "../../../Icons";
import styled from "src/Styles/typed-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleText = styled.p`
  font-size: 18px;
  font-weight: 100;
`;

const ExplainText = styled.p`
  font-size: 12px;
  font-weight: 100;
`;

const ToggleIcon = styled.div`
  display: flex;
  svg {
    fill: grey;
  }
`;

interface IProps {
  isSelf: boolean;
  isDarkMode: boolean;
  isHideTrips: boolean;
  isHideCoffees: boolean;
  isHideCities: boolean;
  isHideCountries: boolean;
  isHideContinents: boolean;
  isAutoLocationReport: boolean;
  onClickToggleIcon: (payload: string) => void;
}

const ToggleSettingsPresenter: React.FunctionComponent<IProps> = ({
  isSelf,
  isDarkMode,
  isHideTrips,
  isHideCoffees,
  isHideCities,
  isHideCountries,
  isHideContinents,
  isAutoLocationReport,
  onClickToggleIcon
}) => {
  return (
    <>
      <Container>
        <ToggleText>DARK MODE</ToggleText>
        <ToggleIcon onClick={() => onClickToggleIcon("DARK_MODE")}>
          {isSelf && isDarkMode ? <ToggleOn /> : <ToggleOff />}
        </ToggleIcon>
        {isSelf && isDarkMode ? (
          <ExplainText>Toggle to make light background</ExplainText>
        ) : (
          <ExplainText>Toggle to make dark background</ExplainText>
        )}
      </Container>
      <Container>
        <ToggleText>HIDE TRIPS</ToggleText>
        <ToggleIcon onClick={() => onClickToggleIcon("HIDE_TRIPS")}>
          {isSelf && isHideTrips ? <ToggleOn /> : <ToggleOff />}
        </ToggleIcon>
      </Container>
      <Container>
        <ToggleText>HIDE COFFEES</ToggleText>
        <ToggleIcon onClick={() => onClickToggleIcon("HIDE_COFFEES")}>
          {isSelf && isHideCoffees ? <ToggleOn /> : <ToggleOff />}
        </ToggleIcon>
      </Container>
      <Container>
        <ToggleText>HIDE CITIES</ToggleText>
        <ToggleIcon onClick={() => onClickToggleIcon("HIDE_CITIES")}>
          {isSelf && isHideCities ? <ToggleOn /> : <ToggleOff />}
        </ToggleIcon>
      </Container>
      <Container>
        <ToggleText>HIDE COUNTRIES</ToggleText>
        <ToggleIcon onClick={() => onClickToggleIcon("HIDE_COUNTRIES")}>
          {isSelf && isHideCountries ? <ToggleOn /> : <ToggleOff />}
        </ToggleIcon>
      </Container>
      <Container>
        <ToggleText>HIDE CONTINENTS</ToggleText>
        <ToggleIcon onClick={() => onClickToggleIcon("HIDE_CONTINENTS")}>
          {isSelf && isHideContinents ? <ToggleOn /> : <ToggleOff />}
        </ToggleIcon>
      </Container>
      <Container>
        <ToggleText>AUTO LOCATION REPORT</ToggleText>
        <ToggleIcon onClick={() => onClickToggleIcon("AUTO_LOCATION_REPORT")}>
          {isSelf && isAutoLocationReport ? <ToggleOn /> : <ToggleOff />}
        </ToggleIcon>
      </Container>
    </>
  );
};

export default ToggleSettingsPresenter;
