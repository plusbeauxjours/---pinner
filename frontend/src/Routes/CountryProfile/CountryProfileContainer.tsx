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
  cityList: any;
}

class CountryProfileContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      search: "",
      cityList: []
    };
  }
  public componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (
      oldProps.match.params.countryName !== newProps.match.params.countryName
    ) {
      this.setState({ search: "", cityList: [] });
      console.log(this.state);
    }
  }
  public render() {
    const {
      match: {
        params: { countryName }
      }
    } = this.props;
    const { search, cityList } = this.state;
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
              cityList={cityList}
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
      countryProfile: { cities = null }
    } = this.data;
    const search = (list, text) =>
      list.filter(i => i.cityName.toLowerCase().includes(text.toLowerCase()));
    const cityList = search(cities, value);
    this.setState({
      search: value,
      cityList
    } as any);
  };
}

export default withRouter(CountryProfileContainer);
