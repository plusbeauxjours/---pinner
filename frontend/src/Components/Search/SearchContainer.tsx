import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { Query } from "react-apollo";
import { SearchTerms, SearchTermsVariables } from "../../types/api";
import { SEARCH } from "./SearchQueries";

class SearchQuery extends Query<SearchTerms, SearchTermsVariables> {}

interface IProps extends RouteComponentProps<any> {
  search: string;
}

interface IState {
  search: string;
}

class SearchContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      console.log("didUpdate");
    }
  }
  public render() {
    const { search } = this.props;
    console.log(search);
    return (
      <SearchQuery
        query={SEARCH}
        variables={{ search }}
        skip={search.length === 0}
      >
        {({ data, loading }) => (
          <SearchPresenter loading={loading} data={data} />
        )}
      </SearchQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    console.log(value);
    this.setState({
      search: value
    } as any);
  };
}

export default withRouter(SearchContainer);
