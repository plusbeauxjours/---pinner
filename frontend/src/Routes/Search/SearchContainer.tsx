import React from "react";
import SearchPresenter from "./SearchPresenter";
import { Query } from "react-apollo";
import { SearchTerms, SearchTermsVariables } from "../../types/api";
import { withRouter, RouteComponentProps } from "react-router";
import { SEARCH } from "./SearchQueries";

class SearchQuery extends Query<SearchTerms, SearchTermsVariables> {}

interface IProps extends RouteComponentProps<any> {}

class SearchContainer extends React.Component<IProps> {
  public render() {
    const {
      location: { search }
    } = this.props;
    let cleanSearch;
    if (search) {
      const urlParams = new URLSearchParams(search);
      cleanSearch = urlParams.get("term");
    } else {
      cleanSearch = null;
    }
    return (
      <SearchQuery
        query={SEARCH}
        variables={{ term: cleanSearch }}
        skip={!cleanSearch}
      >
        {({ data, loading }) => (
          <SearchPresenter loading={loading} data={data} empty={!cleanSearch} />
        )}
      </SearchQuery>
    );
  }
}

export default withRouter(SearchContainer);
