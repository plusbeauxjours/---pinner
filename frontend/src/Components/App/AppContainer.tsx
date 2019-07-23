import React from "react";
import { Query } from "react-apollo";
import { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import Router from "../Router";
import GlobalStyles from "../../Styles/global-styles";
import theme from "../../Styles/theme";
import { APP_QUERIES } from "./AppQueries.local";
import "react-toastify/dist/ReactToastify.css";
import browserHistory from "src/Apollo/browserHistory";

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
        }) => (
          <Router
            onUpdate={() => window.scrollTo(0, 0)}
            history={browserHistory}
            isLoggedIn={isLoggedIn}
          />
        )}
      </Query>
      {/* <Footer /> */}
    </>
  </ThemeProvider>
);
