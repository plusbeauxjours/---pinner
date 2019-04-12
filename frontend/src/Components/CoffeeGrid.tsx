import React from "react";
import CoffeeCard from "./CoffeeCard";

interface IProps {
  coffees?: any;
  className?: string;
}

const CoffeeGrid: React.SFC<IProps> = ({ coffees }) => {
  return (
    <>
      {console.log(coffees)}
      {coffees.map(coffee => (
        <CoffeeCard
          key={coffee.id}
          id={coffee.id}
          avatar={coffee.host.profile.avatar}
          username={coffee.host.username}
          currentCity={coffee.city.cityName}
          currentCountry={coffee.city.country.countryName}
          isFollowing={coffee.host.profile.isFollowing}
          target={coffee.target}
          expires={coffee.naturalTime}
        />
      ))}
    </>
  );
};

export default CoffeeGrid;
