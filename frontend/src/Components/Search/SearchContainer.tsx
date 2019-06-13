import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { MutationFn, Mutation } from "react-apollo";
import { ReportLocation, ReportLocationVariables } from "../../types/api";
import { REPORT_LOCATION } from "../../Routes/Login/Home/HomeQueries";
import { reversePlaceId } from "../../mapHelpers";

class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}

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
  public ReportLocationFn: MutationFn;
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
    const { search, activeId, searchData, searchLoading } = this.props;
    return (
      <ReportLocationMutation mutation={REPORT_LOCATION}>
        {ReportLocationFn => {
          this.ReportLocationFn = ReportLocationFn;
          return (
            <SearchPresenter
              search={search}
              activeId={activeId}
              searchData={searchData}
              searchLoading={searchLoading}
              onClick={this.onClick}
            />
          );
        }}
      </ReportLocationMutation>
    );
  }
  public onClick = (placeId: string) => {
    console.log(this.props);
    const { history } = this.props;
    reversePlaceId(placeId);
    history.push({
      pathname: `/city/${placeId}`
      // state: {

      // }
    });
    console.log(placeId);
    // try {
    //   this.ReportLocationFn({
    //     variables: {
    //       currentLat: latitude,
    //       currentLng: longitude,
    //       currentCityId,
    //       currentCityName,
    //       currentCountryCode
    //     }
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  };
}

export default withRouter(SearchContainer);
