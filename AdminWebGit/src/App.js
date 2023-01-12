import React, { Suspense, Fragment } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { routes } from "src/routes";
import { createBrowserHistory } from "history";
import AuthContext from "src/context/Auth";
import PageLoading from "src/component/PageLoading";
import AuthGuard from "src/component/AuthGuard";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "src/theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CookieConsent from "react-cookie-consent";


const history = createBrowserHistory();
const accessToken = window.localStorage.getItem("creatturAccessToken");

function App() {
  const theme = createTheme();
  return (
    <div className="App" style={{ height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AuthContext>
            <Router history={history}>
              <RenderRoutes data={routes} />
              {/* {accessToken && 
              } */}
              <CookieConsent
                location="bottom"
                buttonText="I understand"
                cookieName="myAwesomeCookieName2"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
                overlay
                overlayClasses="noclick"
              // onOverlayClick={() => {
              //   document.getElementById("approot").style.pointerEvents = "none";
              // }}
              >
                This website uses cookies to ensure you get the best experience. By using our site, you agree to our use of cookies and our terms of use.

              </CookieConsent>
              <ToastContainer />
            </Router>
          </AuthContext>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

function RenderRoutes(props) {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {props.data.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard ? AuthGuard : Fragment;
          const Layout = route.layout || Fragment;
          return (
            <Route
              exact={route.exact}
              key={i}
              path={route.path}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      <RenderRoutes data={route.routes} />
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}
