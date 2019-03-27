import React from "react";
import Loader from "src/Components/Loader";
import Wrapper from "src/Components/Wrapper";
import Photo from "src/Components/Photo";
import { CardDetail } from "src/types/api";
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
  data: CardDetail;
  loading: boolean;
  back: any;
}

const CardDetailPresenter: React.SFC<IProps> = ({
  data: { cardDetail: { card = null } = {} } = {},
  loading,
  back
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
              id={card.id}
              inline={false}
              creatorAvatar={card.creator.profile.avatar}
              creatorUsername={card.creator.username}
              country={card.country.countryName}
              city={card.city.cityName}
              photoUrl={card.file}
              likeCount={card.likeCount}
              commentCount={card.commentCount}
              caption={card.caption}
              comments={card.comments}
              createdAt={card.createdAt}
              isLiked={card.isLiked}
            />
          </Wrapper>
        </Modal>
      </ModalContainer>
    );
  }
  return null;
};

export default CardDetailPresenter;
