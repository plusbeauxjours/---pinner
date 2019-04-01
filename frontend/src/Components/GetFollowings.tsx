import React from "react";

import { Query } from "react-apollo";
import { GetFollowingsVariables, GetFollowings } from "src/types/api";
import { GET_FOLLOWINGS } from "src/Routes/UserProfile/UserProfileQueries";
import Loader from "./Loader";
import UserRow from "./UserRow";

class GetFollowingsQuery extends Query<GetFollowings, GetFollowingsVariables> {}

const GetFollowings: React.SFC<any> = username => (
  <GetFollowingsQuery query={GET_FOLLOWINGS} variables={username}>
    {({ data: { getFollowings: { profiles = null } = {} } = {}, loading }) => {
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
  </GetFollowingsQuery>
);

export default GetFollowings;
