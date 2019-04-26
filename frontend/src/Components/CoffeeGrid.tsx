import React from "react";
import CoffeeCard from "./CoffeeCard";

interface IProps {
  requestingCoffees?: any;
  coffees?: any;
  toggleCoffeeReportModal?: () => void;
  type?: string;
  getCoffeeId?: any;
  getRequestingCoffeeId?: any;
}

const CoffeeGrid: React.SFC<IProps> = ({
  requestingCoffees,
  coffees,
  toggleCoffeeReportModal,
  type,
  getCoffeeId,
  getRequestingCoffeeId
}) => (
  <>
    {requestingCoffees &&
      requestingCoffees.map(coffee => (
        <CoffeeCard
          key={coffee.id}
          id={coffee.id}
          avatar={coffee.host.profile.avatar}
          username={coffee.host.username}
          currentCity={coffee.city.cityName}
          currentCountry={coffee.city.country.countryName}
          isFollowing={coffee.host.profile.isFollowing}
          target={coffee.target}
          naturalTime={coffee.naturalTime}
          expires={coffee.expires}
          status={coffee.status}
          type={type}
          getCoffeeId={getCoffeeId}
          getRequestingCoffeeId={getRequestingCoffeeId}
        />
      ))}
    {coffees &&
      coffees.map(coffee => (
        <CoffeeCard
          key={coffee.id}
          id={coffee.id}
          avatar={coffee.host.profile.avatar}
          username={coffee.host.username}
          currentCity={coffee.city.cityName}
          currentCountry={coffee.city.country.countryName}
          isFollowing={coffee.host.profile.isFollowing}
          target={coffee.target}
          naturalTime={coffee.naturalTime}
          expires={coffee.expires}
          isSelf={coffee.host.profile.isSelf}
          status={coffee.status}
          toggleCoffeeReportModal={toggleCoffeeReportModal}
          type={type}
          getCoffeeId={getCoffeeId}
          getRequestingCoffeeId={getRequestingCoffeeId}
        />
      ))}
  </>
);

export default CoffeeGrid;
