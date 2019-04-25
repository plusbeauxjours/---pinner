import React from "react";
import PhotoPresenter from "./PhotoPresenter";
import { Mutation, MutationFn } from "react-apollo";
import {
  TOGGLE_LIKE_CARD,
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_CARD
} from "./PhotoQueries";
import {
  DeleteComment,
  DeleteCommentVariables,
  FollowUser,
  FollowUserVariables,
  DeleteCardVariables,
  DeleteCard,
  LikeCard,
  LikeCardVariables,
  AddComment,
  AddCommentVariables
} from "../../types/api";
import { FOLLOW_USER } from "../FollowBtn/FollowBtnQueries";
import { GET_FEED } from "../../../../frontend/src/Routes/Feed/FeedQueries";
import { toast } from "react-toastify";
import { withRouter, RouteComponentProps } from "react-router";
import { GET_USER } from "../../Routes/UserProfile/UserProfileQueries";
import { GET_COMMENTS } from "../Comments/CommentsQueries";

class AddCommentMutation extends Mutation<AddComment, AddCommentVariables> {}
class DeleteCommentMutation extends Mutation<
  DeleteComment,
  DeleteCommentVariables
> {}
class ToggleLikeMutation extends Mutation<LikeCard, LikeCardVariables> {}
class FollowMutation extends Mutation<FollowUser, FollowUserVariables> {}
class DeleteCardMutation extends Mutation<DeleteCard, DeleteCardVariables> {}

interface IProps extends RouteComponentProps {
  inline: boolean;
  creatorAvatar: string;
  creatorUsername: string;
  country: string;
  city: string;
  photoUrl: string;
  likeCount: number;
  commentCount: number;
  caption: string;
  naturalTime: string;
  isLiked: boolean;
  cardId: string;
  creatorId?: string;
  isFollowing?: boolean;
  isSelf?: boolean;
  currentCity?: string;
  page?: number;
}

interface IState {
  userId: string;
  cardId: string;
  commentId: string;
  deleteCommentModalOpen: boolean;
  cardMenuModalOpen: boolean;
  newComment: string;
  openedComment: boolean;
  likeCount: number;
  isSelf: boolean;
  isLiked: boolean;
  isFollowing: boolean;
}

class PhotoContainer extends React.Component<IProps, IState> {
  public addCommentFn: MutationFn;
  public deleteCommentFn: MutationFn;
  public toggleLikeFn: MutationFn;
  public deleteCardFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      userId: props.creatorId,
      cardId: props.cardId,
      commentId: null,
      deleteCommentModalOpen: false,
      cardMenuModalOpen: false,
      newComment: "",
      openedComment: false,
      likeCount: props.likeCount,
      isSelf: props.isSelf,
      isLiked: props.isLiked,
      isFollowing: props.isFollowing
    };
  }
  public render() {
    const {
      inline,
      creatorAvatar,
      creatorUsername,
      country,
      city,
      photoUrl,
      commentCount,
      caption,
      naturalTime
    } = this.props;
    const {
      userId,
      cardId,
      commentId,
      deleteCommentModalOpen,
      cardMenuModalOpen,
      newComment,
      openedComment,
      likeCount,
      isSelf,
      isLiked,
      isFollowing
    } = this.state;
    return (
      <AddCommentMutation
        mutation={ADD_COMMENT}
        variables={{ cardId: parseInt(cardId, 10), message: newComment }}
        onCompleted={this.onCompletedAddComment}
        update={this.updateAddComment}
      >
        {addCommentFn => {
          this.addCommentFn = addCommentFn;
          return (
            <FollowMutation
              mutation={FOLLOW_USER}
              variables={{ userId: parseInt(userId, 10) }}
              onCompleted={() =>
                this.setState({
                  cardMenuModalOpen: !cardMenuModalOpen,
                  isFollowing: !isFollowing
                })
              }
            >
              {followUserFn => (
                <DeleteCommentMutation
                  mutation={DELETE_COMMENT}
                  variables={{
                    cardId: parseInt(cardId, 10),
                    commentId: parseInt(commentId, 10)
                  }}
                  onCompleted={this.onCompletedDeleteComment}
                  update={this.updateDeleteComment}
                >
                  {deleteCommentFn => {
                    this.deleteCommentFn = deleteCommentFn;
                    return (
                      <ToggleLikeMutation
                        mutation={TOGGLE_LIKE_CARD}
                        variables={{ cardId: parseInt(cardId, 10) }}
                      >
                        {toggleLikeFn => {
                          this.toggleLikeFn = toggleLikeFn;
                          return (
                            <DeleteCardMutation
                              mutation={DELETE_CARD}
                              variables={{ cardId: parseInt(cardId, 10) }}
                              onCompleted={this.onCompletedDeleteCard}
                              update={this.updateDeleteCard}
                            >
                              {deleteCardFn => {
                                this.deleteCardFn = deleteCardFn;
                                return (
                                  <PhotoPresenter
                                    inline={inline}
                                    creatorAvatar={creatorAvatar}
                                    creatorUsername={creatorUsername}
                                    country={country}
                                    city={city}
                                    photoUrl={photoUrl}
                                    likeCount={likeCount}
                                    commentCount={commentCount}
                                    caption={caption}
                                    naturalTime={naturalTime}
                                    updateNewComment={this.updateNewComment}
                                    newComment={newComment}
                                    isLiked={isLiked}
                                    onLikeClick={this.onLikeClick}
                                    toggleCommentClick={this.toggleCommentClick}
                                    openedComment={openedComment}
                                    addCommentOnKeyUp={this.addCommentOnKeyUp}
                                    onSubmit={this.onSubmit}
                                    deleteCommentModalOpen={
                                      deleteCommentModalOpen
                                    }
                                    cardMenuModalOpen={cardMenuModalOpen}
                                    toggleDeleteCommentModal={
                                      this.toggleDeleteCommentModal
                                    }
                                    toggleCardMenuModal={
                                      this.toggleCardMenuModal
                                    }
                                    deleteCommentGetId={this.deleteCommentGetId}
                                    isFollowing={isFollowing}
                                    isSelf={isSelf}
                                    followUserFn={followUserFn}
                                    deleteCardFn={deleteCardFn}
                                    cardId={cardId}
                                  />
                                );
                              }}
                            </DeleteCardMutation>
                          );
                        }}
                      </ToggleLikeMutation>
                    );
                  }}
                </DeleteCommentMutation>
              )}
            </FollowMutation>
          );
        }}
      </AddCommentMutation>
    );
  }
  public updateNewComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    this.setState({
      newComment: value
    } as any);
  };
  public addCommentOnKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      this.addCommentFn();
    } else {
      return;
    }
  };
  public onLikeClick = () => {
    const { likeCount, isLiked } = this.props;
    this.toggleLikeFn();
    this.setState(state => {
      let likeNumber;
      if (!isLiked) {
        if (likeCount === state.likeCount) {
          likeNumber = likeCount + 1;
        } else {
          likeNumber = likeCount;
        }
      } else {
        if (likeCount === state.likeCount) {
          likeNumber = likeCount - 1;
        } else {
          likeNumber = likeCount;
        }
      }
      return {
        isLiked: !state.isLiked,
        likeCount: likeNumber
      };
    });
  };
  public toggleCommentClick = () => {
    this.setState(state => {
      return {
        openedComment: !state.openedComment
      };
    });
  };
  public onCompletedAddComment = data => {
    if (data.addComment.comment) {
      toast.success("Comment added");
    } else {
      toast.error("error");
    }
    this.setState({
      newComment: ""
    });
  };
  public updateAddComment = (cache, { data: { addComment } }) => {
    const { cardId } = this.state;
    try {
      const data = cache.readQuery({
        query: GET_COMMENTS,
        variables: {
          cardId: parseInt(cardId, 10)
        }
      });
      console.log(data);
      if (data) {
        data.getComments.comments.push(addComment.comment);
        cache.writeQuery({
          query: GET_COMMENTS,
          variables: {
            cardId: parseInt(cardId, 10)
          },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public toggleDeleteCommentModal = () => {
    const { deleteCommentModalOpen } = this.state;
    this.setState({
      deleteCommentModalOpen: !deleteCommentModalOpen
    });
  };
  public toggleCardMenuModal = () => {
    const { cardMenuModalOpen } = this.state;
    this.setState({
      cardMenuModalOpen: !cardMenuModalOpen
    });
  };

  public deleteCommentGetId = commentId => {
    const { deleteCommentModalOpen } = this.state;
    this.setState({
      deleteCommentModalOpen: !deleteCommentModalOpen,
      commentId
    } as any);
  };
  public onSubmit = () => {
    const { cardId } = this.props;
    const { commentId } = this.state;
    this.deleteCommentFn({
      variables: {
        cardId,
        commentId
      }
    });
    this.setState({
      commentId: null
    });
  };
  public onCompletedDeleteCard = data => {
    const { cardMenuModalOpen } = this.state;
    if (data.deleteCard.ok) {
      toast.success("Card deleted");
    } else {
      toast.error("error");
    }
    this.setState({
      cardMenuModalOpen: !cardMenuModalOpen
    });
    this.props.history.goBack();
  };
  public updateDeleteCard = (cache, { data: { deleteCard } }) => {
    const { page, currentCity, creatorUsername } = this.props;

    try {
      const feedData = cache.readQuery({
        query: GET_FEED,
        variables: {
          cityName: currentCity || localStorage.getItem("cityName"),
          page: page || 0
        }
      });
      if (feedData) {
        feedData.feed.cards = feedData.feed.cards.filter(
          i => parseInt(i.id, 10) !== deleteCard.cardId
        );
        cache.writeQuery({
          query: GET_FEED,
          variables: {
            cityName: currentCity || localStorage.getItem("cityName"),
            page: page || 0
          },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const userData = cache.readQuery({
        query: GET_USER,
        variables: {
          username: creatorUsername
        }
      });
      if (userData) {
        userData.userProfile.user.cards = userData.userProfile.user.cards.filter(
          i => parseInt(i.id, 10) !== deleteCard.cardId
        );
        cache.writeQuery({
          query: GET_USER,
          username: creatorUsername,
          data: userData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public onCompletedDeleteComment = data => {
    const { deleteCommentModalOpen } = this.state;
    if (data.deleteComment.ok) {
      toast.success("Comment deleted");
    } else {
      toast.error("error");
    }
    this.setState({
      deleteCommentModalOpen: !deleteCommentModalOpen
    });
  };
  public updateDeleteComment = (cache, { data: { deleteComment } }) => {
    const { cardId, commentId } = deleteComment;
    console.log(deleteComment);
    try {
      const data = cache.readQuery({
        query: GET_COMMENTS,
        variables: {
          cardId
        }
      });
      console.log(data);
      if (data) {
        data.getComments.comments = data.getComments.comments.filter(
          i => parseInt(i.id, 10) !== parseInt(commentId, 10)
        );
        console.log(data);

        cache.writeQuery({
          query: GET_COMMENTS,
          variables: {
            cardId
          },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default withRouter(PhotoContainer);
