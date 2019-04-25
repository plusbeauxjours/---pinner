import React from "react";
import CardDetailPresenter from "./CardDetailPresenter";
import { Query } from "react-apollo";
import { CardDetail, CardDetailVariables } from "../../types/api";
import { GET_CARD } from "./CardDetailQueries";
import { withRouter, RouteComponentProps } from "react-router";

class CardDetailQuery extends Query<CardDetail, CardDetailVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  editMode: boolean;
}

class CardDetailContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      editMode: state.editMode
    };
  }

  public render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { editMode } = this.state;
    return (
      <CardDetailQuery
        query={GET_CARD}
        variables={{
          cardId: id
        }}
      >
        {({ data, loading }) => (
          <CardDetailPresenter
            loading={loading}
            data={data}
            back={this.back}
            editMode={editMode}
          />
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
