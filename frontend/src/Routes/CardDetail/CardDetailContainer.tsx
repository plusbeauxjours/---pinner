import React from "react";
import CardDetailPresenter from "./CardDetailPresenter";
import { Query } from "react-apollo";
import { cardDetail, cardDetailVariables } from "../../types/api";
import { GET_CARD } from "./CardDetailQueries";
import { withRouter } from "react-router";

class CardDetailQuery extends Query<cardDetail, cardDetailVariables> {}

class CardDetailContainer extends React.Component<any> {
  public render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <CardDetailQuery query={GET_CARD} variables={{ id }}>
        {({ data, loading }) => (
          <CardDetailPresenter loading={loading} data={data} back={this.back} />
        )}
      </CardDetailQuery>
    );
  }
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
}

export default withRouter(CardDetailContainer);
