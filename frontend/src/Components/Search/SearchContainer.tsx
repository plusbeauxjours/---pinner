import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { MutationFn, Mutation } from "react-apollo";
import {
  ReportLocation,
  ReportLocationVariables,
  CreateCity,
  CreateCityVariables
} from "../../types/api";
import { REPORT_LOCATION } from "../../Routes/Login/Home/HomeQueries";
import { CREATE_CITY } from "./SearchQueries";

class CreateCityQuery extends Mutation<CreateCity, CreateCityVariables> {}

class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}

interface IProps extends RouteComponentProps<any> {
  search: string;
  searchData: any;
  searchLoading: boolean;
}

interface IState {
  search: string;
}

class SearchContainer extends React.Component<IProps, IState> {
  public ReportLocationFn: MutationFn;
  public createCityFn: MutationFn;
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
    const { search, searchData, searchLoading } = this.props;
    return (
      <CreateCityQuery mutation={CREATE_CITY}>
        {(createCityFn, { loading: createCityLoading }) => {
          this.createCityFn = createCityFn;
          return (
            <ReportLocationMutation mutation={REPORT_LOCATION}>
              {ReportLocationFn => {
                this.ReportLocationFn = ReportLocationFn;
                return (
                  <SearchPresenter
                    search={search}
                    searchData={searchData}
                    searchLoading={searchLoading}
                    onClick={this.onClick}
                    createCityLoading={createCityLoading}
                  />
                );
              }}
            </ReportLocationMutation>
          );
        }}
      </CreateCityQuery>
    );
  }
  public onClick = async (placeId: string) => {
    const { history } = this.props;
    await this.createCityFn({
      variables: {
        cityId: placeId
      }
    });
    await history.push({
      pathname: `/city/${placeId}`
    });
  };
}

export default withRouter(SearchContainer);
