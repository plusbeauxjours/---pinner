import React from "react";
import styled from "styled-components";
import Bold from "../Bold";
import Textarea from "react-expanding-textarea";
import CardButtons from "../CardButtons";
import { keyframes } from "styled-components";
import UserHeader from "../UserHeader";
import { List } from "src/Icons";
import { MutationFn } from "react-apollo";
import Comments from "../../Components/Comments";
import Input from "../Input";
import { BACKEND_URL } from "../../constants";

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

const Message = styled.div`
  text-align: center;
  font-size: 50px;
  font-family: "Qwigley";
  font-weight: 80;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 15px;
  padding-bottom: 0;
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
  font-size: 12px;
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
  background-color: rgba(0, 0, 0, 0.75);
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

const CaptionContainer = styled.div`
  display: flex;
  margin-bottom: 7px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SText = styled(Bold)`
  margin-right: 5px;
`;

const Caption = styled.div`
  word-break: break-all;
  margin-top: 10px;
`;

const Icon = styled.span`
  margin-right: 15px;
  cursor: pointer;
`;

const ExtendedInput = styled(Input)`
  width: 287px;
  height: 48px;
`;

const Front = styled.div``;

const Back = styled.div``;

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
  updateNewComment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newComment: string;
  isLiked: boolean;
  onLikeClick: () => void;
  openedComment: boolean;
  toggleCommentClick: () => void;
  addCommentOnKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onSubmit: any;
  deleteCommentModalOpen: boolean;
  cardMenuModalOpen: boolean;

  deleteCommentGetId: any;
  isFollowing: boolean;
  isSelf: boolean;
  followUserFn: MutationFn;
  deleteCardFn: MutationFn;
  toggleDeleteCommentModal: () => void;
  toggleCardMenuModal: () => void;
  cardId: string;
  editCardLink: () => void;
  editCardCaption: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editCardOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  toggleEditCardMode: () => void;
  editMode: boolean;
  cardEditMode: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cityName: string;
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
  commentCount,
  updateNewComment,
  newComment,
  isLiked,
  onLikeClick,
  openedComment,
  toggleCommentClick,
  addCommentOnKeyUp,
  onSubmit,
  deleteCommentModalOpen,
  cardMenuModalOpen,
  toggleDeleteCommentModal,
  toggleCardMenuModal,
  deleteCommentGetId,
  isFollowing,
  isSelf,
  followUserFn,
  deleteCardFn,
  cardId,
  editCardLink,
  editCardCaption,
  editCardOnKeyUp,
  toggleEditCardMode,
  editMode,
  cardEditMode,
  onInputChange,
  cityName
}) => {
  if (inline) {
    return (
      <>
        {deleteCommentModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleDeleteCommentModal} />
            <Modal>
              <ModalLink onClick={onSubmit}>Delete Comment</ModalLink>
              <ModalLink onClick={toggleDeleteCommentModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {cardMenuModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCardMenuModal} />
            <Modal>
              {isSelf ? (
                <>
                  <ModalLink onClick={editCardLink}>EDIT CARD</ModalLink>
                  <ModalLink onClick={() => deleteCardFn()}>
                    DELETE CARD
                  </ModalLink>
                </>
              ) : (
                <>
                  <ModalLink onClick={() => console.log("REPORT CARD")}>
                    REPORT CARD
                  </ModalLink>
                  <ModalLink onClick={() => followUserFn()}>
                    {isFollowing ? "UNFOLLOW" : "FOLLOW"}
                  </ModalLink>
                </>
              )}

              <ModalLink onClick={toggleCardMenuModal}>CANCEL</ModalLink>
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
          <Image src={`${BACKEND_URL}/media/${photoUrl}`} />
          <Message>{caption}</Message>
          <Meta>
            <CardButtons
              isLiked={isLiked}
              openedComment={openedComment}
              toggleCommentClick={toggleCommentClick}
              onClick={onLikeClick}
            />
            <Bold text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
            <CaptionContainer>
              <Caption>
                <SText text={creatorUsername} />
                {caption}
              </Caption>
            </CaptionContainer>
            {!openedComment && (
              <TimeStamp>See {commentCount}Comments</TimeStamp>
            )}
            <TimeStamp>{naturalTime}</TimeStamp>
            {openedComment && (
              <>
                <Comments
                  openedComment={openedComment}
                  deleteCommentGetId={deleteCommentGetId}
                  cardId={cardId}
                />
                <AddComment>
                  <STextArea
                    autoFocus={true}
                    placeholder="Add a comment..."
                    onChange={updateNewComment}
                    value={newComment}
                    onKeyUp={addCommentOnKeyUp}
                  />
                </AddComment>
              </>
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
              <ModalLink onClick={toggleDeleteCommentModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {cardMenuModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleCardMenuModal} />
            <Modal>
              {isSelf ? (
                <>
                  <ModalLink onClick={toggleEditCardMode}>EDIT CARD</ModalLink>
                  <ModalLink onClick={() => deleteCardFn()}>
                    DELETE CARD
                  </ModalLink>
                </>
              ) : (
                <>
                  <ModalLink onClick={() => console.log("REPORT CARD")}>
                    REPORT CARD
                  </ModalLink>
                  <ModalLink onClick={() => followUserFn()}>
                    {isFollowing ? "UNFOLLOW" : "FOLLOW"}
                  </ModalLink>
                </>
              )}

              <ModalLink onClick={toggleCardMenuModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <DetailContainer>
          <Image src={`${BACKEND_URL}/media/${photoUrl}`} />
          <Meta>
            <Front>
              <PhotoHeader>
                <UserHeader
                  username={creatorUsername}
                  avatar={creatorAvatar}
                  currentCity={city}
                  currentCountry={country}
                  editMode={editMode}
                  cardEditMode={cardEditMode}
                  editCardOnKeyUp={editCardOnKeyUp}
                  onInputChange={onInputChange}
                  cityName={cityName}
                />
                <Icon onClick={toggleCardMenuModal}>
                  <List />
                </Icon>
              </PhotoHeader>
              <CaptionContainer>
                <Caption>
                  <SText text={creatorUsername} />
                  {editMode || cardEditMode ? (
                    <ExtendedInput
                      onChange={onInputChange}
                      type={"text"}
                      value={caption}
                      placeholder={caption}
                      name={"caption"}
                      onKeyUp={editCardOnKeyUp}
                    />
                  ) : (
                    <>{caption}</>
                  )}
                </Caption>
              </CaptionContainer>
              {!openedComment && (
                <TimeStamp>See {commentCount}Comments</TimeStamp>
              )}
              <Comments
                openedComment={openedComment}
                deleteCommentGetId={deleteCommentGetId}
                cardId={cardId}
              />
            </Front>
            <Back>
              <CardButtons
                isLiked={isLiked}
                openedComment={openedComment}
                toggleCommentClick={toggleCommentClick}
                onClick={onLikeClick}
              />
              <Bold text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
              <TimeStamp>{naturalTime}</TimeStamp>
              <AddComment>
                <STextArea
                  placeholder="Add a comment..."
                  onChange={updateNewComment}
                  value={newComment}
                  onKeyUp={addCommentOnKeyUp}
                />
              </AddComment>
            </Back>
          </Meta>
        </DetailContainer>
      </>
    );
  }
};

export default PhotoPresenter;
