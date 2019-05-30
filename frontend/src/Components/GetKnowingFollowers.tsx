import React from "react";

import { Query } from "react-apollo";
import {
  GetKnowingFollowers,
  GetKnowingFollowersVariables
} from "src/types/api";
import { GET_KNOWING_FOLLOWERS } from "src/Routes/User/UserProfile/UserProfileQueries";
import Loader from "./Loader";
import UserRow from "./UserRow";

class GetKnowingFollowersQuery extends Query<
  GetKnowingFollowers,
  GetKnowingFollowersVariables
> {}

const GetKnowingFollowers: React.SFC<any> = username => (
  <GetKnowingFollowersQuery query={GET_KNOWING_FOLLOWERS} variables={username}>
    {({
      data: { getKnowingFollowers: { profiles = null } = {} } = {},
      loading
    }) => {
      if (loading) {
        return <Loader />;
      } else if (!loading && profiles) {
        return profiles.map(profile => (
          <UserRow
            key={profile.id}
            id={profile.id}
            username={profile.username}
            avatar={profile.avatar}
            currentCity={profile.currentCity.cityName}
            currentCountry={profile.currentCity.country.countryName}
            isFollowing={profile.isFollowing}
            size={"sm"}
          />
        ));
      } else {
        return null;
      }
    }}
  </GetKnowingFollowersQuery>
);

export default GetKnowingFollowers;
