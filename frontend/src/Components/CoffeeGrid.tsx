import React from "react";
import CoffeeCard from "./CoffeeCard";

interface IProps {
  requestingCoffees?: any;
  coffees?: any;
  toggleCoffeeModal: () => void;
  toggleCoffeeReportModal?: () => void;
  type?: string;
}

const CoffeeGrid: React.SFC<IProps> = ({
  requestingCoffees,
  coffees,
  toggleCoffeeModal,
  toggleCoffeeReportModal,
  type
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
          expires={coffee.naturalTime}
          status={coffee.status}
          requestingCoffees={true}
          toggleCoffeeModal={toggleCoffeeModal}
          type={type}
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
          expires={coffee.naturalTime}
          isSelf={coffee.host.profile.isSelf}
          status={coffee.status}
          requestingCoffees={false}
          toggleCoffeeModal={toggleCoffeeModal}
          toggleCoffeeReportModal={toggleCoffeeReportModal}
          type={type}
        />
      ))}
  </>
);

export default CoffeeGrid;
