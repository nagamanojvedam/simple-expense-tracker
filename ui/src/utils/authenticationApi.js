import axios from "axios";

const apiURL = "http://localhost:3000/api/v1/users";

const login = async (email, password) => {
  try {
    const response = await axios(`${apiURL}/login`, {
      method: "POST",
      data: {
        email,
        password,
      },
    });
    const { user } = response.data;
    user.password = undefined;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    console.error("Cannot login the user", err.response || err.message);
    return false;
  }
};
const signup = async (name, email, password, passwordConfirm) => {
  try {
    const response = await axios(`${apiURL}/signup`, {
      method: "POST",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    const { user } = response.data;
    user.password = undefined;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    console.error("Cannot signup the user", err.response || err.message);
    return false;
  }
};

const setAvatar = async (avatar, userId) => {
  try {
    const {
      data: { user },
    } = await axios(`${apiURL}/setavatar/${userId}`, {
      method: "POST",
      data: {
        avatar,
      },
    });
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    console.error("Cannot set avatar", err.response || err.message);
    return false;
  }
};
export { login, signup, setAvatar };
