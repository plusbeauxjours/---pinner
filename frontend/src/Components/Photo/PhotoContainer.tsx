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
    const { inline } = this.props;
    console.log(this.props);
    return <PhotoPresenter inline={inline} />;
  }
}

export default PhotoContainer;
