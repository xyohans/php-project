import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "http://localhost/project/backend/auth.php",
          { credentials: "include" }
        );
        const data = await res.json();
        setAllowed(data.loggedIn);
      } catch (error) {
        setAllowed(false);
      }
    };
    checkAuth();
  }, []);

  if (allowed === null) return null;
  if (!allowed) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
