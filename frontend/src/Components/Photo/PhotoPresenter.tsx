import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import Bold from "../Bold";
import Textarea from "react-expanding-textarea";
import Comment from "../Comment";

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

const Buttons = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.span`
  cursor: pointer;
  &:first-child {
    margin-right: 20px;
  }
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
  newComment
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
          <Buttons>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" />
              </svg>
            </Button>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.144 7.961-9.91 7.961-1.937 0-3.384-.397-4.394-.644-1 .613-1.594 1.037-4.272 1.82.535-1.373.722-2.748.601-4.265-.837-1-2.025-2.4-2.025-4.872 0-4.415 4.486-8.007 10-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.417.345 2.774.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z" />
              </svg>
            </Button>
          </Buttons>
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
