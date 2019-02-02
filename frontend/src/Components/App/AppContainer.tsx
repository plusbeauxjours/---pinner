import React from "react";
import { IS_LOGGED_IN } from "./AppQueries.local";
import { graphql } from "react-apollo";
import AppPresenter from "./AppPresenter";
import { ThemeProvider } from "../../Styles/typed-components";
import theme from "../../Styles/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyle from "../../Styles/global-styles";
import Footer from "../Footer.ts";

const AppContainer = ({ data }) => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <>
        <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
        <GlobalStyle />
        <Footer />
      </>
    </ThemeProvider>
    <ToastContainer draggable={true} position={"bottom-center"} />
  </React.Fragment>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
