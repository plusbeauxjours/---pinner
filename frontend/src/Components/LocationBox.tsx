import React from "react";
import styled from "src/Styles/typed-components";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Bold from "./Bold";
import Avatar from "./Avatar";
import CityLikeBtn from "./CityLikeBtn";
import LoadingOverlay from "react-loading-overlay";

const SeeAll = styled.p`
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
`;

const Container = styled.div`
  -webkit-box-flex: 0;
  padding: 15px;
`;

const Box = styled.div`
  max-width: 905px;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, 50px);
  grid-auto-columns: 400px;
  column-gap: 10px;
  overflow-x: auto;
  padding-bottom: 15px;
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

const UserRow = styled.div<ITheme>`
  display: grid;
  height: 50px;
  width: 400px;
  grid-template-columns: ${props => {
    if (props.type === "nearCities" || "samenameCities") {
      return "2fr 1fr 1fr";
    } else if (props.type === "continents") {
      return "2fr 1fr";
    } else {
      return "1fr";
    }
  }};
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

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media screen and (max-width: 935px) {
    margin-left: 10px;
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

const HeaderText = styled(Bold)`
  display: flex;
`;

const Text = styled.p`
  font-weight: 300;
  display: flex;
  align-items: center;
`;

interface ITheme {
  type: string;
}

interface IProps extends RouteComponentProps<any> {
  cityId?: string;
  countryCode?: string;
  continentCode?: string;
  samenameCities?: any;
  nearCities?: any;
  cities?: any;
  countries?: any;
  continents?: any;
  title: string;
  loading: boolean;
}

const LocationBox: React.FunctionComponent<IProps> = ({
  cityId,
  countryCode,
  continentCode,
  samenameCities,
  nearCities,
  cities,
  countries,
  continents,
  title,
  loading
}) => {
  if (loading) {
    return (
      <>
        <GreyLine />
        <Container>
          <LoadingOverlay
            active={true}
            spinner={true}
            fadeSpeed={500}
            text="Loading"
          />
        </Container>
      </>
    );
  } else if (!loading && nearCities && nearCities.length !== 0) {
    return (
      <>
        <GreyLine />
        <Title>
          <SText text={title} />
          <Link to={`/city/${cityId}/nearCities`}>
            <SeeAll>SEE ALL</SeeAll>
          </Link>
        </Title>
        <Container>
          <Box>
            {nearCities.map(nearCity => (
              <UserRow key={nearCity.id} type={"nearCities"}>
                <Link to={`/city/${nearCity.cityId}`}>
                  <Header>
                    <SAvatar size={"sm"} url={nearCity.cityPhoto} city={true} />
                    <HeaderColumn>
                      <HeaderText text={nearCity.cityName} />
                      <Location>{nearCity.country.countryName}</Location>
                    </HeaderColumn>
                  </Header>
                </Link>
                <CityLikeBtn
                  isLiked={nearCity.isLiked}
                  cityId={nearCity.id}
                  likeCount={nearCity.likeCount}
                  type={"row"}
                />
                <Text>{nearCity.distance}km</Text>
              </UserRow>
            ))}
          </Box>
        </Container>
      </>
    );
  } else if (!loading && samenameCities && samenameCities.length !== 0) {
    return (
      <>
        <GreyLine />
        <Title>
          <SText text={title} />
        </Title>
        <Container>
          <Box>
            {samenameCities.map(samenameCity => (
              <UserRow key={samenameCity.id} type={"samenameCities"}>
                <Link to={`/city/${samenameCity.cityId}`}>
                  <Header>
                    <SAvatar
                      size={"sm"}
                      url={samenameCity.cityPhoto}
                      city={true}
                    />
                    <HeaderColumn>
                      <HeaderText text={samenameCity.cityName} />
                      <Location>{samenameCity.country.countryName}</Location>
                    </HeaderColumn>
                  </Header>
                </Link>
                <CityLikeBtn
                  isLiked={samenameCity.isLiked}
                  cityId={samenameCity.id}
                  likeCount={samenameCity.likeCount}
                  type={"row"}
                />
                <Text>{samenameCity.distance}km</Text>
              </UserRow>
            ))}
          </Box>
        </Container>
      </>
    );
  } else if (!loading && cities && cities.length !== 0) {
    return <GreyLine />;
  } else if (!loading && countries && countries.length !== 0) {
    return (
      <>
        <GreyLine />
        <Title>
          <SText text={title} />
        </Title>
        <Container>
          <Box>
            {countries.map(country => (
              <UserRow key={country.id} type={"countries"}>
                <Link to={`/country/${country.countryCode}`}>
                  <Header>
                    <SAvatar
                      size={"sm"}
                      url={country.countryPhoto}
                      city={true}
                    />
                    <HeaderColumn>
                      <HeaderText text={country.countryName} />
                      <Location>{country.continent.continentName}</Location>
                    </HeaderColumn>
                  </Header>
                </Link>
              </UserRow>
            ))}
          </Box>
        </Container>
      </>
    );
  } else if (!loading && continents && continents.length !== 0) {
    return (
      <>
        <GreyLine />
        <Title>
          <SText text={title} />
        </Title>
        <Container>
          <Box>
            {continents.map(continent => (
              <UserRow key={continent.id} type={"continents"}>
                <Link to={`/continent/${continent.continentCode}`}>
                  <Header>
                    <SAvatar
                      size={"sm"}
                      url={continent.continentPhoto}
                      city={true}
                    />
                    <HeaderColumn>
                      <HeaderText text={continent.continentName} />
                    </HeaderColumn>
                  </Header>
                  <Text>
                    {continent.countryCount}{" "}
                    {continent.countryCount === 1 ? "country" : "countries"}
                  </Text>
                </Link>
              </UserRow>
            ))}
          </Box>
        </Container>
      </>
    );
  } else {
    return null;
  }
};

export default withRouter(LocationBox);
