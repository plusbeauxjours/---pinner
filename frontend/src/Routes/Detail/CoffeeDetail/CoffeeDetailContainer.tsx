import React from "react";
import CoffeeDetailPresenter from "./CoffeeDetailPresenter";
import { Query } from "react-apollo";
import { CoffeeDetail, CoffeeDetailVariables } from "../../../types/api";
import { COFFEE_DETAIL } from "./CoffeeDetailQueries";
import { withRouter, RouteComponentProps } from "react-router";

class CoffeeDetailQuery extends Query<CoffeeDetail, CoffeeDetailVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  modalOpen: boolean;
}
class CoffeeDetailContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  public render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { modalOpen } = this.state;

    return (
      <CoffeeDetailQuery query={COFFEE_DETAIL} variables={{ coffeeId: id }}>
        {({ data, loading }) => (
          <CoffeeDetailPresenter
            loading={loading}
            data={data}
            modalOpen={modalOpen}
            back={this.back}
          />
        )}
      </CoffeeDetailQuery>
    );
  }
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
}

export default withRouter(CoffeeDetailContainer);
