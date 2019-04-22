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
          host={match.host}
          guest={match.guest}
          currentCity={match.city.cityName}
          currentCountry={match.city.country.countryName}
          coffeeId={match.coffee.id}
          expires={match.naturalTime}
          isMatching={match.isMatching}
          isGuest={match.isGuest}
          isHost={match.isHost}
        />
      ))}
    </>
  );
};

export default MatchGrid;
