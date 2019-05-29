import React from "react";
import { Query } from "react-apollo";
import CitiesPresenter from "./CitiesPresenter";
import { FrequentVisits, FrequentVisitsVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { FREQUENT_VISITS } from "./CitiesQueries";

class GetCitiesQuery extends Query<FrequentVisits, FrequentVisitsVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  cityList: any;
  activeId: number;
}

class CitiesContainerContainer extends React.Component<IProps, IState> {
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
    if (prevProps.match.params.username !== newProps.match.params.username) {
      this.setState({ search: "", cityList: [] });
      console.log(this.state);
    }
  }
  public render() {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { search, cityList, activeId } = this.state;
    return (
      <GetCitiesQuery
        query={FREQUENT_VISITS}
        variables={{ userName: username }}
      >
        {({ data, loading }) => {
          this.data = data;
          return (
            <CitiesPresenter
              loading={loading}
              data={data}
              userName={username}
              onChange={this.onChange}
              search={search}
              cityList={cityList}
              activeId={activeId}
              onKeyDown={this.onKeyDown}
              onClick={this.onClick}
              onBlur={this.onBlur}
            />
          );
        }}
      </GetCitiesQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      frequentVisits: { cities = null }
    } = this.data;
    const search = (list, text) =>
      list.filter(
        i =>
          i.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.country.countryName.toLowerCase().includes(text.toLowerCase())
      );
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

    const {
      frequentVisits: { cities = null }
    } = this.data;

    if (keyCode === 13 && (cityList.length || cities)) {
      {
        cityList.length
          ? history.push({
              pathname: `/city/${cityList[activeId].cityName}`
            })
          : history.push({
              pathname: `/city/${cities[activeId].cityName}`
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

export default withRouter(CitiesContainerContainer);
