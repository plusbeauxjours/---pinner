import React from "react";
import { Query } from "react-apollo";
import { GET_CARDS } from "./GetCardsQueries";
import { GetCards, GetCardsVariables } from "src/types/api";
import GetCardsPresenter from "./GetCardsPresenter";

class GetCardsQuery extends Query<GetCards, GetCardsVariables> {}

interface IProps {
  location: string;
  cityName?: string;
  countryName?: string;
  continentName?: string;
}

interface IState {
  page: number;
}

class GetCardsContainer extends React.Component<IProps, IState> {
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }
  public render() {
    const { page } = this.state;
    const { location, cityName, countryName, continentName } = this.props;

    return (
      <GetCardsQuery
        query={GET_CARDS}
        variables={{ page, location, cityName, countryName, continentName }}
      >
        {({ data, loading, fetchMore }) => {
          this.fetchMore = fetchMore;
          return (
            <GetCardsPresenter
              data={data}
              loading={loading}
              loadMore={this.loadMore}
            />
          );
        }}
      </GetCardsQuery>
    );
  }
  public loadMore = page => {
    const { location, cityName, countryName, continentName } = this.props;

    this.fetchMore({
      query: GET_CARDS,
      variables: {
        page,
        location,
        cityName,
        countryName,
        continentName
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        console.log(previousResult, fetchMoreResult);
        const newData = {
          getCards: {
            ...previousResult.getCards,
            cards: [
              ...previousResult.getCards.cards,
              ...fetchMoreResult.getCards.cards
            ]
          }
        };
        return newData;
      }
    });
    console.log(this.state);
  };
}

export default GetCardsContainer;
