import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import Bold from "../Bold";
import Textarea from "react-expanding-textarea";
import Comment from "../Comment";
import PhotoButtons from "../PhotoButtons";

const Container = styled.div`
  background-color: white;
  border: ${props => props.theme.boxBorder};
  border-radius: 3px;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const Location = styled.span`
  margin-top: 5px;
  display: block;
  font-size: 12px;
`;

const Image = styled.img`
  max-width: 100%;
  min-width: 100%;
`;

const Meta = styled.div`
  padding: 10px 15px;
  padding-bottom: 0;
`;

const Comments = styled.div`
  margin-top: 10px;
`;

const AddComment = styled.div`
  border-top: 1px solid #efefef;
  margin-top: 10px;
`;

const TimeStamp = styled.span`
  text-transform: uppercase;
  font-size: 10px;
  line-height: 18px;
  margin-top: 10px;
  display: block;
  color: ${props => props.theme.greyColor};
`;

const STextArea = styled(Textarea)`
  width: 100%;
  border: 0;
  resize: none;
  font-size: 14px;
  padding: 15px 0px;
`;

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
  updateNewComment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newComment: string;
  isLiked: boolean;
  onLikeClick: () => void;
}

const PhotoPresenter: React.SFC<IProps> = ({
  id,
  inline = false,
  creatorAvatar,
  creatorUsername,
  location,
  photoUrl,
  likeCount,
  commentCount,
  caption,
  createdAt,
  comments,
  updateNewComment,
  newComment,
  isLiked,
  onLikeClick
}) => {
  if (inline) {
    return (
      <Container>
        <Header>
          <Avatar size="sm" url={creatorAvatar} />
          <HeaderColumn>
            <Bold text={creatorUsername} />
            <Location>{location}</Location>
          </HeaderColumn>
        </Header>
        <Image src={photoUrl} />
        <Meta>
          <PhotoButtons isLiked={isLiked} onClick={onLikeClick} />
          <Bold text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
          <Comments>
            <Comment username={creatorUsername} comment={caption} />
            {comments &&
              comments.map(comment => (
                <Comment
                  id={comment.id}
                  key={comment.id}
                  username={comment.creator.username}
                  comment={comment.message}
                />
              ))}
          </Comments>
          <TimeStamp>{createdAt}</TimeStamp>
          <AddComment>
            <STextArea
              placeholder="Add a comment..."
              onChange={updateNewComment}
              value={newComment}
            />
          </AddComment>
        </Meta>
      </Container>
    );
  } else {
    return null;
  }
};

export default PhotoPresenter;
