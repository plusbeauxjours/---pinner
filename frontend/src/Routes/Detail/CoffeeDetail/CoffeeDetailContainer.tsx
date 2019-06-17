import React from "react";
import CoffeeDetailPresenter from "./CoffeeDetailPresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  CoffeeDetail,
  CoffeeDetailVariables,
  DeleteCoffee,
  DeleteCoffeeVariables
} from "../../../types/api";
import { COFFEE_DETAIL } from "./CoffeeDetailQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { DELETE_COFFEE } from "../../Detail/CoffeeDetail/CoffeeDetailQueries";
import { GET_COFFEES } from "../../User/Coffees/CoffeesQueries";
import { toast } from "react-toastify";

class CoffeeDetailQuery extends Query<CoffeeDetail, CoffeeDetailVariables> {}
class DeleteCoffeeMutation extends Mutation<
  DeleteCoffee,
  DeleteCoffeeVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  modalOpen: boolean;
  userId: string;
}

class CoffeeDetailContainer extends React.Component<IProps, IState> {
  public deleteCoffeeFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      userId: null
    };
    console.log(this.state);
  }
  public render() {
    console.log(this.props);
    const {
      match: {
        params: { uuid }
      }
    } = this.props;
    const { modalOpen } = this.state;
    console.log(this.state);
    return (
      <DeleteCoffeeMutation
        mutation={DELETE_COFFEE}
        onCompleted={this.onCompletedDeleteCoffee}
        update={this.updateDeleteCoffee}
      >
        {deleteCoffeeFn => {
          this.deleteCoffeeFn = deleteCoffeeFn;
          return (
            <CoffeeDetailQuery
              query={COFFEE_DETAIL}
              variables={{ coffeeId: uuid }}
            >
              {({ data, loading }) => (
                <CoffeeDetailPresenter
                  loading={loading}
                  data={data}
                  modalOpen={modalOpen}
                  toggleModal={this.toggleModal}
                  back={this.back}
                  deleteCoffee={this.deleteCoffee}
                />
              )}
            </CoffeeDetailQuery>
          );
        }}
      </DeleteCoffeeMutation>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
    console.log(this.state);
  };
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
  public onCompletedDeleteCoffee = data => {
    if (data.deleteCoffee.ok) {
      toast.success("Coffee deleted");
    } else {
      toast.error("error");
    }
  };
  public updateDeleteCoffee = (cache, { data: { deleteCoffee } }) => {
    const { username } = deleteCoffee;
    console.log(username);
    const currentCity = localStorage.getItem("cityName");
    try {
      const profileData = cache.readQuery({
        query: GET_COFFEES,
        variables: { userName: username, location: "profile" }
      });
      console.log(profileData);
      if (profileData) {
        profileData.getCoffees.coffees = profileData.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        profileData.getCoffees.coffees = profileData.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: { userName: username, location: "profile" },
          data: profileData
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: { cityName: currentCity, location: "feed" }
      });
      if (feedData) {
        feedData.getCoffees.coffees = feedData.getCoffees.coffees.filter(
          i => parseInt(i.id, 10) !== deleteCoffee.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            cityName: currentCity,
            location: "feed"
          },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public deleteCoffee = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.deleteCoffeeFn({ variables: { coffeeId: parseInt(id, 10) } });
    this.setState({
      modalOpen: false
    });
  };
}

export default withRouter(CoffeeDetailContainer);
