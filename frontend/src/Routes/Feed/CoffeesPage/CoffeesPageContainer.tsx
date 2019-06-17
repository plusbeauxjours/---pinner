import React from "react";
import { Query } from "react-apollo";
import { GetCoffeesVariables, GetCoffees } from "src/types/api";
import CoffeesPagePresenter from "./CoffeesPagePresenter";
import { GET_COFFEES } from "../../User/Coffees/CoffeesQueries";
import { RouteComponentProps } from "react-router";

class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  cityId: string;
  search: string;
  coffeesList: any;
}

class CoffeesPageContainer extends React.Component<IProps, IState> {
  public coffeeData;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = { cityId: state.currentCityId, search: "", coffeesList: [] };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", coffeesList: [] });
      console.log(this.state);
    }
  }
  public render = () => {
    const { cityId, search, coffeesList } = this.state;
    return (
      <GetCoffeesQuery
        query={GET_COFFEES}
        variables={{
          cityId: cityId || localStorage.getItem("cityId"),
          location: "city"
        }}
      >
        {({ data: coffeeData, loading: coffeeLoading }) => {
          this.coffeeData = coffeeData;
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
    console.log(this.coffeeData);
    const {
      getCoffees: { coffees = null }
    } = this.coffeeData;
    const nowSearch = (list, text) =>
      list.filter(i =>
        i.host.username.toLowerCase().includes(text.toLowerCase())
      );

    const coffeesList = nowSearch(coffees, value);
    this.setState({
      search: value,
      coffeesList
    } as any);
  };
}

export default CoffeesPageContainer;
