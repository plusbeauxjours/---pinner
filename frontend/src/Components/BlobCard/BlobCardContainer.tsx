import React from "react";
import BlobCardPresenter from "./BlobCardPresenter";

interface IProps {
  id?: string;
  likeCount?: number;
  commentCount?: number;
  borderRadius: string;
  bgColor?: string;
  font?: string;
  fontColor?: string;
  fontSize?: string;
}

class BlobCardContainer extends React.Component<IProps> {
  public render() {
    const {
      id,
      likeCount,
      commentCount,
      borderRadius,
      bgColor,
      font,
      fontColor,
      fontSize
    } = this.props;
    return (
      <BlobCardPresenter
        id={id}
        likeCount={likeCount}
        commentCount={commentCount}
        borderRadius={borderRadius}
        bgColor={bgColor}
        font={font}
        fontColor={fontColor}
        fontSize={fontSize}
      />
    );
  }
}

export default BlobCardContainer;
