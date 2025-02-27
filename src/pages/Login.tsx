import { Button, Input } from "@/components/ui";
import useAuthAction from "@/hooks/useAuthAction";
import { FormEventHandler, useRef, useState } from "react";
import { Link, Navigate } from "react-router";

export const loginClasses = {
  container:
    "rounded-[24px] w-[90vw] md:flex-grow md:w-auto mx-auto my-auto md:mx-[100px] bg-white p-[20px] md:px-[30px] md:pt-[calc(40px+30px+10px)]",
  form: "flex flex-col md:flex-row justify-between",
  myChat: "text-xl leading-[40px] font-[500]",
  right: "space-y-[16px] mt-[20px] md:mt-0",
  inputGroup: "flex flex-col space-y-1",
  label: "text-[#333]",
  errorMessage:
    "bg-red-400 text-white font-[500] md:mr-[14px] p-1.5 mt-5 rounded-md inline-block",
};

export default function Login() {
  const { isFetching, action, user } = useAuthAction();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const ableToSubmit = password && email;

  const handleLogin: FormEventHandler = async (e) => {
    try {
      e.preventDefault();

      setErrorMessage("");
      await action({ type: "login", email, password });
    } catch (error: any) {
      if (!error) {
        setErrorMessage("No server response");
      } else if (error?.code === "auth/invalid-credential") {
        setErrorMessage("Email or password is incorrect !");
      } else {
        setErrorMessage("Sign in fail");
      }

      console.log({ error });
    }
  };

  if (user) return <Navigate to={"/"} />;

  return (
    <div className={loginClasses.container}>
      <form
        onSubmit={handleLogin}
        className={`${loginClasses.form} ${
          isFetching ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        <div className="mt-0 md:mt-[-50px] text-center md:text-left">
          <h1 className={loginClasses.myChat}>
            Argo <span className="text-xanh-500">Store</span>
          </h1>
          <h1 className="text-[26px] mt-[10px] text-[#333]">Sign in</h1>
          {errorMessage && (
            <p className={loginClasses.errorMessage}>{errorMessage}</p>
          )}
        </div>
        <div className={loginClasses.right}>
          <div className={`${loginClasses.inputGroup} pt-[8px]`}>
            <label className={loginClasses.label} htmlFor="email">
              Email
            </label>
            <Input
              ref={inputRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
            />
          </div>
          <div className={loginClasses.inputGroup}>
            <label className={loginClasses.label} htmlFor="password">
              Password
            </label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              id="password"
              autoComplete="off"
              required
            />
          </div>

          <div className="md:text-right">
            <Button
              loading={isFetching}
              disabled={!ableToSubmit}
              className="w-full md:w-auto mt-5"
              type="submit"
            >
              Login
            </Button>
            <p className="mt-5 text-[#333]">
              Don't have an account jet ?,
              <Link
                className="text-xanh-500 hover:underline ml-[4px]"
                to="/signup"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
