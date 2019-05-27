import React from "react";
import { Query } from "react-apollo";
import { GetCoffeesVariables, GetCoffees } from "src/types/api";
import CoffeesPagePresenter from "./CoffeesPagePresenter";
import { GET_COFFEES } from "../Coffees/CoffeesQueries";
import { RouteComponentProps } from "react-router";

class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  cityName: string;
  search: string;
  coffeesList: any;
}

class CoffeesPageContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = { cityName: state.currentCity, search: "", coffeesList: [] };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", coffeesList: [] });
      console.log(this.state);
    }
  }
  public render = () => {
    const { cityName, search, coffeesList } = this.state;
    return (
      <GetCoffeesQuery
        query={GET_COFFEES}
        variables={{
          cityName: cityName || localStorage.getItem("cityName"),
          location: "feed"
        }}
      >
        {({ data: coffeeData, loading: coffeeLoading }) => {
          return (
            <CoffeesPagePresenter
              coffeeData={coffeeData}
              coffeeLoading={coffeeLoading}
              onChange={this.onChange}
              search={search}
              coffeesList={coffeesList}
            />
          );
        }}
      </GetCoffeesQuery>
    );
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    console.log(this.data);
    const {
      getCoffees: { coffees = null }
    } = this.data;
    const nowSearch = (list, text) =>
      list.filter(
        i =>
          i.city.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.city.country.countryName.toLowerCase().includes(text.toLowerCase())
      );

    const coffeesList = nowSearch(coffees, value);
    this.setState({
      search: value,
      coffeesList
    } as any);
  };
}

export default CoffeesPageContainer;
