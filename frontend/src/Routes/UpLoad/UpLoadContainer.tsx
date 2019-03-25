import React from "react";
import UpLoadPresenter from "./UpLoadPresenter";
import { blobRadiusBorderGenerator } from "../../blobGenerator";
import { Mutation, MutationFn } from "react-apollo";
import { UploadCard, UploadCardVariables } from "../../types/api";
import { UPLOAD_CARD } from "./UpLoadQueries";
import { toast } from "react-toastify";
import { RouteComponentProps } from "react-router";
import Me from "src/Components/Me";
// import { GET_USER } from "../UserProfile/UserProfileQueries";

class UploadMutation extends Mutation<UploadCard, UploadCardVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  borderRadius: string;
  caption: string;
  font: string;
  fontColor: string;
  fontSize: string;
  modalOpen: boolean;
  userName: string;
}

class UpLoadContainer extends React.Component<IProps, IState> {
  public UploadFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      borderRadius: "0",
      caption: "",
      font: "",
      fontColor: "",
      fontSize: "",
      modalOpen: true,
      userName: ""
    };
  }
  public componentDidMount() {
    this.blobGenerate();
    console.log(this.blobGenerate());
  }
  public render() {
    const {
      borderRadius,
      caption,
      font,
      fontColor,
      fontSize,
      modalOpen
    } = this.state;
    return (
      <Me>
        {user => (
          <UploadMutation
            mutation={UPLOAD_CARD}
            variables={{
              borderRadius,
              caption,
              font,
              fontColor,
              fontSize
            }}
            onCompleted={data => {
              const { uploadCard } = data;
              if (uploadCard.ok) {
                toast.success("New Card");
                this.props.history.goBack();
              } else {
                toast.error("Could not send you a Key");
              }
            }}
            // refetchQueries={[
            //   { query: GET_USER, variables: { username: user.username } }
            // ]}
          >
            {UploadFn => {
              this.UploadFn = UploadFn;
              return (
                <UpLoadPresenter
                  back={this.back}
                  borderRadius={borderRadius}
                  uploadNewCard={this.uploadNewCard}
                  caption={caption}
                  onKeyUp={this.onKeyUp}
                  modalOpen={modalOpen}
                />
              );
            }}
          </UploadMutation>
        )}
      </Me>
    );
  }
  public blobGenerate = () => {
    const borderRadius = blobRadiusBorderGenerator();
    this.setState({
      borderRadius
    });
  };
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
  public uploadNewCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    this.setState({
      caption: value
    } as any);
  };
  public onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    const { borderRadius } = this.state;
    if (keyCode === 13) {
      this.setState({
        modalOpen: false
      });
      this.UploadFn({
        variables: {
          borderRadius
        }
      });
    } else {
      return;
    }
  };
}

export default UpLoadContainer;
