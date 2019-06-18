import React from "react";
import { Query } from "react-apollo";
import ContinentProfilePresenter from "./ContinentProfilePresenter";
import {
  ContinentProfile,
  ContinentProfileVariables,
  GetCoffees,
  GetCoffeesVariables
} from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CONTINENT_PROFILE } from "./ContinentProfileQueries";
import { GET_COFFEES } from "../../User/Coffees/CoffeesQueries";

class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}
class ContinentProfileQuery extends Query<
  ContinentProfile,
  ContinentProfileVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  countryList: any;
  activeId: number;
  currentCityId: string;
}
class ContinentProfileContainer extends React.Component<IProps, IState> {
  public data;
  public coffeeData;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      countryList: [],
      activeId: null,
      currentCityId: localStorage.getItem("cityId")
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (
      prevProps.match.params.continentCode !==
      newProps.match.params.continentCode
    ) {
      this.setState({ search: "", countryList: [] });
      console.log(this.state);
    }
  }
  public render() {
    const {
      match: {
        params: { continentCode }
      }
    } = this.props;
    const { search, countryList, activeId, currentCityId } = this.state;
    return (
      <ContinentProfileQuery
        query={CONTINENT_PROFILE}
        variables={{ continentCode }}
      >
        {({ data, loading }) => {
          this.data = data;
          return (
            <GetCoffeesQuery
              query={GET_COFFEES}
              variables={{
                continentCode,
                location: "continent"
              }}
            >
              {({ data: coffeeData, loading: coffeeLoading }) => {
                this.coffeeData = coffeeData;
                return (
                  <ContinentProfilePresenter
                    data={data}
                    loading={loading}
                    coffeeData={coffeeData}
                    coffeeLoading={coffeeLoading}
                    continentCode={continentCode}
                    onChange={this.onChange}
                    search={search}
                    activeId={activeId}
                    countryList={countryList}
                    onKeyDown={this.onKeyDown}
                    onClick={this.onClick}
                    onBlur={this.onBlur}
                    currentCityId={currentCityId}
                  />
                );
              }}
            </GetCoffeesQuery>
          );
        }}
      </ContinentProfileQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      continentProfile: { countries = null }
    } = this.data;
    const search = (list, text) =>
      list.filter(i =>
        i.countryName.toLowerCase().includes(text.toLowerCase())
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

    const { continentProfile: { countries = null } = {} } = this.data;

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

export default withRouter(ContinentProfileContainer);
