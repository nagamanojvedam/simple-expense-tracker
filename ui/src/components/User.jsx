import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

function User() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex gap-6">
      <div className="flex items-center justify-center gap-2">
        <img
          src={user.avatar}
          alt={`${user.name}'s image`}
          className="h-12 w-12 cursor-pointer rounded-full border-2 border-slate-300"
          onClick={() => navigate(`/setavatar/${user._id}`)}
        />
        <span className="font-semibold capitalize">{user.name}</span>
      </div>
      <Logout />
    </div>
  );
}

export default User;
