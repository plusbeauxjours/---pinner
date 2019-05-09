import React from "react";
import { MutationFn, Mutation } from "react-apollo";
import CityLikeBtnPresenter from "./CityLikeBtnPresenter";
import { TOGGLE_LIKE_CITY } from "./CityLikeBtnQueries";
import { ToggleLikeCity, ToggleLikeCityVariables } from "../../types/api";

class ToggleLikeMutation extends Mutation<
  ToggleLikeCity,
  ToggleLikeCityVariables
> {}

interface IProps {
  isLiked: boolean;
  cityId: string;
  likeCount: number;
}
interface IState {
  isLiked: boolean;
  likeCount: number;
}

class CityLikeBtnContainer extends React.Component<IProps, IState> {
  public toggleLikeFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.isLiked,
      likeCount: props.likeCount
    };
  }
  public render() {
    const { isLiked, likeCount } = this.state;
    const { cityId } = this.props;
    return (
      <ToggleLikeMutation
        mutation={TOGGLE_LIKE_CITY}
        variables={{ cityId: parseInt(cityId, 10) }}
      >
        {toggleLikeFn => {
          this.toggleLikeFn = toggleLikeFn;
          return (
            <CityLikeBtnPresenter
              likeCount={likeCount}
              isLiked={isLiked}
              onLikeClick={this.onLikeClick}
            />
          );
        }}
      </ToggleLikeMutation>
    );
  }
  public onLikeClick = () => {
    const { likeCount, isLiked } = this.props;
    this.toggleLikeFn();
    this.setState(state => {
      let likeNumber;
      if (!isLiked) {
        if (likeCount === state.likeCount) {
          likeNumber = likeCount + 1;
        } else {
          likeNumber = likeCount;
        }
      } else {
        if (likeCount === state.likeCount) {
          likeNumber = likeCount - 1;
        } else {
          likeNumber = likeCount;
        }
      }
      return {
        isLiked: !state.isLiked,
        likeCount: likeNumber
      };
    });
  };
}

export default CityLikeBtnContainer;
