import React from "react";
import { Query } from "react-apollo";
import CountryProfilePresenter from "./CountryProfilePresenter";
import { CountryProfile, CountryProfileVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { COUNTRY_PROFILE } from "./CountryProfileQueries";

class CountryProfileQuery extends Query<
  CountryProfile,
  CountryProfileVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  search: string;
  listCities: any;
}

class CountryProfileContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      search: "",
      listCities: null
    };
  }
  public render() {
    const {
      match: {
        params: { countryName }
      }
    } = this.props;
    const { search, listCities } = this.state;
    return (
      <CountryProfileQuery query={COUNTRY_PROFILE} variables={{ countryName }}>
        {({ data, loading }) => {
          this.data = data;
          return (
            <CountryProfilePresenter
              loading={loading}
              data={data}
              countryName={countryName}
              onChange={this.onChange}
              search={search}
              listCities={listCities}
            />
          );
        }}
      </CountryProfileQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      countryProfile: { cities }
    } = this.data;
    const search = (list, text) =>
      list.filter(i => i.cityName.toLowerCase().includes(text.toLowerCase()));
    const listCities = search(cities, value);
    this.setState({
      search: value,
      listCities
    } as any);
  };
}

export default withRouter(CountryProfileContainer);
