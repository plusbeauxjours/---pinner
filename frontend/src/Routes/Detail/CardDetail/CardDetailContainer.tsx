import React from "react";
import CardDetailPresenter from "./CardDetailPresenter";
import { Query } from "react-apollo";
import { CardDetail, CardDetailVariables } from "../../../types/api";
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
    console.log(props);
    this.state = {
      editMode: false
    };
  }

  public componentDidMount() {
    const { location: { state = {} } = {} } = ({} = this.props);
    if (this.props.history.action === "POP") {
      this.setState({ editMode: false });
    } else if (this.props.history.action === "PUSH") {
      this.setState({ editMode: state.editMode });
    }
  }

  public render() {
    const {
      match: {
        params: { id: cardId }
      }
    } = this.props;
    const { editMode } = this.state;
    return (
      <CardDetailQuery
        query={GET_CARD}
        variables={{
          cardId
        }}
      >
        {({ data, loading }) => (
          <CardDetailPresenter
            loading={loading}
            data={data}
            back={this.back}
            editMode={editMode}
            closeEditMode={this.closeEditMode}
          />
        )}
      </CardDetailQuery>
    );
  }
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
  public closeEditMode = () => {
    this.setState({
      editMode: false
    });
  };
}

export default withRouter(CardDetailContainer);
