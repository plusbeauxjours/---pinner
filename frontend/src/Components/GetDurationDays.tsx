import React from "react";
import moment from "moment";
import { Query } from "react-apollo";
import { GET_DURATION_DAYS } from "src/Routes/TripProfile/TripProfileQueries";
import { GetDurationDays, GetDurationDaysVariables } from "src/types/api";
import styled from "styled-components";
import LoaderData from "./LoaderData";
import { RedDot } from "src/Icons";

class GetDurationDaysQuery extends Query<
  GetDurationDays,
  GetDurationDaysVariables
> {}

const ICon = styled.div`
  position: flex;
  svg {
    margin-left: 5px;
    margin-top: 5px;
    fill: red;
  }
`;

interface IProps {
  page: number;
  cityName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

const GetDurationDays: React.SFC<IProps> = ({
  page,
  cityName,
  startDate,
  endDate
}) => (
  <GetDurationDaysQuery
    query={GET_DURATION_DAYS}
    variables={{ page, cityName, startDate, endDate }}
  >
    {({ data: { getDurationDays: { myTrips = null } = {} } = {}, loading }) => {
      if (loading) {
        return <LoaderData />;
      } else if (!loading && myTrips) {
        return (
          myTrips &&
          myTrips.map(trip => (
            <ICon key={trip.id}>
              <RedDot />
            </ICon>
          ))
        );
      } else {
        return null;
      }
    }}
  </GetDurationDaysQuery>
);

export default GetDurationDays;
