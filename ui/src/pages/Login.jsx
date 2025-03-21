import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/authenticationApi";
import { useTransactions } from "../contexts/TransactionContext";

function Login() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { setUser } = useTransactions();

  const onSubmit = async (data) => {
    const { email, password } = data;
    if (!email || !password) return;

    const response = await login(email, password);
    console.log(response);

    if (response) {
      setUser(response);
      navigate("/");
    }
    console.log("to home page");
  };
  return (
    <main className="flex h-dvh items-center justify-center bg-slate-700">
      <section className="w-[540px] space-y-2 rounded-md bg-slate-300 p-4">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-12 text-slate-600"
          >
            <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
          </svg>

          <span className="text-3xl font-semibold">Login</span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-[80%] space-y-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-md font-semibold">Email address</label>
            <input
              type="email"
              className="rounded-sm bg-slate-100 px-3 py-2 focus:outline-2 focus:outline-blue-400/40"
              placeholder="Your email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors?.email && (
              <p className="rounded-sm px-2 py-1 text-sm text-red-500">
                {errors?.email?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              className="rounded-sm bg-slate-100 px-3 py-2 focus:outline-2 focus:outline-blue-400/40"
              placeholder="********"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors?.password && (
              <p className="rounded-sm px-2 py-1 text-sm text-red-500">
                {errors?.password?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button className="m-auto w-fit rounded-sm bg-blue-700 px-4 py-2 text-slate-200 hover:bg-blue-500 hover:text-slate-50">
              Login
            </button>
            <p className="m-auto w-fit">
              Don't Have an Account?{" "}
              <Link
                to="/register"
                className="text-blue-700 hover:text-blue-500"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
