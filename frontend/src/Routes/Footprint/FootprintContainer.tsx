import React from "react";
import { Query } from "react-apollo";
import { GetFootprints } from "../../types/api";

import FootprintPresenter from "./FootprintPresenter";
import { GET_FOOTPRINT } from "./FootprintQueries";

class GetFootprintQuery extends Query<GetFootprints> {}

interface IState {
  page: number;
  modalOpen: boolean;
}

class FootprintContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      modalOpen: false
    };
  }
  public render() {
    const { page, modalOpen } = this.state;
    return (
      <GetFootprintQuery query={GET_FOOTPRINT} variables={{ page }}>
        {({ data, loading }) => (
          <FootprintPresenter
            data={data}
            loading={loading}
            modalOpen={modalOpen}
            toggleModal={this.toggleModal}
            back={this.back}
          />
        )}
      </GetFootprintQuery>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
}

export default FootprintContainer;
