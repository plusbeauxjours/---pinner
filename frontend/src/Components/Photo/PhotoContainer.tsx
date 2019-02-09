import React from "react";
import PhotoPresenter from "./PhotoPresenter";

interface IProps {
  id: string;
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
  public render() {
    const {
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
      />
    );
  }
}

export default PhotoContainer;
