import React from "react";
import { Query } from "react-apollo";
import ContinentProfilePresenter from "./CountriesPresenter";
import { TopCountries, TopCountriesVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { TOP_COUNTRIES } from "./CountriesQueries";

class GetCountriesQuery extends Query<TopCountries, TopCountriesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  search: string;
  countryList: any;
}
class CountriesContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      search: "",
      countryList: null
    };
  }
  public render() {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { search, countryList } = this.state;
    return (
      <GetCountriesQuery
        query={TOP_COUNTRIES}
        variables={{ userName: username }}
      >
        {({ data, loading }) => {
          this.data = data;
          return (
            <ContinentProfilePresenter
              data={data}
              loading={loading}
              userName={username}
              onChange={this.onChange}
              search={search}
              countryList={countryList}
            />
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
      topCountries: { countries = null }
    } = this.data;
    const search = (list, text) =>
      list.filter(i =>
        i.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const countryList = search(countries, value);
    this.setState({
      search: value,
      countryList
    } as any);
  };
}

export default withRouter(CountriesContainer);
