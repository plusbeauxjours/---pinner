import React from "react";
import { Query } from "react-apollo";
import CountryProfilePresenter from "./CountryProfilePresenter";
import { CountryProfile, CountryProfileVariables } from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { COUNTRY_PROFILE } from "./CountryProfileQueries";

class CountryProfileQuery extends Query<
  CountryProfile,
  CountryProfileVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  cityList: any;
  activeId: number;
}

class CountryProfileContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      cityList: [],
      activeId: null
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (
      prevProps.match.params.countryName !== newProps.match.params.countryName
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
    const { search, cityList, activeId } = this.state;
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
              activeId={activeId}
              cityList={cityList}
              onKeyDown={this.onKeyDown}
              onClick={this.onClick}
              onBlur={this.onBlur}
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
