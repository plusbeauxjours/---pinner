import React from "react";
import { MutationFn, Mutation } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import CityLikeBtnPresenter from "./CityLikeBtnPresenter";
import { TOGGLE_LIKE_CITY } from "./CityLikeBtnQueries";
import { ToggleLikeCity, ToggleLikeCityVariables } from "../../types/api";
import { CITY_PROFILE } from "../../Routes/City/CityProfile/CityProfileQueries";
import { FREQUENT_VISITS } from "../../Routes/User/Cities/CitiesQueries";
import { COUNTRY_PROFILE } from "../../Routes/Country/CountryProfile/CountryProfileQueries";

class ToggleLikeMutation extends Mutation<
  ToggleLikeCity,
  ToggleLikeCityVariables
> {}

interface IProps extends RouteComponentProps<any> {
  isLiked: boolean;
  cityId: string;
  likeCount: number;
  type: string;
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
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.cityName !== newProps.match.params.cityName) {
      this.setState({
        isLiked: newProps.isLiked,
        likeCount: newProps.likeCount
      });
      console.log(this.state);
    }
  }
  public render() {
    const { isLiked, likeCount } = this.state;
    const { cityId, type } = this.props;
    return (
      <ToggleLikeMutation
        mutation={TOGGLE_LIKE_CITY}
        variables={{ cityId: parseInt(cityId, 10) }}
        update={this.updateToggleLike}
      >
        {toggleLikeFn => {
          this.toggleLikeFn = toggleLikeFn;
          return (
            <CityLikeBtnPresenter
              likeCount={likeCount}
              isLiked={isLiked}
              onLikeClick={this.onLikeClick}
              type={type}
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
  public updateToggleLike = (cache, { data: { toggleLikeCity } }) => {
    const {
      match: {
        params: { cityName }
      }
    } = this.props;
    try {
      const data = cache.readQuery({
        query: CITY_PROFILE,
        variables: { cityName }
      });
      if (data) {
        data.cityProfile.city.isLiked = toggleLikeCity.city.isLiked;
        data.cityProfile.city.likeCount = toggleLikeCity.city.likeCount;
        cache.writeQuery({
          query: CITY_PROFILE,
          variables: { cityName },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const {
        match: {
          params: { username }
        }
      } = this.props;
      const data = cache.readQuery({
        query: FREQUENT_VISITS,
        variables: { userName: username }
      });
      if (data) {
        data.frequentVisits.cities.find(
          i => i.id === toggleLikeCity.city.id
        ).isLiked = toggleLikeCity.city.isLiked;
        data.frequentVisits.cities.find(
          i => i.id === toggleLikeCity.city.id
        ).likeCount = toggleLikeCity.city.likeCount;
        cache.writeQuery({
          query: FREQUENT_VISITS,
          variables: { userName: username },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const {
        city: {
          country: { countryName }
        }
      } = toggleLikeCity;
      const data = cache.readQuery({
        query: COUNTRY_PROFILE,
        variables: { countryName }
      });
      if (data) {
        data.countryProfile.cities.find(
          i => i.id === toggleLikeCity.city.id
        ).isLiked = toggleLikeCity.city.isLiked;
        data.countryProfile.cities.find(
          i => i.id === toggleLikeCity.city.id
        ).likeCount = toggleLikeCity.city.likeCount;
        cache.writeQuery({
          query: COUNTRY_PROFILE,
          variables: { countryName },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default withRouter(CityLikeBtnContainer);
