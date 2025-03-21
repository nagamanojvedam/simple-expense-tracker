import { useState } from "react";
import { avatarsStyles, seeds } from "../utils/helpers";
import { setAvatar } from "../utils/authenticationApi";
import { useNavigate, useParams } from "react-router-dom";

const avatarsURL = "https://api.dicebear.com/9.x";
// const avatarsURL = "https://api.dicebear.com/9.x/adventurer/svg?seed=Luis";

function SetAvatar() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [seletedStyle, setSelectedStyle] = useState("adventurer-neutral");

  const handleSetAvatar = async (evnt) => {
    const response = await setAvatar(evnt.target.src, userId);

    if (response) navigate("/");
  };
  return (
    <main className="mt-40px flex h-dvh items-start justify-center bg-slate-500">
      <section className="mt-[60px] flex flex-col gap-4 rounded-sm bg-slate-200 p-6">
        <h2 className="text-center text-4xl font-semibold">Set Avatar</h2>
        <ul className="grid h-[450px] grid-cols-3 gap-6 overflow-y-auto p-6">
          {seeds.map((seed, idx) => (
            <img
              src={`${avatarsURL}/${seletedStyle}/svg/seed=${seed}&scale=80`}
              key={idx + 1}
              className="h-30 w-30 rounded-full hover:border-2 hover:border-slate-500/50"
              onClick={handleSetAvatar}
            />
          ))}
        </ul>
        <div className="mx-auto w-fit">
          <select
            name="avatars"
            id="avatars"
            value={seletedStyle}
            onChange={(evnt) => setSelectedStyle(evnt.target.value)}
            className="overflow-y-auto rounded-sm bg-white px-2 py-1"
          >
            {avatarsStyles.map((style) => (
              <option value={style.value} key={style.id}>
                {style.label}
              </option>
            ))}
          </select>
        </div>
      </section>
    </main>
  );
}

export default SetAvatar;
