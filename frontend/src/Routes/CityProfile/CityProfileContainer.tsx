import React from "react";
import { Query } from "react-apollo";
import CityProfilePresenter from "./CityProfilePresenter";
import { CityProfile, CityProfileVariables } from "../../types/api";
import { RouteComponentProps } from "react-router";
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
          return <CityProfilePresenter loading={loading} data={data} />;
        }}
      </CityProfileQuery>
    );
  }
}

export default CityProfileContainer;
