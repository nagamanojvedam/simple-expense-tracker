import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedLayout({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) navigate("/login");
    else setIsAuthenticated(true);
  }, [navigate]);

  if (isAuthenticated) return children;
}

export default ProtectedLayout;
