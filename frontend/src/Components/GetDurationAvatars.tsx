import React from "react";
import moment from "moment";
import { Query } from "react-apollo";
// import Loader from "./Loader";
import { GET_DURATION_AVATARS } from "src/Routes/TripProfile/TripProfileQueries";
import { GetDurationAvatars, GetDurationAvatarsVariables } from "src/types/api";
import styled from "styled-components";
import Avatar from "./Avatar";
import LoaderData from "./LoaderData";

class GetDurationAvatarsQuery extends Query<
  GetDurationAvatars,
  GetDurationAvatarsVariables
> {}

const AvatarContainer = styled.div`
  display: flex;
`;

const SAvatar = styled(Avatar)`
  margin-right: -12px;
`;

interface IProps {
  page: number;
  cityName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

const GetDurationAvatars: React.SFC<IProps> = ({
  page,
  cityName,
  startDate,
  endDate
}) => (
  <GetDurationAvatarsQuery
    query={GET_DURATION_AVATARS}
    variables={{ page, cityName, startDate, endDate }}
  >
    {({
      data: {
        getDurationAvatars: { usersBefore = null, days = null } = {}
      } = {},
      loading
    }) => {
      if (loading) {
        return <LoaderData />;
      } else if (!loading && usersBefore) {
        console.log(days);
        return (
          days &&
          usersBefore &&
          usersBefore.map(user => (
            <AvatarContainer key={user.actor.profile.id}>
              <SAvatar
                size={"sm"}
                key={user.actor.profile.id}
                url={user.actor.profile.avatar}
              />
              <p>{days}</p>
            </AvatarContainer>
          ))
        );
      } else {
        return null;
      }
    }}
  </GetDurationAvatarsQuery>
);

export default GetDurationAvatars;
