import React from "react";
import { Query } from "react-apollo";
import CityProfilePresenter from "./CityProfilePresenter";
import { CityProfile, CityProfileVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CITY_PROFILE } from "./CityProfileQueries";

class CityProfileQuery extends Query<CityProfile, CityProfileVariables> {}

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
  public render() {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    const { page } = this.state;
    return (
      <CityProfileQuery query={CITY_PROFILE} variables={{ page, cityName }}>
        {({ data, loading }) => {
          console.log(data);
          return (
            <CityProfilePresenter
              loading={loading}
              data={data}
              getDate={this.getDate}
            />
          );
        }}
      </CityProfileQuery>
    );
  }
  public getDate = i => {
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const nowYear = new Date().getFullYear();
    const beforeYear = new Date().getFullYear() - 1;
    const now = nowYear + "-" + month + "-" + day;
    const before = beforeYear + "=" + month + "-" + day;
    if (i === "now") {
      return now;
    } else {
      return before;
    }
  };
}

export default withRouter(CityProfileContainer);
