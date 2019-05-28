import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";

interface IProps extends RouteComponentProps<any> {
  activeId: number;
  search: string;
  searchData: any;
  searchLoading: boolean;
}

interface IState {
  search: string;
}

class SearchContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      search: props.search
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      console.log("didUpdate");
    }
  }
  public render() {
    const { activeId, searchData, searchLoading } = this.props;
    return (
      <SearchPresenter
        activeId={activeId}
        searchData={searchData}
        searchLoading={searchLoading}
      />
    );
  }
}

export default withRouter(SearchContainer);
