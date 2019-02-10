import React from "react";
import PhotoPresenter from "./PhotoPresenter";

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
}

interface IState {
  newComment: string;
  isLiked: boolean;
  likeCount: number;
}

class PhotoContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      newComment: "",
      isLiked: props.isLiked,
      likeCount: props.likeCount
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
      comments
    } = this.props;
    const { newComment, isLiked, likeCount } = this.state;
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
      />
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
  public onLikeClick = () => {
    const { likeCount, isLiked } = this.props;
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
}

export default PhotoContainer;
