/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import { auth } from "./firebase";
import Exam from "./pages/Exam";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import { authenticate, setStatus, unAuthenticate } from "./redux/authSlice";
import { useAppDispatch } from "./redux/store";
import GlobalStyle from "./styles/Global";
import { DarkTheme, LightTheme, useTheme } from "./theme";

const App = () => {
  const [theme, settheme] = useTheme();

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch(setStatus("pending"));
      if (user) {
        dispatch(authenticate(JSON.parse(JSON.stringify(user))));
      } else {
        dispatch(unAuthenticate());
      }
    });
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <GlobalStyle />
          <Header
            toggleTheme={() =>
              settheme(theme.title === "dark" ? LightTheme : DarkTheme)
            }
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/login"
              authenticated={false}
              component={Login}
            />
            <ProtectedRoute
              exact
              path="/register"
              authenticated={false}
              component={Register}
            />
            <ProtectedRoute
              exact
              path="/forgotpassword"
              authenticated={false}
              component={ForgotPassword}
            />
            <ProtectedRoute
              exact
              path="/"
              authenticated={true}
              component={Home}
            />
            <ProtectedRoute
              exact
              path="/exam"
              authenticated={true}
              component={Exam}
            />

            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
