import React from "react";
import PhotoPresenter from "./PhotoPresenter";

interface IProps {
  id: number;
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
}

class PhotoContainer extends React.Component<IProps> {
  public state = {
    newComment: ""
  };
  public render() {
    const {
      id,
      inline,
      creatorAvatar,
      creatorUsername,
      location,
      photoUrl,
      likeCount,
      commentCount,
      caption,
      createdAt,
      comments
    } = this.props;
    const { newComment } = this.state;
    return (
      <PhotoPresenter
        id={id}
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
}

export default PhotoContainer;
