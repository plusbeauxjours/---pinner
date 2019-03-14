import React from "react";
import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import styled from "../../Styles/typed-components";
import Avatar from "../../Components/Avatar";
import { Link } from "react-router-dom";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const CityPhoto = styled.img`
  display: flex;
  width: 650px;
  height: 200px;
  overflow: hidden;
  background-size: cover;
  border-radius: 3px;
  margin-bottom: 40px;
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
`;

const SAvatar = styled(Avatar)`
  margin: 3px;
`;

interface IProps {
  data?: any;
  loading: boolean;
}

const FeedByCityPresenter: React.SFC<IProps> = ({ data, loading }) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data) {
    console.log(data);

    const { feedByCity: { cards = {}, users = {}, city = {} } = {} } = data;
    return (
      <SWrapper>
        <h2>{city.cityName}</h2>
        <CityPhoto src={city.cityPhoto} />
        <Container>
          {users &&
            users.map(user => (
              <Link to={`/${user.username}`}>
                <SAvatar size={"sm"} key={user.id} url={user.profile.avatar} />
              </Link>
            ))}
        </Container>
        {cards &&
          cards.map(card => (
            <Photo
              id={card.id}
              key={card.id}
              inline={true}
              creatorAvatar={card.creator.profile.avatar}
              creatorUsername={card.creator.username}
              country={card.country.countryName}
              city={card.city.cityName}
              photoUrl={card.file}
              likeCount={card.likeCount}
              commentCount={card.commentCount}
              caption={card.caption}
              comments={card.comments}
              createdAt={card.createdAt}
              isLiked={card.isLiked}
              borderRadius={card.borderRadius}
            />
          ))}
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default FeedByCityPresenter;
