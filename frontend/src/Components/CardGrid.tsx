import React from "react";
import styled from "src/Styles/typed-components";
import SquareCard from "./SquareCard";
import { Upload } from "../Icons";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  grid-gap: 15px;
  margin-bottom: 85px;
`;

const UploadIcon = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px 15px 0;
  svg {
    fill: white;
    transition: fill 0.2s ease-in-out;
  }
  &:hover {
    svg {
      fill: grey;
    }
  }
`;

interface IProps {
  cards?: any;
  className?: string;
  upload?: boolean;
  toggleUploadModal?: () => void;
}

const CardGrid: React.SFC<IProps> = ({
  cards,
  className,
  upload,
  toggleUploadModal
}) => (
  <Container className={className}>
    {upload && (
      <UploadIcon onClick={toggleUploadModal}>
        <Upload />
      </UploadIcon>
    )}
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
