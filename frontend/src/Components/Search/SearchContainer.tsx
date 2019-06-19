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
import { reversePlaceId } from "../../mapHelpers";
import { CREATE_CITY } from "./SearchQueries";

class CreateCityQuery extends Mutation<CreateCity, CreateCityVariables> {}

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
    const { search, activeId, searchData, searchLoading } = this.props;
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
                    activeId={activeId}
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
    const city = await reversePlaceId(placeId);
    await this.createCityFn({
      variables: {
        cityId: placeId,
        cityName: city.storableLocation.cityName,
        cityLatitude: city.storableLocation.latitude,
        cityLongitude: city.storableLocation.longitude,
        countryCode: city.storableLocation.countryCode
      }
    });
    await history.push({
      pathname: `/city/${placeId}`
    });
  };
}

export default withRouter(SearchContainer);
