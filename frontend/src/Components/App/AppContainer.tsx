import React from "react";
import { Query } from "react-apollo";
import { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import AppPresenter from "./AppPresenter";
import GlobalStyles from "../../Styles/global-styles";
import theme from "../../Styles/theme";
import { APP_QUERIES } from "./AppQueries.local";
import Footer from "../Footer";
import "react-toastify/dist/ReactToastify.css";

export default () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      <Query query={APP_QUERIES}>
        {({
          data: {
            auth: { isLoggedIn }
          }
        }) => <AppPresenter isLoggedIn={isLoggedIn} />}
      </Query>
      <Footer />
    </>
  </ThemeProvider>
);
