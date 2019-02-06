import React from "react";

interface IProps {
  onSubmit: any;
  className?: string;
}

const Form: React.SFC<IProps> = ({ children, onSubmit, className }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
    className={className}
  >
    {children}
  </form>
);

export default Form;
