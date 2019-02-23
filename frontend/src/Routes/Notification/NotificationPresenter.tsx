import React from "react";
// import Loader from "src/Components/Loader";
import Photo from "src/Components/Photo";
import { keyframes } from "styled-components";
import NotificationRow from "../../Components/NotificationRow";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import { GetNotifictions, cardDetail } from "../../types/api";
import Loader from "src/Components/Loader";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
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
  width: 100;
  max-width: 935px;
  border-radius: 12px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

// const ModalLink = styled.div`
//   text-align: center;
//   min-height: 50px;
//   width: 100%;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   :not(:last-child) {
//     border-bottom: 1px solid #efefef;
//   }
// `;

interface IProps {
  notificationData?: GetNotifictions;
  cardData?: cardDetail;
  loading: boolean;
  className?: string;
  modalOpen: boolean;
  toggleModal: () => void;
  getCardId: (cardId: string) => void;
}

const NotificationPresenter: React.SFC<IProps> = ({
  notificationData: { getNotifications: { notifications = null } = {} } = {},
  cardData: { cardDetail: { card = null } = {} } = {},
  loading,
  className,
  modalOpen,
  toggleModal,
  getCardId
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && notifications) {
    return (
      <>
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <Photo
                id={card.id}
                inline={false}
                creatorAvatar={card.creator.profile.avatar}
                creatorUsername={card.creator.username}
                country={card.country.countryname}
                city={card.city.cityname}
                photoUrl={card.file}
                likeCount={card.likeCount}
                commentCount={card.commentCount}
                caption={card.caption}
                comments={card.comments}
                createdAt={card.createdAt}
                isLiked={card.isLiked}
              />
            </Modal>
          </ModalContainer>
        )}
        <SWrapper>
          {notifications &&
            notifications.map(notification => (
              <NotificationRow
                className={className}
                id={notification.id}
                key={notification.id}
                notification={notification}
                actor={notification.actor}
                target={notification.target}
                payload={notification.payload}
                toggleModal={toggleModal}
                getCardId={getCardId}
              />
            ))}
        </SWrapper>
      </>
    );
  } else {
    return null;
  }
};

export default NotificationPresenter;
