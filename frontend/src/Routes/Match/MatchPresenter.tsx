import React from "react";
import styled from "../../Styles/typed-components";

import Loader from "../../Components/Loader";
import Wrapper from "../../Components/Wrapper";
import Bold from "../../Components/Bold";
import MatchGrid from "src/Components/MatchGrid";

const TallWrapper = styled(Wrapper)`
  height: 50vh;
  text-align: center;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 170px));
  grid-template-rows: 200px;
  grid-auto-rows: 170px;
  grid-gap: 15px;
  margin-bottom: 85px;
`;

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
  font-weight: 100;
`;

interface IProps {
  matchData?: any;
  matchLoading: boolean;
}

const MatchPresenter: React.SFC<IProps> = ({
  matchData: { getMatches: { matches = null } = {} } = {},
  matchLoading
}) => {
  if (matchLoading) {
    return <Loader />;
  } else if (!matchLoading && matches) {
    return (
      <>
        <TallWrapper>
          <Title>
            <SText text={"MATCHES"} />
          </Title>
          <Container>
            <MatchGrid matches={matches} />
          </Container>
          <GreyLine />
        </TallWrapper>
      </>
    );
  } else {
    return null;
  }
};

export default MatchPresenter;
