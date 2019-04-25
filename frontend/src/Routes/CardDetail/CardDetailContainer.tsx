import React from "react";
import CardDetailPresenter from "./CardDetailPresenter";
import { Query } from "react-apollo";
import { CardDetail, CardDetailVariables } from "../../types/api";
import { GET_CARD } from "./CardDetailQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { toast } from "react-toastify";

class CardDetailQuery extends Query<CardDetail, CardDetailVariables> {}

interface IProps extends RouteComponentProps<any> {
  cardEditMode: boolean;
  caption: string;
}

interface IState {
  modalOpen: boolean;
  cardEditMode: boolean;
  caption: string;
}

class CardDetailContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      cardEditMode: props.cardEditMode,
      caption: props.caption
    };
  }

  public render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { modalOpen, cardEditMode } = this.state;
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
            modalOpen={modalOpen}
            cardEditMode={cardEditMode}
          />
        )}
      </CardDetailQuery>
    );
  }
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
  public onCompletedEditCard = data => {
    const { cardEditMode } = this.state;
    if (data.editCard.ok) {
      toast.success("Card edited");
    } else {
      toast.error("error");
    }
    this.setState({
      cardEditMode: !cardEditMode,
      caption: ""
    });
  };
}

export default withRouter(CardDetailContainer);
