import { Navigate, useLocation } from "react-router-dom";
import { getLoggedInUserId } from "../utils/auth";

function ProtectedUserRoute({ children }) {
  const location = useLocation();
  const userId = getLoggedInUserId();

  if (!userId) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedUserRoute;
