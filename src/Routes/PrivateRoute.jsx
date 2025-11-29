import { useContext } from "react";
import { AuthContext } from "../Contetexts/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../Componennts/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loading></Loading>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivateRoute;



