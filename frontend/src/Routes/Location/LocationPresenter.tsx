import React from "react";
import Loader from "src/Components/Loader";
import styled from "src/Styles/typed-components";
import { Link } from "react-router-dom";

const Container = styled.div``;

interface IProps {
  data: any;
  loading: boolean;
  className?: string;
}

const LocationPresenter: React.SFC<IProps> = ({ data, loading, className }) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data) {
    const {
      location: { countries = [] }
    } = data;
    return (
      <Container className={className}>
        1) 얼마나 많은 도시에서 활동 중이며, 어느 도시가 활발하게 활동하고
        있는지, 내가 지나온 길은 어디인지 비쥬얼 적으로 보여주는 페이지이다. 2)
        feed와, explore 둘 다, 현재 로그인 한 지역에 한하여 노출 시킨다. 3)
        feed에는 도시에 도착 한 사람의 아이디 노출, 팔로잉하는 유저가 좋아요 한
        카드 노출, 도시에서 업로드한 카드 노출 시킨다.
        {countries.map(country => (
          <Link to={`/location/${country.countryname}`}>
            <h1 key={country.id}>{country.countryname}</h1>
          </Link>
        ))}
      </Container>
    );
  } else {
    return null;
  }
};

export default LocationPresenter;
