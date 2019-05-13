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
  userName?: string;
  toggleUploadModal?: () => void;
  upload?: boolean;
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
    const {
      location,
      cityName,
      countryName,
      continentName,
      userName,
      toggleUploadModal,
      upload
    } = this.props;
    return (
      <GetCardsQuery
        query={GET_CARDS}
        variables={{
          location,
          cityName,
          countryName,
          continentName,
          userName
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.fetchMore = fetchMore;
          return (
            <GetCardsPresenter
              data={data}
              loading={loading}
              loadMore={this.loadMore}
              toggleUploadModal={toggleUploadModal}
              upload={upload}
            />
          );
        }}
      </GetCardsQuery>
    );
  }
  public loadMore = page => {
    const {
      location,
      cityName,
      countryName,
      continentName,
      userName
    } = this.props;
    this.fetchMore({
      query: GET_CARDS,
      variables: {
        page,
        location,
        cityName,
        countryName,
        continentName,
        userName
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
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
  };
}

export default GetCardsContainer;
