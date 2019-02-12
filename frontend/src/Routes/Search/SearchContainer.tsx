import React from "react";
import SearchPresenter from "./SearchPresenter";
import { Query } from "react-apollo";
import { searchTerms, searchTermsVariables } from "../../types/api";
import { withRouter, RouteComponentProps } from "react-router";
import { SEARCH } from "./SearchQueries";

class SearchQuery extends Query<searchTerms, searchTermsVariables> {}

interface IProps extends RouteComponentProps<any> {}

class SearchContainer extends React.Component<IProps> {
  public render() {
    const {
      location: { search }
    } = this.props;
    let cleanSearch;
    console.log(this.props);
    if (search) {
      const urlParams = new URLSearchParams(search);
      cleanSearch = urlParams.get("term");
    } else {
      cleanSearch = null;
    }
    return (
      <SearchQuery
        query={SEARCH}
        variables={{ term: "hello how" }}
        skip={!cleanSearch}
      >
        {({ data }) => <SearchPresenter data={data} empty={!cleanSearch} />}
      </SearchQuery>
    );
  }
}

export default withRouter(SearchContainer);
