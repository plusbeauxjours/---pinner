import React from "react";
import styled from "styled-components";
import Bold from "../../Components/Bold";
import Loader from "../../Components/Loader";
import CardGrid from "../../Components/CardGrid";

import InfiniteScroll from "react-infinite-scroller";

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const SText = styled(Bold)`
  font-size: 20px;
  font-weight: 200;
`;

interface IProps {
  data?: any;
  loading: boolean;
  loadMore: any;
  toggleUploadModal?: () => void;
  upload?: boolean;
}

const GetCardsPresenter: React.SFC<IProps> = ({
  data: { getCards: { cards = null, hasNextPage = false } = {} } = {},
  loading,
  loadMore,
  toggleUploadModal,
  upload
}) => {
  if (loading) {
    return <Loader />;
  } else if (cards && cards.length !== 0) {
    return (
      <InfiniteScroll
        hasMore={hasNextPage}
        loader={<Loader key={0} />}
        loadMore={loadMore}
      >
        <GreyLine />
        <Title>
          <SText text={"POSTS"} />
        </Title>
        <CardGrid
          cards={cards}
          upload={upload}
          toggleUploadModal={toggleUploadModal}
        />
      </InfiniteScroll>
    );
  }
  return null;
};

export default GetCardsPresenter;
