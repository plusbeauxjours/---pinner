import React from "react";
import styled from "../../Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Bold from "../../Components/Bold";
import UserGrid from "src/Components/UserGrid";
import CardGrid from "src/Components/CardGrid";
import Loader from "src/Components/Loader";

const TallWrapper = styled(Wrapper)`
  height: 50vh;
  text-align: center;
`;

interface IProps {
  data?: any;
  empty: boolean;
  loading: boolean;
}

const SearchPresenter: React.SFC<IProps> = ({ data, empty, loading }) => {
  if (empty) {
    return (
      <TallWrapper>
        <Bold text="Search for something..." />
      </TallWrapper>
    );
  } else if (!loading && data) {
    const {
      searchUsers: { users },
      searchCards: { cards }
    } = data;
    return (
      <TallWrapper>
        {users && users.length > 0 && <UserGrid users={users} inline={false} />}
        {cards && cards.length > 0 && <CardGrid cards={cards} />}
        {users && users.length === 0 && cards && cards.length === 0 && (
          <Bold text="Nothing found..." />
        )}
      </TallWrapper>
    );
  } else if (loading) {
    return <Loader />;
  }
  return null;
};

export default SearchPresenter;
