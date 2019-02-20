import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import Bold from "../Bold";
import Textarea from "react-expanding-textarea";
import Comment from "../Comment";
import CardButtons from "../CardButtons";
import { Link } from "react-router-dom";
import { keyframes } from "styled-components";

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
  background-color: white;
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

const DetailContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 3px;
  overflow: hidden;
  height: 600px;
  border: ${props => props.theme.boxBorder};
  ${Meta} {
    flex-grow: 1;
    padding: 20px;
    overflow: scroll;
    ${Header} {
      padding: 0;
      padding-bottom: 20px;
      margin-bottom: 10px;
      border-bottom: 1px solid #efefef;
    }
  }
  ${Image} {
    min-width: 0%;
    width: 550px;
  }
  ${Comments} {
    min-height: 50%;
    overflow: scroll;
    margin-bottom: 30px;
  }
`;
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalAnimation = keyframes`
	  from{
	    opacity:0;
	    transform:scale(1.1);
	  }
	  to{
	    opacity:1;
	    transform:none;
	  }
	`;

const Modal = styled.div`
  background-color: white;
  width: 30%;
  border-radius: 12px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

const ModalLink = styled.div`
  text-align: center;
  min-height: 50px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
`;

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
  createdAt: string;
  comments: any;
  updateNewComment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newComment: string;
  isLiked: boolean;
  onLikeClick: () => void;
  selfComments: any;
  openedComment: boolean;
  toggleCommentClick: () => void;
  onKeyUp: (event: any) => void;
  onSubmit: () => void;
  modalOpen: boolean;
  toggleModal: () => void;
}

const PhotoPresenter: React.SFC<IProps> = ({
  inline = false,
  creatorAvatar,
  creatorUsername,
  country,
  city,
  photoUrl,
  likeCount,
  caption,
  createdAt,
  comments,
  updateNewComment,
  newComment,
  isLiked,
  onLikeClick,
  selfComments,
  openedComment,
  toggleCommentClick,
  onKeyUp,
  onSubmit,
  modalOpen,
  toggleModal
}) => {
  if (inline) {
    return (
      <>
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <ModalLink onClick={onSubmit}>Delete Comment</ModalLink>
              <ModalLink onClick={toggleModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <Container>
          <Header>
            <Link to={`/${creatorUsername}`}>
              <Avatar size="sm" url={creatorAvatar} />
            </Link>
            <HeaderColumn>
              <Link to={`/${creatorUsername}`}>
                <Bold text={creatorUsername} />
              </Link>
              <Location>
                {city}, <Bold text={country} />
              </Location>
            </HeaderColumn>
          </Header>
          <Image src={photoUrl} />
          <Meta>
            <CardButtons
              isLiked={isLiked}
              openedComment={openedComment}
              toggleCommentClick={toggleCommentClick}
              onClick={onLikeClick}
            />
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
                    toggleModal={toggleModal}
                  />
                ))}
              {selfComments &&
                selfComments.map(comment => (
                  <Comment
                    id={comment.id}
                    key={comment.id}
                    username={comment.username}
                    comment={comment.message}
                    toggleModal={toggleModal}
                  />
                ))}
            </Comments>
            <TimeStamp>{createdAt}</TimeStamp>
            {openedComment && (
              <AddComment>
                <STextArea
                  placeholder="Add a comment..."
                  onChange={updateNewComment}
                  value={newComment}
                  onKeyUp={onKeyUp}
                />
              </AddComment>
            )}
          </Meta>
        </Container>
      </>
    );
  } else {
    return (
      <>
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <ModalLink onClick={onSubmit}>Delete Comment</ModalLink>
              <ModalLink onClick={toggleModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <DetailContainer>
          <Image src={photoUrl} />
          <Meta>
            <Header>
              <Link to={`/${creatorUsername}`}>
                <Avatar size="md" url={creatorAvatar} />
              </Link>
              <HeaderColumn>
                <Link to={`/${creatorUsername}`}>
                  <Bold text={creatorUsername} />
                </Link>
                <Location>{country}</Location>
                <Location>{city}</Location>
              </HeaderColumn>
            </Header>
            <Comments>
              <Comment username={creatorUsername} comment={caption} />
              {comments &&
                comments.map(comment => (
                  <Comment
                    id={comment.id}
                    key={comment.id}
                    username={comment.creator.username}
                    comment={comment.message}
                    toggleModal={toggleModal}
                  />
                ))}
              {selfComments &&
                selfComments.map(comment => (
                  <Comment
                    id={comment.id}
                    key={comment.id}
                    username={comment.username}
                    comment={comment.message}
                    toggleModal={toggleModal}
                  />
                ))}
            </Comments>
            <CardButtons isLiked={isLiked} onClick={onLikeClick} />
            <Bold text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
            <TimeStamp>{createdAt}</TimeStamp>
            <AddComment>
              <STextArea
                placeholder="Add a comment..."
                onChange={updateNewComment}
                value={newComment}
                onKeyUp={onKeyUp}
              />
            </AddComment>
          </Meta>
        </DetailContainer>
      </>
    );
  }
};

export default PhotoPresenter;
