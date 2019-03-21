import React from "react";
import { Query } from "react-apollo";
import ContinentProfilePresenter from "./ContinentProfilePresenter";
import { ContinentProfile, ContinentProfileVariables } from "../../types/api";
import { RouteComponentProps } from "react-router";
import { CONTINENT_PROFILE } from "./ContinentProfileQueries";

class ContinentProfileQuery extends Query<
  ContinentProfile,
  ContinentProfileVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  continentName: string;
}
class ContinentProfileContainer extends React.Component<IProps, IState> {
  public state = {
    page: 0,
    continentName: ""
  };
  public render() {
    const {
      match: {
        params: { continentName }
      }
    } = this.props;
    const { page } = this.state;
    return (
      <ContinentProfileQuery
        query={CONTINENT_PROFILE}
        variables={{ page, continentName }}
      >
        {({ data, loading }) => {
          console.log(data);
          return <ContinentProfilePresenter loading={loading} data={data} />;
        }}
      </ContinentProfileQuery>
    );
  }
}

export default ContinentProfileContainer;
