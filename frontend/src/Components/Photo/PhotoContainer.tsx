import React from "react";
import PhotoPresenter from "./PhotoPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { TOGGLE_LIKE_CARD, ADD_COMMENT } from "./PhotoQueries";
import {
  likeCard,
  likeCardVariables,
  addComment,
  addCommentVariables
} from "src/types/api";

class AddCommentMutation extends Mutation<addComment, addCommentVariables> {}
class ToggleLikeMutation extends Mutation<likeCard, likeCardVariables> {}

interface IProps {
  inline: boolean;
  creatorAvatar: string;
  creatorUsername: string;
  location: string;
  photoUrl: string;
  likeCount: number;
  commentCount: number;
  caption: string;
  createdAt: string;
  comments: any;
  isLiked: boolean;
  id: string;
}

interface IState {
  newComment: string;
  isLiked: boolean;
  likeCount: number;
  selfComments: any;
  openedComment: boolean;
}

class PhotoContainer extends React.Component<IProps, IState> {
  public addCommentFn: MutationFn;
  public toggleLikeFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      newComment: "",
      isLiked: props.isLiked,
      openedComment: false,
      likeCount: props.likeCount,
      selfComments: []
    };
  }
  public render() {
    const {
      inline,
      creatorAvatar,
      creatorUsername,
      location,
      photoUrl,
      commentCount,
      caption,
      createdAt,
      comments,
      id
    } = this.props;
    const {
      newComment,
      isLiked,
      openedComment,
      likeCount,
      selfComments
    } = this.state;
    return (
      <AddCommentMutation
        mutation={ADD_COMMENT}
        variables={{ cardId: parseInt(id, 10), message: newComment }}
        onCompleted={this.addSelfComment}
      >
        {addCommentFn => {
          this.addCommentFn = addCommentFn;
          return (
            <ToggleLikeMutation
              mutation={TOGGLE_LIKE_CARD}
              variables={{ cardId: parseInt(id, 10) }}
            >
              {toggleLikeFn => {
                this.toggleLikeFn = toggleLikeFn;
                return (
                  <PhotoPresenter
                    inline={inline}
                    creatorAvatar={creatorAvatar}
                    creatorUsername={creatorUsername}
                    location={location}
                    photoUrl={photoUrl}
                    likeCount={likeCount}
                    commentCount={commentCount}
                    caption={caption}
                    createdAt={createdAt}
                    comments={comments}
                    updateNewComment={this.updateNewComment}
                    newComment={newComment}
                    isLiked={isLiked}
                    onLikeClick={this.onLikeClick}
                    selfComments={selfComments}
                    toggleCommentClick={this.toggleCommentClick}
                    openedComment={openedComment}
                    onKeyUp={this.onKeyUp}
                  />
                );
              }}
            </ToggleLikeMutation>
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
  public onKeyUp = event => {
    const { keyCode } = event;
    if (keyCode === 13) {
      this.addCommentFn();
    } else {
      return null;
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
    const { newComment } = this.state;
    const {
      addComment: { comment }
    } = data;
    if (comment) {
      this.setState(state => {
        return {
          selfComments: [
            ...state.selfComments,
            {
              id: comment.id,
              username: comment.creator.username,
              message: newComment
            }
          ],
          newComment: ""
        };
      });
    }
  };
}

export default PhotoContainer;
