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
  border-bottom: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  height: 280px;
  padding: 15px;
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

const Box = styled.div`
  width: 905px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${props => props.theme.bgColor};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: ${props => props.theme.greyColor};
  }
`;

const SBold = styled(Bold)`
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
  if (matches) {
    return (
      <>
        <TallWrapper>
          <Title>
            <SBold text={"MATCHES"} />
          </Title>
          <Container>
            <Box>
              {!matchLoading && matches ? (
                <MatchGrid matches={matches} />
              ) : (
                <Loader />
              )}
            </Box>
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
