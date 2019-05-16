import React from "react";
import CardDetail from "../../Routes/CardDetail";
import NotificationRow from "../../Components/NotificationRow";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";
import { Route } from "react-router";

import InfiniteScroll from "react-infinite-scroller";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const UserContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.bgColor};
  border-radius: 3px;
  padding: 5px;
  color: white;
  font-size: 14px;
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

interface IProps {
  data?: any;
  loading: boolean;
  className?: string;
  modalOpen: boolean;
  toggleModal: () => void;
  search: string;
  notificationList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMarkRead: (notificationId: string) => void;
  loadMore: any;
}

const NotificationPresenter: React.SFC<IProps> = ({
  data: {
    getNotifications: { notifications = null, hasNextPage = false } = {}
  } = {},
  loading,
  modalOpen,
  search,
  notificationList,
  onChange,
  onMarkRead,
  loadMore
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && notifications) {
    return (
      <>
        {modalOpen && <Route path="/p/:id" component={CardDetail} />}
        <SWrapper>
          <UserContainer>
            <UserNameRow>
              <Username>NOTIFICATIONS</Username>
              <Input placeholder="Search" value={search} onChange={onChange} />
            </UserNameRow>
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={loadMore}
              pageStart={0}
              initialLoad={false}
            >
              {notificationList.length !== 0 &&
                notificationList.map(notification => {
                  return (
                    <NotificationRow
                      key={notification.id}
                      notification={notification}
                      actor={notification.actor.profile}
                      isRead={notification.read}
                      onMarkRead={onMarkRead}
                    />
                  );
                })}
              {console.log("hasNextPage:  ", hasNextPage)}
              {notificationList.length === 0 &&
                !search &&
                notifications &&
                notifications.map(notification => {
                  return (
                    <NotificationRow
                      key={notification.id}
                      notification={notification}
                      actor={notification.actor.profile}
                      isRead={notification.read}
                      onMarkRead={onMarkRead}
                    />
                  );
                })}
            </InfiniteScroll>
          </UserContainer>
        </SWrapper>
      </>
    );
  } else {
    return null;
  }
};

export default NotificationPresenter;
