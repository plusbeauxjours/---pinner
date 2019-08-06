import React from "react";
import { RouteComponentProps } from "react-router";
import { Mutation, MutationFn } from "react-apollo";

import { toast } from "react-toastify";
import Loader from "src/Components/Loader";
import { COMPLETE_EDIT_EMAIL_VERIFICATION } from "./EditEmailAddressQueries";
import {
  CompleteEditEmailVerification,
  CompleteEditEmailVerificationVariables
} from "../../../types/api";

class CompleteEditEmailVerificationMutation extends Mutation<
  CompleteEditEmailVerification,
  CompleteEditEmailVerificationVariables
> {}

interface IProps extends RouteComponentProps<any> {}

class VerificationContainer extends React.Component<IProps> {
  public logUserIn: MutationFn;
  public verifyEmailFn: MutationFn;
  constructor(props: IProps) {
    super(props);
  }
  public componentDidMount() {
    this.verifyEmailFn();
  }
  public render() {
    const {
      match: {
        params: { key = null }
      }
    } = this.props;
    console.log(key);
    if (key) {
      return (
        <CompleteEditEmailVerificationMutation
          mutation={COMPLETE_EDIT_EMAIL_VERIFICATION}
          variables={{ key }}
          onCompleted={this.onCompletedCompleteEditEmailVerification}
        >
          {verifyEmailFn => {
            this.verifyEmailFn = verifyEmailFn;
            return <Loader />;
          }}
        </CompleteEditEmailVerificationMutation>
      );
    } else {
      return <Loader />;
    }
  }
  public onCompletedCompleteEditEmailVerification = data => {
    const { history } = this.props;
    const { completeEditEmailVerification } = data;
    if (completeEditEmailVerification.ok) {
      if (completeEditEmailVerification.token) {
        this.logUserIn({
          variables: {
            token: completeEditEmailVerification.token
          }
        });
      }
      toast.success("Your new email address is verified");
      history.push({
        pathname: `/${completeEditEmailVerification.username}`
      });
    } else {
      toast.error("Could not be Verified you");
    }
  };
}

export default VerificationContainer;
