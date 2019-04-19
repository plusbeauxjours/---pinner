import React from "react";
import styled from "src/Styles/typed-components";
import Button from "../Button";

const SButton = styled(Button)`
  z-index: 1;
  width: 50%;
`;

interface IProps {
  matchFn?: any;
  unMatchFn?: any;
  isMatching: boolean;
}

const CoffeeBtnPresenter: React.SFC<IProps> = ({
  matchFn,
  unMatchFn,
  isMatching
}) => (
  <>
    {isMatching ? (
      <SButton size={"xs"} text={"JOIN"} onClick={unMatchFn} />
    ) : (
      <SButton size={"xs"} text={"JOIN"} onClick={matchFn} />
    )}
  </>
);

export default CoffeeBtnPresenter;
