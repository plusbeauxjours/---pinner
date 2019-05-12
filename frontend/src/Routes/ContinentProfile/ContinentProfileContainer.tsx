import React from "react";
import { Query } from "react-apollo";
import ContinentProfilePresenter from "./ContinentProfilePresenter";
import { ContinentProfile, ContinentProfileVariables } from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CONTINENT_PROFILE } from "./ContinentProfileQueries";

class ContinentProfileQuery extends Query<
  ContinentProfile,
  ContinentProfileVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  page: number;
  search: string;
  countryList: any;
}
class ContinentProfileContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      search: "",
      countryList: []
    };
  }
  public componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (
      oldProps.match.params.continentName !==
      newProps.match.params.continentName
    ) {
      this.setState({ search: "", countryList: [] });
      console.log(this.state);
    }
  }
  public render() {
    const {
      match: {
        params: { continentName }
      }
    } = this.props;
    const { search, countryList } = this.state;
    return (
      <ContinentProfileQuery
        query={CONTINENT_PROFILE}
        variables={{ continentName }}
      >
        {({ data, loading }) => {
          this.data = data;
          return (
            <ContinentProfilePresenter
              data={data}
              loading={loading}
              continentName={continentName}
              onChange={this.onChange}
              search={search}
              countryList={countryList}
            />
          );
        }}
      </ContinentProfileQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      continentProfile: { countries = null }
    } = this.data;
    const search = (list, text) =>
      list.filter(i =>
        i.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const countryList = search(countries, value);
    this.setState({
      search: value,
      countryList
    } as any);
  };
}

export default withRouter(ContinentProfileContainer);
