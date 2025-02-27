import useAuthAction from "@/hooks/useAuthAction";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router";
import { loginClasses } from "./Login";
import { Button, Input } from "@/components/ui";

const PWD_REGEX = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function Label({
  label,
  valid,
  value,
  htmlFor,
}: {
  label: string;
  valid: boolean;
  value: string;
  htmlFor: string;
}) {
  return (
    <div className="flex items-center space-x-1">
      <label htmlFor={htmlFor} className="text-[#333] text-[16px]">
        {label}
      </label>
      {!!value && (
        <>
          {valid ? (
            <CheckIcon className="w-6 text-xanh-500" />
          ) : (
            <XMarkIcon className="w-6 text-red-500" />
          )}
        </>
      )}
    </div>
  );
}

export default function Signup() {
  const { isFetching, action, user } = useAuthAction();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const ableToSubmit = validPassword && validConfirmPassword;

  const handleSignup: FormEventHandler = async (e) => {
    try {
      e.preventDefault();

      setErrorMessage("");
      await action({ type: "register", email, password });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email already registed !");
      } else {
        setErrorMessage("Register fail");
      }

      console.log({ error });
    }
  };

  // validate password
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    let match = password === confirmPassword;

    if (!password) match = false;
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);

  if (user) return <Navigate to={"/"} />;

  return (
    <div className={loginClasses.container}>
      <form
        onSubmit={handleSignup}
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
            <Label htmlFor="email" value={email} label="Email" valid={true} />

            <Input
              ref={inputRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
            />
          </div>
          <div className={loginClasses.inputGroup}>
            <Label
              valid={validPassword}
              htmlFor="password"
              value={password}
              label="Password"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              id="password"
              autoComplete="off"
              required
            />
          </div>

          <div className={loginClasses.inputGroup}>
            <Label
              valid={validConfirmPassword}
              htmlFor="confirm-password"
              value={confirmPassword}
              label="Confirm password"
            />
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="text"
              id="confirm-password"
              autoComplete="off"
              required
            />
          </div>

          <div className="md:text-right">
            <Button
              disabled={!ableToSubmit}
              className="w-full justify-center md:w-auto mt-5"
              type="submit"
            >
              Signup
            </Button>
            <p className="mt-5 text-[#333]">
              Already have an account ?,
              <Link
                className="text-xanh-500 hover:underline ml-[4px]"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
