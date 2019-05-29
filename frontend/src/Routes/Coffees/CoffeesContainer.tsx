import React from "react";
import { Query } from "react-apollo";
import { GetCoffeesVariables, GetCoffees } from "src/types/api";
import CoffeesPresenter from "./CoffeesPresenter";
import { GET_COFFEES } from "./CoffeesQueries";
import { RouteComponentProps } from "react-router";

class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  username: string;
  search: string;
  coffeesList: any;
  activeId: number;
}

class CoffeesContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      search: "",
      coffeesList: [],
      activeId: null
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.username !== newProps.match.params.username) {
      this.setState({ search: "", coffeesList: [] });
      console.log(this.state);
    }
  }
  public render = () => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { search, coffeesList, activeId } = this.state;
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
              activeId={activeId}
              coffeesList={coffeesList}
              onKeyDown={this.onKeyDown}
              onClick={this.onClick}
              onBlur={this.onBlur}
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
      coffeesList,
      activeId: 0
    } as any);
  };
  public onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { activeId, coffeesList } = this.state;
    const { history } = this.props;

    const {
      getCoffees: { coffees = null }
    } = this.data;

    if (keyCode === 13 && (coffeesList.length || coffees)) {
      {
        coffeesList.length
          ? history.push({
              pathname: `/c/${coffeesList[activeId].id}`
            })
          : history.push({
              pathname: `/c/${coffees[activeId].id}`
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
      if (coffeesList.length) {
        if (activeId === coffeesList.length - 1) {
          return;
        }
      } else {
        if (activeId === coffees.length - 1) {
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

export default CoffeesContainer;
