import React from "react";
import SearchPresenter from "./SearchPresenter";
import { Query } from "react-apollo";
import { SearchTerms, SearchTermsVariables } from "../../types/api";
import { SEARCH } from "./SearchQueries";

class SearchQuery extends Query<SearchTerms, SearchTermsVariables> {}

interface IState {
  search: string;
}

class SearchContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      search: "red"
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      console.log("didUpdate");
    }
  }
  public componentDidMount() {
    console.log("didMount");
  }
  public render() {
    const { search } = this.state;
    return (
      <SearchQuery query={SEARCH} variables={{ search }} skip={search === ""}>
        {({ data, loading }) => (
          <SearchPresenter
            loading={loading}
            data={data}
            search={search}
            onChange={this.onChange}
          />
        )}
      </SearchQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    // autocompleteSearch(value);
    console.log(value);
    this.setState({
      search: value
    } as any);
  };
}

export default SearchContainer;
