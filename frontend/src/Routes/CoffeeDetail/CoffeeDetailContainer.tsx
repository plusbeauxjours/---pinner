import React from "react";
import CoffeeDetailPresenter from "./CoffeeDetailPresenter";
import { Query } from "react-apollo";
import { CoffeeDetail, CoffeeDetailVariables } from "../../types/api";
import { COFFEE_DETAIL } from "./CoffeeDetailQueries";
import { withRouter } from "react-router";

class CoffeeDetailQuery extends Query<CoffeeDetail, CoffeeDetailVariables> {}

class CoffeeDetailContainer extends React.Component<any> {
  public render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <CoffeeDetailQuery query={COFFEE_DETAIL} variables={{ coffeeId: id }}>
        {({ data, loading }) => (
          <CoffeeDetailPresenter
            loading={loading}
            data={data}
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
