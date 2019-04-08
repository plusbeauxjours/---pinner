import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import FeedPresenter from "./FeedPresenter";
import {
  ReportLocation,
  ReportLocationVariables,
  Feed,
  FeedVariables,
  RecommandUsers
} from "../../types/api";
import { RouteComponentProps } from "react-router";
import { REPORT_LOCATION } from "../Home/HomeQueries";
import { reverseGeoCode } from "../../mapHelpers";
import { RECOMMAND_USERS, GET_FEED } from "./FeedQueries";
import {
  cityThumbnail,
  countryThumbnail,
  continentThumbnail
} from "../../locationThumbnail";
import continents from "../../continents";

class RecommandUsersQuery extends Query<RecommandUsers> {}
class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}
class FeedQuery extends Query<Feed, FeedVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  recommandUserPage: number;
  recommandUserList: any;
  recommandUserModalOpen: boolean;
  page: number;
  nowModalOpen: boolean;
  beforeModalOpen: boolean;
  currentLat: number;
  currentLng: number;
  currentCity: string;
  currentCountry: string;
  currentCountryCode: string;
  currentContinent: string;
  cityPhotoURL: string;
  countryPhotoURL: string;
  continentPhotoURL: string;
}

class FeedContainer extends React.Component<IProps, IState> {
  public recommandUsersFetchMore;
  public ReportLocationFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      recommandUserPage: 0,
      recommandUserList: null,
      recommandUserModalOpen: false,
      page: 0,
      nowModalOpen: false,
      beforeModalOpen: false,
      currentLat: 0,
      currentLng: 0,
      currentCity: null,
      currentCountry: null,
      currentCountryCode: null,
      currentContinent: null,
      cityPhotoURL: null,
      countryPhotoURL: null,
      continentPhotoURL: null
    };
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    console.log("goodmorning");
  }

  public render() {
    const {
      recommandUserPage,
      recommandUserList,
      recommandUserModalOpen,
      page,
      nowModalOpen,
      beforeModalOpen,
      currentLat,
      currentLng,
      currentCity,
      currentCountry,
      currentCountryCode,
      currentContinent,
      cityPhotoURL,
      countryPhotoURL,
      continentPhotoURL
    } = this.state;
    return (
      <FeedQuery
        query={GET_FEED}
        variables={{
          page,
          cityName: currentCity
        }}
      >
        {({ data: data, loading: loading }) => (
          <ReportLocationMutation
            mutation={REPORT_LOCATION}
            variables={{
              currentLat,
              currentLng,
              currentCity,
              currentCountry,
              currentCountryCode,
              currentContinent,
              cityPhotoURL,
              countryPhotoURL,
              continentPhotoURL
            }}
          >
            {ReportLocationFn => {
              this.ReportLocationFn = ReportLocationFn;
              return (
                <RecommandUsersQuery
                  query={RECOMMAND_USERS}
                  variables={{ recommandUserPage }}
                >
                  {({
                    data: recommandUsersData,
                    loading: recommandUsersLoading,
                    fetchMore: recommandUsersFetchMore
                  }) => {
                    this.recommandUsersFetchMore = recommandUsersFetchMore;
                    return (
                      <FeedPresenter
                        data={data}
                        loading={loading}
                        currentCity={currentCity}
                        nowModalOpen={nowModalOpen}
                        beforeModalOpen={beforeModalOpen}
                        toggleNowModal={this.toggleNowModal}
                        toggleBeforeModal={this.toggleBeforeModal}
                        recommandUsersData={recommandUsersData}
                        recommandUsersLoading={recommandUsersLoading}
                        recommandUserList={recommandUserList}
                        recommandUserModalOpen={recommandUserModalOpen}
                        toggleRecommandUserModal={this.toggleRecommandUserModal}
                        toggleRecommandUserSeeAll={
                          this.toggleRecommandUserSeeAll
                        }
                      />
                    );
                  }}
                </RecommandUsersQuery>
              );
            }}
          </ReportLocationMutation>
        )}
      </FeedQuery>
    );
  }
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      currentLat: latitude,
      currentLng: longitude
    });
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    if (address) {
      this.setState({
        currentCity: address.storableLocation.city,
        currentCountry: address.storableLocation.country,
        currentCountryCode: address.storableLocation.countryCode
      });
      this.reportLocation(
        lat,
        lng,
        address.storableLocation.city,
        address.storableLocation.country,
        address.storableLocation.countryCode
      );
    }
  };
  public reportLocation = async (
    lat: number,
    lng: number,
    currentCity: string,
    currentCountry: string,
    currentCountryCode: string
  ) => {
    const cityPhotoURL = await cityThumbnail(currentCity);
    const countryPhotoURL = await countryThumbnail(currentCountry);
    const currentContinent = await continents[currentCountryCode];
    const continentPhotoURL = await continentThumbnail(currentContinent);
    console.log(currentContinent);
    this.setState({ cityPhotoURL, countryPhotoURL, currentContinent });
    this.ReportLocationFn({
      variables: {
        currentLat: lat,
        currentLng: lng,
        currentCity,
        currentCountry,
        currentCountryCode,
        currentContinent,
        cityPhotoURL,
        countryPhotoURL,
        continentPhotoURL
      }
    });
    console.log(this.state);
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public toggleNowModal = () => {
    const { nowModalOpen } = this.state;
    this.setState({
      nowModalOpen: !nowModalOpen
    } as any);
  };
  public toggleBeforeModal = () => {
    const { beforeModalOpen } = this.state;
    this.setState({
      beforeModalOpen: !beforeModalOpen
    } as any);
  };
  public toggleRecommandUserModal = () => {
    const { recommandUserModalOpen } = this.state;
    this.setState({
      recommandUserModalOpen: !recommandUserModalOpen
    } as any);
  };
  public toggleRecommandUserSeeAll = () => {
    const { recommandUserModalOpen } = this.state;
    this.recommandUsersFetchMore({
      query: RECOMMAND_USERS,
      variables: { recommandUserPage: 1 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        this.setState({
          recommandUserList: [
            ...previousResult.recommandUsers.users,
            ...fetchMoreResult.recommandUsers.users
          ],
          recommandUserModalOpen: !recommandUserModalOpen
        } as any);
      }
    });
  };
}

export default FeedContainer;
