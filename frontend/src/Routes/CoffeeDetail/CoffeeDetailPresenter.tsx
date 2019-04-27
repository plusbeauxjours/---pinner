import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

import Loader from "../../Components/Loader";
import Wrapper from "../../Components/Wrapper";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import FollowBtn from "../../Components/FollowBtn";
import CoffeeBtn from "src/Components/CoffeeBtn";

const SWrapper = styled(Wrapper)`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 280px;
`;

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
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 30%;
`;

const SAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const SBold = styled(Bold)`
  margin-bottom: 3px;
  display: block;
`;

const Location = styled.span`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 200;
`;

interface IProps {
  data: any;
  loading: boolean;
  modalOpen: boolean;
  back: any;
}

const CoffeeDetailPresenter: React.SFC<IProps> = ({
  data: { coffeeDetail: { coffee = null } = {} } = {},
  loading,
  modalOpen,
  back
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && coffee) {
    return (
      <ModalContainer>
        <ModalOverlay onClick={back} />
        <FormModal>
          <SWrapper>
            <SAvatar url={coffee.host.profile.avatar} size="md" />
            <SBold text={coffee.host.username} />
            <Location>
              {coffee.host.profile.currentCity.cityName},
              {coffee.host.profile.currentCity.country.countryName}
            </Location>

            <FollowBtn
              isFollowing={coffee.host.profile.isFollowing}
              userId={coffee.host.id}
            />
            <Location />

            <Location>
              <SBold text={"FOLLOWERS "} />
              {coffee.host.profile.followersCount}
            </Location>
            <Location>
              <SBold text={"FOLLOWINGS "} />
              {coffee.host.profile.followingCount}
            </Location>
            <Location>
              <SBold text={"TRIPS "} />
              {coffee.host.profile.tripCount}
            </Location>

            <SBold text={coffee.naturalTime} />
            <Location>
              <SBold text={coffee.target} />
            </Location>
            <Location>
              <SBold text={coffee.status} />
            </Location>
            {coffee.status !== "expired" && (
              <CoffeeBtn
                coffeeId={coffee.id}
                isMatching={coffee.isMatching}
                isSelf={coffee.host.profile.isSelf}
              />
            )}

            {/* {coffee.host.profile.nationality.countryName} */}
          </SWrapper>
        </FormModal>
      </ModalContainer>
    );
  }
  return null;
};

export default CoffeeDetailPresenter;
