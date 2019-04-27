import React from "react";
import moment from "moment";
import { Query } from "react-apollo";
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

const CountCircle = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  border-radius: 50%;
  background-color: ${props => props.theme.bgColor};
`;

const Count = styled.div`
  font-size: 12px;
  font-weight: 200;
`;

interface IProps {
  cityName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

const GetDurationAvatars: React.SFC<IProps> = ({
  cityName,
  startDate,
  endDate
}) => (
  <GetDurationAvatarsQuery
    query={GET_DURATION_AVATARS}
    variables={{ cityName, startDate, endDate }}
  >
    {({
      data: {
        getDurationAvatars: { usersBefore = null, userCount = null } = {}
      } = {},
      loading
    }) => {
      if (loading) {
        return <LoaderData />;
      } else if (!loading && usersBefore && userCount) {
        return (
          <>
            {usersBefore &&
              usersBefore.map(user => (
                <AvatarContainer key={user.actor.profile.id}>
                  <SAvatar size={"sm"} url={user.actor.profile.avatar} />
                </AvatarContainer>
              ))}
            {userCount > 4 ? (
              <CountCircle>
                <Count>{userCount}</Count>
              </CountCircle>
            ) : null}
          </>
        );
      } else {
        return null;
      }
    }}
  </GetDurationAvatarsQuery>
);

export default GetDurationAvatars;
