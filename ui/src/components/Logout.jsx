import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="m-auto h-fit cursor-pointer rounded-sm bg-blue-600 px-4 py-1 text-slate-50"
    >
      Logout
    </button>
  );
}

export default Logout;
