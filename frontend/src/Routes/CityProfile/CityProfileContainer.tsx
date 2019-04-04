import React from "react";
import { Query } from "react-apollo";
import CityProfilePresenter from "./CityProfilePresenter";
import {
  CityProfile,
  CityProfileVariables,
  GetHeatmapData,
  GetHeatmapDataVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CITY_PROFILE, GET_HEATMAP_DATA } from "./CityProfileQueries";

class CityProfileQuery extends Query<CityProfile, CityProfileVariables> {}
class GetHeatmapDataQuery extends Query<
  GetHeatmapData,
  GetHeatmapDataVariables
> {}
interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  cityName: string;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public state = {
    page: 0,
    cityName: ""
  };
  public componentDidMount() {
    console.log("goodmorning");
  }
  public render() {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const { page } = this.state;
    return (
      <CityProfileQuery query={CITY_PROFILE} variables={{ page, cityName }}>
        {({ data: cityData, loading: cityLoading }) => {
          return (
            <GetHeatmapDataQuery
              query={GET_HEATMAP_DATA}
              variables={{ cityName }}
            >
              {({ data: heatmapData, loading: heatmapLoading }) => (
                <CityProfilePresenter
                  cityData={cityData}
                  cityLoading={cityLoading}
                  heatmapData={heatmapData}
                  heatmapLoading={heatmapLoading}
                />
              )}
            </GetHeatmapDataQuery>
          );
        }}
      </CityProfileQuery>
    );
  }
}

export default withRouter(CityProfileContainer);
