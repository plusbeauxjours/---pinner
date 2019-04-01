import React from "react";

import { Query } from "react-apollo";
import { GetFollowersVariables, GetFollowers } from "src/types/api";
import { GET_FOLLOWERS } from "src/Routes/UserProfile/UserProfileQueries";
import Loader from "./Loader";
import UserRow from "./UserRow";

class GetFollowersQuery extends Query<GetFollowers, GetFollowersVariables> {}

const GetFollowers: React.SFC<any> = username => (
  <GetFollowersQuery query={GET_FOLLOWERS} variables={username}>
    {({ data: { getFollowers: { profiles = null } = {} } = {}, loading }) => {
      if (loading) {
        return <Loader />;
      } else if (!loading && profiles) {
        console.log(profiles);
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
  </GetFollowersQuery>
);

export default GetFollowers;
