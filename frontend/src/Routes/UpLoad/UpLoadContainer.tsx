import React from "react";
import UpLoadPresenter from "./UpLoadPresenter";
import { MutationFn, Mutation } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { UploadCard, UploadCardVariables } from "../../types/api";
import { GET_FEED_CARDS } from "../Feed/FeedQueries";
import { toast } from "react-toastify";
import { UPLOAD_CARD } from "./UpLoadQueries";
import { GET_CARDS } from "../../Components/GetCards/GetCardsQueries";

class UploadMutation extends Mutation<UploadCard, UploadCardVariables> {}

interface IProps extends RouteComponentProps<any> {
  upload: boolean;
}

interface IState {
  caption: string;
  modalOpen: boolean;
}

class UpLoadContainer extends React.Component<IProps, IState> {
  public uploadCardFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      modalOpen: false
    };
  }
  public render() {
    const { upload } = this.props;
    const { caption, modalOpen } = this.state;
    return (
      <UploadMutation
        mutation={UPLOAD_CARD}
        variables={{
          caption
        }}
        onCompleted={this.onCompletedUpload}
        update={this.updateUpload}
      >
        {uploadCardFn => {
          this.uploadCardFn = uploadCardFn;
          return (
            <UpLoadPresenter
              back={this.back}
              uploadNewCard={this.uploadNewCard}
              caption={caption}
              onKeyUp={this.onKeyUp}
              modalOpen={modalOpen}
              upload={upload}
              toggleUploadModal={this.toggleUploadModal}
            />
          );
        }}
      </UploadMutation>
    );
  }
  public toggleUploadModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };
  public updateUpload = (cache, { data: { uploadCard } }) => {
    const cityName = localStorage.getItem("cityName");
    const {
      match: {
        params: { username }
      }
    } = this.props;
    try {
      const cardData = cache.readQuery({
        query: GET_CARDS,
        variables: { userName: username, location: "user" }
      });
      if (cardData) {
        cardData.getCards.cards.unshift(uploadCard.card);
        cache.writeQuery({
          query: GET_CARDS,
          variables: { userName: username, location: "user" },
          data: cardData
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const feedData = cache.readQuery({
        query: GET_FEED_CARDS,
        variables: { cityName }
      });
      if (feedData) {
        feedData.getFeedCards.cards.unshift(uploadCard.card);
        cache.writeQuery({
          query: GET_FEED_CARDS,
          variables: { cityName },
          data: feedData
        });
      }
      console.log(feedData);
    } catch (e) {
      console.log(e);
    }
  };
  public onCompletedUpload = data => {
    if (data.uploadCard.card) {
      toast.success("Card uploaded");
    } else {
      toast.error("error");
    }
    this.setState({
      caption: "",
      modalOpen: false
    });
  };
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
  public uploadNewCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    this.setState({
      caption: value
    } as any);
  };
  public onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      this.setState({
        modalOpen: false
      });
      this.uploadCardFn();
    } else {
      return;
    }
  };
}

export default withRouter(UpLoadContainer);
