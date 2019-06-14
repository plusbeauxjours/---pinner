import React from "react";
import { Query } from "react-apollo";
import { NearCities, NearCitiesVariables } from "../../../types/api";
import NearCitiesPresenter from "./NearCitiesPresenter";
import { NEAR_CITIES } from "./NearCitiesQueries";
import { RouteComponentProps } from "react-router";

class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  modalOpen: boolean;
  search: string;
  nearCitiesList: any;
  nearCitiesActiveId: number;
}

class NearCitiesContainer extends React.Component<IProps, IState> {
  public data;
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      search: "",
      nearCitiesList: [],
      nearCitiesActiveId: null
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    console.log(prevProps);
    console.log(newProps);
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", nearCitiesList: [] });
      console.log(this.state);
    }
  }
  public render() {
    console.log(this.props);

    const {
      match: {
        params: { cityId }
      }
    } = this.props;
    const {
      modalOpen,
      search,
      nearCitiesList,
      nearCitiesActiveId
    } = this.state;
    return (
      <NearCitiesQuery
        query={NEAR_CITIES}
        variables={{
          cityId
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <NearCitiesPresenter
              data={data}
              loading={loading}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              search={search}
              nearCitiesActiveId={nearCitiesActiveId}
              nearCitiesList={nearCitiesList}
              onChange={this.onChange}
              loadMore={this.loadMore}
              cityId={cityId}
              onKeyDown={this.onKeyDown}
              onClick={this.onClick}
              onBlur={this.onBlur}
            />
          );
        }}
      </NearCitiesQuery>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      nearCities: { cities = null }
    } = this.data;
    const citySearch = (list, text) =>
      list.filter(
        i =>
          i.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.country.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const nearCitiesList = citySearch(cities, value);
    console.log(nearCitiesList);
    this.setState({
      search: value,
      nearCitiesList,
      nearCitiesActiveId: 0
    } as any);
  };
  public loadMore = page => {
    const {
      match: {
        params: { cityId }
      }
    } = this.props;
    this.fetchMore({
      query: NEAR_CITIES,
      variables: {
        cityId,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          nearCities: {
            ...previousResult.nearCities,
            cities: [
              ...previousResult.nearCities.cities,
              ...fetchMoreResult.nearCities.cities
            ]
          }
        };
        return data;
      }
    });
  };
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { nearCitiesActiveId, nearCitiesList } = this.state;
    const { history } = this.props;

    const { nearCities: { cities = null } = {} } = this.data;

    if (keyCode === 13 && (nearCitiesList.length || cities)) {
      {
        nearCitiesList.length
          ? history.push({
              pathname: `/city/${nearCitiesList[nearCitiesActiveId].cityId}`
            })
          : history.push({
              pathname: `/city/${cities[nearCitiesActiveId].cityId}`
            });
      }
      this.setState({
        nearCitiesActiveId: 0
      });
    } else if (keyCode === 38) {
      if (nearCitiesActiveId === 0) {
        return;
      }
      this.setState({
        nearCitiesActiveId: nearCitiesActiveId - 1
      });
    } else if (keyCode === 40) {
      if (nearCitiesList.length) {
        if (nearCitiesActiveId === nearCitiesList.length - 1) {
          return;
        }
      } else {
        if (nearCitiesActiveId === cities.length - 1) {
          return;
        }
      }
      this.setState({
        nearCitiesActiveId: nearCitiesActiveId + 1
      });
    }
  };
  public onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      nearCitiesActiveId: 0
    });
  };
  public onBlur: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      nearCitiesActiveId: null
    });
  };
}

export default NearCitiesContainer;
