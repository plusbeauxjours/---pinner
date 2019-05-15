import React from "react";
import MatchPresenter from "./MatchPresenter";
import { Query } from "react-apollo";
import { GetMatches, GetMatchesVariables } from "src/types/api";
import { GET_MATCHES } from "./MatchQueries";

class GetMatchesQuery extends Query<GetMatches, GetMatchesVariables> {}

interface IState {
  search: string;
  matchList: any;
}

class MatchContainer extends React.Component<any, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = { search: "", matchList: [] };
  }
  public render = () => {
    const { search, matchList } = this.state;
    return (
      <GetMatchesQuery query={GET_MATCHES}>
        {({ data, loading }) => {
          this.data = data;
          return (
            <MatchPresenter
              data={data}
              loading={loading}
              search={search}
              matchList={matchList}
              onChange={this.onChange}
            />
          );
        }}
      </GetMatchesQuery>
    );
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    console.log(this.data);
    const {
      getFollowers: { profiles = null }
    } = this.data;
    const nowSearch = (list, text) =>
      list.filter(
        i =>
          i.username.toLowerCase().includes(text.toLowerCase()) ||
          i.currentCity.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.currentCity.country.countryName
            .toLowerCase()
            .includes(text.toLowerCase())
      );
    const matchList = nowSearch(profiles, value);
    this.setState({
      search: value,
      matchList
    } as any);
  };
}

export default MatchContainer;
