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
        {({ data, loading }) => {
          return <GetCardsPresenter data={data} loading={loading} />;
        }}
      </GetCardsQuery>
    );
  }
}

export default GetCardsContainer;
