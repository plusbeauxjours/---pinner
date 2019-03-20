import React from "react";
import UserCard from "./UserCard";

interface IProps {
  users?: any;
  className?: string;
}

const UserGrid: React.SFC<IProps> = ({ users, className }) => {
  return (
    <>
      {users.map(user => (
        <UserCard
          key={user.id}
          id={user.id}
          avatar={user.profile.avatar}
          username={user.username}
          currentCity={user.profile.currentCity.cityName}
          currentCountry={user.profile.currentCity.country.countryName}
          isFollowing={user.profile.isFollowing}
        />
      ))}
    </>
  );
};

export default UserGrid;
