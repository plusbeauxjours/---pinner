import React from "react";
import styled from "src/Styles/typed-components";
import SquareCard from "./SquareCard";
import UpLoad from "src/Routes/UpLoad";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  grid-gap: 10px;
  margin-bottom: 85px;
  padding: 15px;
`;

interface IProps {
  cards?: any;
  className?: string;
  upload?: boolean;
  toggleUploadModal?: () => void;
}

const CardGrid: React.SFC<IProps> = ({ cards, className, upload }) => (
  <Container className={className}>
    <UpLoad upload={upload} />
    {cards &&
      cards.map(card => (
        <SquareCard
          key={card.id}
          id={card.id}
          file={card.file}
          caption={card.caption}
          likeCount={card.likeCount}
          commentCount={card.commentCount}
        />
      ))}
  </Container>
);

export default CardGrid;
