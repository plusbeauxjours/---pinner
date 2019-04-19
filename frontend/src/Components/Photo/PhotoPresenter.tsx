import React from "react";
import styled from "styled-components";
import Bold from "../Bold";
import Textarea from "react-expanding-textarea";
import Comment from "../Comment";
import CardButtons from "../CardButtons";
import { keyframes } from "styled-components";
import UserHeader from "../UserHeader";
import { List } from "src/Icons";
import { MutationFn } from "react-apollo";

const Container = styled.div`
  border: ${props => props.theme.greyColor};
  border-radius: 3px;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const PhotoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    fill: white;
  }
`;

const Image = styled.img`
  max-width: 100%;
  min-width: 100%;
`;

const Caption = styled.div`
  text-align: center;
  font-size: 50px;
  font-family: "Qwigley";
  font-weight: 80;
`;

const Meta = styled.div`
  padding: 10px 15px;
  padding-bottom: 0;
`;

const Comments = styled.div`
  word-break: break-all;
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
  border-radius: 3px;
  overflow: hidden;
  height: 600px;
  border: ${props => props.theme.greyColor};
  */ ${Meta} {
    flex-grow: 1;
    padding: 20px;
    overflow-y: scroll;
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
    height: 350px;
    width: 250px;
    word-break: break-all;
    flex-wrap: nowrap;
    overflow-x: visible;
    overflow-y: auto;
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
  background-color: #2d3a41;
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

const Icon = styled.span`
  margin-right: 15px;
  cursor: pointer;
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
  naturalTime: string;
  comments: any;
  updateNewComment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newComment: string;
  isLiked: boolean;
  onLikeClick: () => void;
  selfComments: any;
  openedComment: boolean;
  toggleCommentClick: () => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onSubmit: any;
  deleteCommentModalOpen: boolean;
  cardMenuModalOpen: boolean;
  deleteCardModalOpen: boolean;

  getCommentId: any;
  isFollowing: boolean;
  isSelf: boolean;
  followUserFn: MutationFn;
  deleteCardFn: MutationFn;
  toggleDeleteCommentModal: () => void;
  toggleCardMenuModal: () => void;
  toggleDeleteCardModal: () => void;
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
  naturalTime,
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
  deleteCommentModalOpen,
  cardMenuModalOpen,
  deleteCardModalOpen,
  toggleDeleteCommentModal,
  toggleCardMenuModal,
  toggleDeleteCardModal,
  getCommentId,
  isFollowing,
  isSelf,
  followUserFn,
  deleteCardFn
}) => {
  if (inline) {
    return (
      <>
        {deleteCommentModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleDeleteCommentModal} />
            <Modal>
              <ModalLink onClick={onSubmit}>Delete Comment</ModalLink>
              <ModalLink onClick={toggleDeleteCommentModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {cardMenuModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCardMenuModal} />
            <Modal>
              <ModalLink onClick={() => console.log("ho?")}>
                Report Card
              </ModalLink>
              <ModalLink onClick={() => followUserFn()}>
                {isFollowing ? "Unfollow" : "Follow"}
              </ModalLink>
              {isSelf && (
                <ModalLink onClick={toggleDeleteCardModal}>
                  Delete Card
                </ModalLink>
              )}
              <ModalLink onClick={toggleCardMenuModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {deleteCardModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleDeleteCardModal} />
            <Modal>
              <ModalLink onClick={() => deleteCardFn()}>Delete Card</ModalLink>
              <ModalLink onClick={toggleDeleteCardModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <Container>
          <PhotoHeader>
            <UserHeader
              username={creatorUsername}
              avatar={creatorAvatar}
              currentCity={city}
              currentCountry={country}
              size={"sm"}
            />
            <Icon onClick={toggleCardMenuModal}>
              <List />
            </Icon>
          </PhotoHeader>
          <Image src={photoUrl} />

          <Caption>{caption}</Caption>
          <Meta>
            <CardButtons
              isLiked={isLiked}
              openedComment={openedComment}
              toggleCommentClick={toggleCommentClick}
              onClick={onLikeClick}
            />
            <Bold text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
            <Comment username={creatorUsername} comment={caption} />
            {openedComment && (
              <Comments>
                {comments &&
                  comments.map(comment => (
                    <Comment
                      id={comment.id}
                      key={comment.id}
                      username={comment.creator.username}
                      comment={comment.message}
                      getCommentId={getCommentId}
                    />
                  ))}
                {selfComments &&
                  selfComments.map(comment => (
                    <Comment
                      id={comment.id}
                      key={comment.id}
                      username={comment.username}
                      comment={comment.message}
                      getCommentId={getCommentId}
                    />
                  ))}
              </Comments>
            )}
            <TimeStamp>{naturalTime}</TimeStamp>
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
        {deleteCommentModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleDeleteCommentModal} />
            <Modal>
              <ModalLink onClick={onSubmit}>Delete Comment</ModalLink>
              <ModalLink onClick={toggleDeleteCommentModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {cardMenuModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCardMenuModal} />
            <Modal>
              <ModalLink onClick={() => console.log("ho?")}>
                Report Card
              </ModalLink>
              <ModalLink onClick={() => followUserFn()}>
                {isFollowing ? "Unfollow" : "Follow"}
              </ModalLink>
              {isSelf && (
                <ModalLink onClick={() => deleteCardFn()}>
                  Delete Card
                </ModalLink>
              )}
              <ModalLink onClick={toggleCardMenuModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {deleteCardModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleDeleteCardModal} />
            <Modal>
              <ModalLink onClick={onSubmit}>Delete Comment</ModalLink>
              <ModalLink onClick={toggleDeleteCardModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <DetailContainer>
          <Image src={photoUrl} />
          <Meta>
            <PhotoHeader>
              <UserHeader
                username={creatorUsername}
                avatar={creatorAvatar}
                currentCity={city}
                currentCountry={country}
              />
              <Icon onClick={toggleCardMenuModal}>
                <List />
              </Icon>
            </PhotoHeader>
            <Comments>
              <Comment username={creatorUsername} comment={caption} />
              {comments &&
                comments.map(comment => (
                  <Comment
                    id={comment.id}
                    key={comment.id}
                    username={comment.creator.username}
                    comment={comment.message}
                    getCommentId={getCommentId}
                  />
                ))}
              {selfComments &&
                selfComments.map(comment => (
                  <Comment
                    id={comment.id}
                    key={comment.id}
                    username={comment.username}
                    comment={comment.message}
                    getCommentId={getCommentId}
                  />
                ))}
            </Comments>
            <CardButtons isLiked={isLiked} onClick={onLikeClick} />
            <Bold text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
            <TimeStamp>{naturalTime}</TimeStamp>
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
