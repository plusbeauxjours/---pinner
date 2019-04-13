import React from "react";
import MatchCard from "./MatchCard";

interface IProps {
  matches?: any;
  className?: string;
}

const MatchGrid: React.SFC<IProps> = ({ matches }) => {
  return (
    <>
      {console.log(matches)}
      {matches.map(match => (
        <MatchCard
          key={match.id}
          id={match.id}
          avatar={match.host.profile.avatar}
          username={match.host.username}
          currentCity={match.city.cityName}
          currentCountry={match.city.country.countryName}
          expires={match.naturalTime}
        />
      ))}
    </>
  );
};

export default MatchGrid;
