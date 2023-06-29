import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { authenticated, selectedProfile } = useAuth();
  const isAuthorized = authenticated && !!selectedProfile;

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized, navigate]);

  return isAuthorized ? children : null;
}

export default ProtectedRoute;
