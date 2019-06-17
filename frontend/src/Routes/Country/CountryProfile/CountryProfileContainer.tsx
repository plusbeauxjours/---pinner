import React from "react";
import { Query } from "react-apollo";
import CountryProfilePresenter from "./CountryProfilePresenter";
import {
  CountryProfile,
  CountryProfileVariables,
  GetCoffees,
  GetCoffeesVariables
} from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { COUNTRY_PROFILE, GET_COUNTRIES } from "./CountryProfileQueries";
import { GET_COFFEES } from "../../User/Coffees/CoffeesQueries";
import { GetCountries, GetCountriesVariables } from "../../../types/api";

class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}
class CountryProfileQuery extends Query<
  CountryProfile,
  CountryProfileVariables
> {}
class GetCountriesQuery extends Query<GetCountries, GetCountriesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  cityList: any;
  activeId: number;
  countryName: string;
  currentCityId: string;
}

class CountryProfileContainer extends React.Component<IProps, IState> {
  public data;
  public coffeeData;
  public countriesData;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      search: "",
      cityList: [],
      activeId: null,
      countryName: state.countryName,
      currentCityId: localStorage.getItem("cityId")
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (
      prevProps.match.params.countryCode !== newProps.match.params.countryCode
    ) {
      this.setState({ search: "", cityList: [] });
      console.log(this.state);
    }
  }
  public render() {
    const {
      match: {
        params: { countryCode }
      }
    } = this.props;
    const {
      search,
      cityList,
      activeId,
      countryName,
      currentCityId
    } = this.state;
    return (
      <GetCountriesQuery
        query={GET_COUNTRIES}
        variables={{
          countryCode
        }}
      >
        {({ data: countriesData, loading: countriesLoading }) => {
          this.countriesData = countriesData;
          return (
            <GetCoffeesQuery
              query={GET_COFFEES}
              variables={{
                countryCode,
                location: "country"
              }}
            >
              {({ data: coffeeData, loading: coffeeLoading }) => {
                this.coffeeData = coffeeData;
                return (
                  <CountryProfileQuery
                    query={COUNTRY_PROFILE}
                    variables={{ countryCode }}
                  >
                    {({ data, loading }) => {
                      this.data = data;
                      return (
                        <CountryProfilePresenter
                          loading={loading}
                          data={data}
                          countriesData={countriesData}
                          countriesLoading={countriesLoading}
                          coffeeData={coffeeData}
                          coffeeLoading={coffeeLoading}
                          countryName={countryName}
                          onChange={this.onChange}
                          search={search}
                          activeId={activeId}
                          cityList={cityList}
                          onKeyDown={this.onKeyDown}
                          onClick={this.onClick}
                          onBlur={this.onBlur}
                          countryCode={countryCode}
                          currentCityId={currentCityId}
                        />
                      );
                    }}
                  </CountryProfileQuery>
                );
              }}
            </GetCoffeesQuery>
          );
        }}
      </GetCountriesQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      countryProfile: { cities = null }
    } = this.data;
    const search = (list, text) =>
      list.filter(i => i.cityName.toLowerCase().includes(text.toLowerCase()));
    const cityList = search(cities, value);
    this.setState({
      search: value,
      cityList,
      activeId: 0
    } as any);
  };
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { activeId, cityList } = this.state;
    const { history } = this.props;

    const { countryProfile: { cities = null } = {} } = this.data;

    if (keyCode === 13 && (cityList.length || cities)) {
      {
        cityList.length
          ? history.push({
              pathname: `/city/${cityList[activeId].cityId}`
            })
          : history.push({
              pathname: `/city/${cities[activeId].cityId}`
            });
      }
      this.setState({
        activeId: 0
      });
    } else if (keyCode === 38) {
      if (activeId === 0) {
        return;
      }
      this.setState({
        activeId: activeId - 1
      });
    } else if (keyCode === 40) {
      if (cityList.length) {
        if (activeId === cityList.length - 1) {
          return;
        }
      } else {
        if (activeId === cities.length - 1) {
          return;
        }
      }
      this.setState({
        activeId: activeId + 1
      });
    }
  };
  public onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      activeId: 0
    });
  };
  public onBlur: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      activeId: null
    });
  };
}

export default withRouter(CountryProfileContainer);
