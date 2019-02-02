import React from "react";
import { IS_LOGGED_IN } from "./AppQueries.local";
import { graphql } from "react-apollo";
import AppPresenter from "./AppPresenter";
import { ThemeProvider } from "src/typed-components";
import theme from "src/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyle from "src/global-styles";

const AppContainer = ({ data }) => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <>
        <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
        <GlobalStyle />
      </>
    </ThemeProvider>
    <ToastContainer draggable={true} position={"bottom-center"} />
  </React.Fragment>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
