import React from "react";
import styled from "styled-components";
import Bold from "../../Components/Bold";
import Loader from "../../Components/Loader";
import CardGrid from "../../Components/CardGrid";

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

const SBold = styled(Bold)`
  font-size: 20px;
  font-weight: 200;
`;

interface IProps {
  data?: any;
  loading: boolean;
}

const GetCardsPresenter: React.SFC<IProps> = ({
  data: { getCards: { cards = null } = {} } = {},
  loading
}) => {
  if (loading) {
    return <Loader />;
  } else if (cards && cards.length !== 0) {
    return (
      <>
        <GreyLine />
        <Title>
          <SBold text={"POSTS"} />
        </Title>
        <CardGrid cards={cards} />
      </>
    );
  }
  return null;
};

export default GetCardsPresenter;