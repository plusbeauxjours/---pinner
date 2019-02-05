import React from "react";
import { MutationFn } from "react-apollo";

interface IProps {
  onSubmit: MutationFn;
  className?: string;
}

const Form: React.SFC<IProps> = ({ children, onSubmit }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
  >
    {children}
  </form>
);

export default Form;
