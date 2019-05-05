import React from "react";
import styled from "styled-components";
import Bold from "../../Components/Bold";
import Loader from "../../Components/Loader";
import CardGrid from "../../Components/CardGrid";

import InfiniteScroll from "react-infinite-scroller";
import { Upload } from "../../Icons";

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

const UploadIcon = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px 15px 0;
  svg {
    fill: white;
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: grey;
    }
  }
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
        {upload && (
          <UploadIcon onClick={toggleUploadModal}>
            <Upload />
          </UploadIcon>
        )}
        <CardGrid cards={cards} />
      </InfiniteScroll>
    );
  }
  return null;
};

export default GetCardsPresenter;
