import React from "react";
import styled from "../../Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Bold from "../../Components/Bold";
import UserGrid from "src/Components/UserGrid";
import CardGrid from "src/Components/CardGrid";
import Loader from "src/Components/Loader";
import LocationGrid from "../../Components/LocationGrid";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const Container = styled.div`
  border-bottom: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  height: 280px;
  padding: 15px;
`;

const Box = styled.div`
  width: 905px;
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${props => props.theme.bgColor};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.theme.greyColor};
  }
`;

const SBold = styled(Bold)`
  display: flex;
  font-size: 20px;
  font-weight: 100;
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
`;

interface IProps {
  data?: any;
  empty: boolean;
  loading: boolean;
}

const SearchPresenter: React.SFC<IProps> = ({
  data: {
    searchUsers: { users = null } = {},
    searchCards: { cards = null } = {},
    searchCities: { cities = null } = {},
    searchCountries: { countries = null } = {},
    searchContinents: { continents = null } = {}
  },
  empty,
  loading
}) => {
  if (empty) {
    return (
      <SWrapper>
        <Bold text="Search for something..." />
      </SWrapper>
    );
  } else if (loading) {
    return <Loader />;
  } else if (!loading && users && cards) {
    return (
      <SWrapper>
        {users && users.length > 0 && (
          <>
            <SBold text={"USERS"} />
            <Container>
              <Box>
                <UserGrid users={users} />
              </Box>
            </Container>
            <GreyLine />
          </>
        )}

        {cities && cities.length > 0 && (
          <>
            <SBold text={"CITIES"} />
            <Container>
              <Box>
                <LocationGrid cities={cities} type={"city"} />
              </Box>
            </Container>
            <GreyLine />
          </>
        )}
        {countries && countries.length > 0 && (
          <>
            <SBold text={"COUNTRIES"} />
            <Container>
              <Box>
                <LocationGrid countries={countries} type={"country"} />
              </Box>
            </Container>
            <GreyLine />
          </>
        )}
        {continents && continents.length > 0 && (
          <>
            <SBold text={"CONTINENTS"} />
            <Container>
              <Box>
                <LocationGrid continents={continents} type={"continent"} />
              </Box>
            </Container>
            <GreyLine />
          </>
        )}
        {cards && cards.length > 0 && (
          <>
            <SBold text={"POSTS"} />
            <CardGrid cards={cards} />
            <GreyLine />
          </>
        )}
        {users &&
          users.length === 0 &&
          cards &&
          cards.length === 0 &&
          cities &&
          cities.length === 0 &&
          countries &&
          countries.length === 0 &&
          continents &&
          continents.length === 0 && <Bold text="Nothing found..." />}
      </SWrapper>
    );
  } else if (loading) {
    return <Loader />;
  }
  return null;
};

export default SearchPresenter;
