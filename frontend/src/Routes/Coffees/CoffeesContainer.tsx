import React from "react";
import { Query } from "react-apollo";
import { GetFollowingsVariables, GetFollowings } from "src/types/api";
import CoffeesPresenter from "./CoffeesPresenter";
import { GET_COFFEES } from "./CoffeesQueries";
import { RouteComponentProps } from "react-router";

class GetCoffeesQuery extends Query<GetFollowings, GetFollowingsVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  username: string;
  search: string;
  coffeesList: any;
}

class CoffeesContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = { username: props.username, search: "", coffeesList: null };
  }
  public render = () => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { search, coffeesList } = this.state;
    return (
      <GetCoffeesQuery
        query={GET_COFFEES}
        variables={{ userName: username, location: "history" }}
      >
        {({ data, loading }) => {
          this.data = data;
          return (
            <CoffeesPresenter
              data={data}
              loading={loading}
              userName={username}
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

export default CoffeesContainer;
