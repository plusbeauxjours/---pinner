import React from "react";
import { Query } from "react-apollo";
import {
  GetNotifictions,
  GetNotifictionsVariables,
  cardDetail,
  cardDetailVariables
} from "../../types/api";

import NotificationPresenter from "./NotificationPresenter";
import { GET_NOTIFICATION } from "./NotificationQueries";
import { GET_CARD } from "../CardDetail/CardDetailQueries";

class GetNotifictionQuery extends Query<
  GetNotifictions,
  GetNotifictionsVariables
> {}
class CardDetailQuery extends Query<cardDetail, cardDetailVariables> {}

interface IState {
  cardId: string;
  page: number;
  modalOpen: boolean;
}

class NotificationContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      cardId: "",
      page: 0,
      modalOpen: false
    };
  }
  public render() {
    const { page, modalOpen, cardId } = this.state;
    return (
      <GetNotifictionQuery query={GET_NOTIFICATION} variables={{ page }}>
        {({ data: notificationData }) => (
          <CardDetailQuery
            query={GET_CARD}
            variables={{ id: parseInt(cardId, 10) }}
          >
            {({ data: cardData, loading }) => (
              <NotificationPresenter
                notificationData={notificationData}
                cardData={cardData}
                loading={loading}
                modalOpen={modalOpen}
                toggleModal={this.toggleModal}
                getCardId={this.getCardId}
              />
            )}
          </CardDetailQuery>
        )}
      </GetNotifictionQuery>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };
  public getCardId = cardId => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen,
      cardId
    } as any);
  };
}

export default NotificationContainer;
