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
}

const CoffeeBtnPresenter: React.SFC<IProps> = ({ matchFn, unMatchFn }) => (
  <>
    <SButton size={"xs"} text={"JOIN"} onClick={matchFn} />
  </>
);

export default CoffeeBtnPresenter;
