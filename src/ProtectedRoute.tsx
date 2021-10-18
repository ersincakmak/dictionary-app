import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "./redux/store";

interface Props extends RouteProps {
  authenticated: boolean;
}

const ProtectedRoute: React.FC<Props> = ({
  authenticated,
  children,
  ...rest
}) => {
  const { auth, status } = useAppSelector((state) => state.auth);

  if (status !== "filled") {
    return <div></div>;
  }

  if (auth === authenticated) {
    return <Route {...rest}>{children}</Route>;
  } else {
    if (auth === true) {
      return <Redirect exact to="/" />;
    } else {
      return <Redirect exact to="/login" />;
    }
  }
};

export default ProtectedRoute;
