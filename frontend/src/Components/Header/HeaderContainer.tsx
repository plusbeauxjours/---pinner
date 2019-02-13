import React from "react";
import { withRouter } from "react-router-dom";
import HeaderPresenter from "./HeaderPresenter";

interface IState {
  search: string;
}

class HeaderContainer extends React.Component<any, IState> {
  public state = {
    search: ""
  };
  public render() {
    const { search } = this.props;
    return (
      <HeaderPresenter
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        search={search}
      />
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      search: value
    } as any);
  };
  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    const { history } = this.props;
    const { search } = this.state;
    event.preventDefault();
    history.push({
      pathname: "/search",
      search: `?term=${search}`
    });
  };
}

export default withRouter(HeaderContainer);
