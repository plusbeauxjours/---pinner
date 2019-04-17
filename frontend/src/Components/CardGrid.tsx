import React from "react";
import styled from "src/Styles/typed-components";
import SquareCard from "./SquareCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  grid-gap: 15px;
  margin-bottom: 85px;
`;

interface IProps {
  cards?: any;
  selfCards?: any;
  className?: string;
}

const CardGrid: React.SFC<IProps> = ({ selfCards, cards, className }) => (
  <Container className={className}>
    {selfCards &&
      selfCards.map(selfCard => (
        <SquareCard
          key={selfCard.id}
          id={selfCard.id}
          file={selfCard.file}
          caption={selfCard.caption}
          likeCount={selfCard.likeCount}
          commentCount={selfCard.commentCount}
        />
      ))}
    {cards.map(card => (
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
