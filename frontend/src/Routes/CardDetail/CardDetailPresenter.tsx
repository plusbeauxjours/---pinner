import React from "react";
import Loader from "src/Components/Loader";
import Wrapper from "src/Components/Wrapper";
import Photo from "src/Components/Photo";
import styled from "styled-components";
import { keyframes } from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 110%;
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
  width: 100;
  max-width: 935px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

interface IProps {
  data: any;
  loading: boolean;
  modalOpen: boolean;
  back: any;
  cardEditMode: boolean;
}

const CardDetailPresenter: React.SFC<IProps> = ({
  data: { cardDetail: { card = null } = {} } = {},
  loading,
  modalOpen,
  back,
  cardEditMode
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && card) {
    console.log(typeof card.id);
    return (
      <ModalContainer>
        <ModalOverlay onClick={back} />
        <Modal>
          <Wrapper>
            <Photo
              cardId={card.id}
              inline={false}
              creatorId={card.creator.id}
              creatorAvatar={card.creator.profile.avatar}
              creatorUsername={card.creator.username}
              isFollowing={card.creator.profile.isFollowing}
              isSelf={card.creator.profile.isSelf}
              country={card.city.country.countryName}
              city={card.city.cityName}
              photoUrl={card.file}
              likeCount={card.likeCount}
              commentCount={card.commentCount}
              caption={card.caption}
              comments={card.comments}
              naturalTime={card.naturalTime}
              isLiked={card.isLiked}
              cardEditMode={cardEditMode}
            />
          </Wrapper>
        </Modal>
      </ModalContainer>
    );
  }
  return null;
};

export default CardDetailPresenter;
