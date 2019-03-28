import React from "react";
import styled from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import Flag from "../../Components/Flag";
import { ContinentProfile } from "../../types/api";
import LocationGrid from "../../Components/LocationGrid";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: flex;
  flex-direction: column;
  height: 300px;
  align-items: center;
  background: ${props => props.theme.headerColor};
`;

const PAvatar = styled(Avatar)`
  margin: 40px;
`;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const PBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 20px 0;
  justify-content: center;
  background: ${props => props.theme.bgColor};
  border-bottom: 1px solid grey;
  &:not(:last-child) {
    border-bottom: 1px solid grey;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 300px;
  margin-right: 15px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-bottom: 10px;
  height: 200px;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 5px;
`;

const InfoInlineContainer = styled(InfoContainer)`
  flex-direction: row;
  justify-content: space-between;
`;

const HalfInfo = styled(Info)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48%;
  height: 100px;
  display: flex;
  margin-bottom: 0;
  padding-bottom: 30px;
`;

const InfoRow = styled.span``;

const FollowContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin-bottom: 10px;
`;

const Follow = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 10px;
  height: 150px;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 5px;
`;

const SBold = styled(Bold)`
  font-size: 20px;
  font-weight: 200;
`;

const FlagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  padding: 20px;
`;

const Container = styled.div`
  border-bottom: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  height: 250px;
  border-bottom: 1px solid grey;
  padding: 20px;
`;

const AvatarContainer = styled.div``;

interface IProps {
  data?: ContinentProfile;
  loading: boolean;
}

const ContinentProfilePresenter: React.SFC<IProps> = ({
  data: { continentProfile: { continent = null, countries = null } = {} } = {},
  loading
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && continent && countries) {
    return (
      <>
        <PHeader>
          <PAvatar size="lg" url={continent.continentPhoto} />
          <Username>{continent.continentName}</Username>
        </PHeader>
        <SWrapper>
          <PBody>
            <InfoContainer>
              <Info>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with....
              </Info>
              <InfoInlineContainer>
                <HalfInfo>
                  <InfoRow>
                    <SBold text={String(continent.countryCount)} />
                    AQI
                  </InfoRow>
                  <InfoRow>
                    <SBold text={String(continent.countryCount)} />
                    TEMPERATURE
                  </InfoRow>
                  <InfoRow>
                    <SBold text={String(continent.countryCount)} />
                    DISTANCE
                  </InfoRow>
                </HalfInfo>
                <HalfInfo>
                  <InfoRow>
                    cardCount
                    <SBold text={String(continent.countryCount)} />
                  </InfoRow>

                  <InfoRow>
                    userCount
                    <SBold text={String(continent.countryCount)} />
                  </InfoRow>

                  <InfoRow>
                    userLogCount
                    <SBold text={String(continent.countryCount)} />
                  </InfoRow>
                </HalfInfo>
              </InfoInlineContainer>
            </InfoContainer>
            <FollowContainer>
              COUNTRIES
              <SBold text={String(continent.countryCount)} />
              <Follow>
                <FlagGrid>
                  {countries &&
                    countries.map(country => (
                      <AvatarContainer key={country.id}>
                        <Flag
                          size={"sm"}
                          countryCode=
                          {country.countryCode}
                          
                        />
                      </AvatarContainer>
                    ))}
                </FlagGrid>
              </Follow>
            </FollowContainer>
          </PBody>{" "}
          <Container>
            {countries && (
              <LocationGrid countries={countries} type={"country"} />
            )}
          </Container>
        </SWrapper>
      </>
    );
  }
  return null;
};

export default ContinentProfilePresenter;
