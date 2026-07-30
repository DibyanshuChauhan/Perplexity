import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) {
    return null;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default Protected;
