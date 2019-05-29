import React from "react";
import { Query } from "react-apollo";
import CountriesPresenter from "./CountriesPresenter";
import { TopCountries, TopCountriesVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { TOP_COUNTRIES } from "./CountriesQueries";

class GetCountriesQuery extends Query<TopCountries, TopCountriesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  countryList: any;
  activeId: number;
}
class CountriesContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      countryList: [],
      activeId: null
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.username !== newProps.match.params.username) {
      this.setState({ search: "", countryList: [] });
      console.log(this.state);
    }
  }
  public render() {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { search, countryList, activeId } = this.state;
    return (
      <GetCountriesQuery
        query={TOP_COUNTRIES}
        variables={{ userName: username }}
      >
        {({ data, loading }) => {
          this.data = data;
          return (
            <CountriesPresenter
              data={data}
              loading={loading}
              userName={username}
              onChange={this.onChange}
              search={search}
              activeId={activeId}
              countryList={countryList}
              onKeyDown={this.onKeyDown}
              onClick={this.onClick}
              onBlur={this.onBlur}
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
      list.filter(
        i =>
          i.countryName.toLowerCase().includes(text.toLowerCase()) ||
          i.continent.continentName.toLowerCase().includes(text.toLowerCase())
      );
    const countryList = search(countries, value);
    this.setState({
      search: value,
      countryList,
      activeId: 0
    } as any);
  };
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { activeId, countryList } = this.state;
    const { history } = this.props;

    const {
      topCountries: { countries = null }
    } = this.data;

    if (keyCode === 13 && (countryList.length || countries)) {
      {
        countryList.length
          ? history.push({
              pathname: `/country/${countryList[activeId].countryName}`
            })
          : history.push({
              pathname: `/country/${countries[activeId].countryName}`
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
      if (countryList.length) {
        if (activeId === countryList.length - 1) {
          return;
        }
      } else {
        if (activeId === countries.length - 1) {
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

export default withRouter(CountriesContainer);
