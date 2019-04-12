import React from "react";
import Loader from "src/Components/Loader";
import Wrapper from "src/Components/Wrapper";
import styled from "styled-components";
import { keyframes } from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalAnimation = keyframes`
	  from{
	    opacity:0;
	    transform:scale(1.1);
	  }
	  to{
	    opacity:1;
	    transform:none;
	  }
	`;

const Modal = styled.div`
  background-color: #2d3a41;
  width: 30%;
  border-radius: 12px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
`;

const FormModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 30%;
`;

interface IProps {
  data: any;
  loading: boolean;
  back: any;
}

const CoffeeDetailPresenter: React.SFC<IProps> = ({
  data: { coffeeDetail: { coffee = null } = {} } = {},
  loading,
  back
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && coffee) {
    return (
      <ModalContainer>
        <ModalOverlay onClick={back} />
        <FormModal>
          <Wrapper>
            {coffee.expires}
            {coffee.status}
            {coffee.target}
            {coffee.host.username}
            {coffee.host.profile.gender}
            {coffee.host.profile.avatar}
            {coffee.host.profile.currentCity.cityName}
            {coffee.host.profile.currentCity.country.countryName}
            {coffee.host.profile.isFollowing}
            {/* {coffee.host.profile.nationality.countryName} */}
            {coffee.host.profile.followersCount}
            {coffee.host.profile.followingCount}
            {coffee.host.profile.tripCount}
          </Wrapper>
        </FormModal>
      </ModalContainer>
    );
  }
  return null;
};

export default CoffeeDetailPresenter;
