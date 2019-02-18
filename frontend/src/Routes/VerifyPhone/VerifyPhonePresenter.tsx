import React from "react";
import Helmet from "react-helmet";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { MutationFn } from "react-apollo";
import Form from "src/Components/Form";
import styled from "src/Styles/typed-components";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  verificationKey: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn;
  loading: boolean;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
  verificationKey,
  onChange,
  onSubmit,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Puber</title>
    </Helmet>
    <ExtendedForm onSubmit={onSubmit}>
      <ExtendedInput
        value={verificationKey}
        placeholder={"Enter Verification Code"}
        onChange={onChange}
        name={"verificationKey"}
      />
      <Button onClick={null} inverted={loading} />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
