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
import Me from "../Me";

class AddCommentMutation extends Mutation<AddComment, AddCommentVariables> {}
class DeleteCommentMutation extends Mutation<
  DeleteComment,
  DeleteCommentVariables
> {}
class ToggleLikeMutation extends Mutation<LikeCard, LikeCardVariables> {}
class FollowMutation extends Mutation<FollowUser, FollowUserVariables> {}
class DeleteCardMutation extends Mutation<DeleteCard, DeleteCardVariables> {}

interface IProps {
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
  comments: any;
  isLiked: boolean;
  id: string;
  creatorId?: string;
  isFollowing?: boolean;
  isSelf?: boolean;
}

interface IState {
  userId: string;
  cardId: string;
  commentId: string;
  modalOpen: boolean;
  modalMenuOpen: boolean;
  newComment: string;
  selfComments: any;
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
      cardId: props.id,
      commentId: null,
      modalOpen: false,
      modalMenuOpen: false,
      newComment: null,
      openedComment: false,
      selfComments: [],
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
      naturalTime,
      comments
    } = this.props;
    const {
      userId,
      cardId,
      commentId,
      modalOpen,
      modalMenuOpen,
      newComment,
      openedComment,
      selfComments,
      likeCount,
      isSelf,
      isLiked,
      isFollowing
    } = this.state;
    return (
      <Me>
        {user => (
          <AddCommentMutation
            mutation={ADD_COMMENT}
            variables={{ cardId: parseInt(cardId, 10), message: newComment }}
            onCompleted={this.addSelfComment}
          >
            {addCommentFn => {
              this.addCommentFn = addCommentFn;
              return (
                <FollowMutation
                  mutation={FOLLOW_USER}
                  variables={{ userId: parseInt(userId, 10) }}
                  onCompleted={() =>
                    this.setState({ modalMenuOpen: !modalMenuOpen })
                  }
                >
                  {followUserFn => (
                    <DeleteCommentMutation
                      mutation={DELETE_COMMENT}
                      variables={{
                        cardId: parseInt(cardId, 10),
                        commentId: parseInt(commentId, 10)
                      }}
                      onCompleted={() => this.setState({ commentId: "" })}
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
                                  onCompleted={() =>
                                    this.setState({
                                      modalMenuOpen: !modalMenuOpen
                                    })
                                  }
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
                                        comments={comments}
                                        updateNewComment={this.updateNewComment}
                                        newComment={newComment}
                                        isLiked={isLiked}
                                        onLikeClick={this.onLikeClick}
                                        selfComments={selfComments}
                                        toggleCommentClick={
                                          this.toggleCommentClick
                                        }
                                        openedComment={openedComment}
                                        onKeyUp={this.onKeyUp}
                                        onSubmit={this.onSubmit}
                                        modalOpen={modalOpen}
                                        modalMenuOpen={modalMenuOpen}
                                        toggleModal={this.toggleModal}
                                        toggleMenuModal={this.toggleMenuModal}
                                        getCommentId={this.getCommentId}
                                        isFollowing={isFollowing}
                                        isSelf={isSelf}
                                        followUserFn={followUserFn}
                                        deleteCardFn={deleteCardFn}
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
        )}
      </Me>
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
  public onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
  public addSelfComment = data => {
    const { selfComments, newComment } = this.state;
    const {
      addComment: { comment }
    } = data;
    console.log(comment);
    if (comment) {
      this.setState({
        selfComments: [
          ...selfComments,
          {
            id: comment.id,
            username: comment.creator.username,
            message: newComment
          }
        ],
        newComment: null
      });
    }
  };
  public toggleModal = () => {
    this.setState(state => {
      return {
        modalOpen: !state.modalOpen
      };
    });
  };
  public toggleMenuModal = () => {
    this.setState(state => {
      return {
        modalMenuOpen: !state.modalMenuOpen
      };
    });
    {
      console.log(this.state);
    }
  };
  public getCommentId = commentId => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen,
      commentId
    } as any);
  };
  public onSubmit = () => {
    const { id: cardId } = this.props;
    const { commentId, modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
    this.deleteCommentFn({
      variables: {
        cardId,
        commentId
      }
    });
    console.log(this.state);
  };
}

export default PhotoContainer;
