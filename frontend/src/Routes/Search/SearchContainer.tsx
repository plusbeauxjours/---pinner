import React from "react";
import SearchPresenter from "./SearchPresenter";
import { Query } from "react-apollo";
import { searchVariables, search } from "../../types/api";
import { withRouter } from "react-router";

class SearchQuery extends Query<search, searchVariables> {}

class SearchContainer extends React.Component {
  public render() {
    const {
      locations: { search }
    } = this.props;
    let cleanSearch;
    if (search) {
      urlParams = new URLSearchParams(search);
      cleanSearch = urlParams.get("term");
    } else {
      cleanSearch = null;
    }
    return (
      <SearchQuery
        query={SEARCH}
        variables={{ term: "Hello how" }}
        skip={!cleanSearch}
      >
        {({ data }) => <SearchPresenter data={data} empty={!cleanSearch} />}
      </SearchQuery>
    );
  }
}

export default withRouter(SearchContainer);
