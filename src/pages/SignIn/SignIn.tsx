import cls from "./SignIn.module.css";
import { Link } from "react-router-dom";
import { useId } from "react";
import btn from "../../assets/buttons.module.css";
import { useState } from "react";
import { PasswordIconEyeClose, PasswordIconEyeOpen, StringIconInfo, StringIconClear } from "../../components/icons";

export const SignIn = () => {
  const signInEmailId: string = useId();
  const signInPasswordId: string = useId();
  const [emailValidity, setEmailValidity] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordVisible, isPasswordVisible] = useState(false);
  const [textError, setTextError] = useState<string | null>(null);

  const isEmailValid = !emailValidity;
  const isPasswordValid = passwordValue.trim().length < 4;

  const isSubmitDisabled = isEmailValid || isPasswordValid;
  const isEmailError = isEmailValid && emailTouched;
  const isPasswordError = isPasswordValid && passwordTouched;

  return (
    <section className={cls.signIn}>
      <div className={cls.signInContent}>
        {textError && (
          <div className={cls.signInunsucces}>
            <div className={cls.stringIconInfo}>
              <StringIconInfo />
            </div>
            <div className={cls.signInunsuccesMessage}>
              <span>{textError}</span>
            </div>
            <div className={cls.stringIconClear}>
              <button type="button" onClick={() => setTextError(null)}>
                <StringIconClear />
              </button>
            </div>
          </div>
        )}
        <div className={cls.signInWrapper}>
          <h1 className={cls.signInTitle}>Sign in</h1>
          <form
            className={cls.signInForm}
            action=""
            onSubmit={(event) => {
              event.preventDefault();
              if (emailValue === "test@test.test") {
                setTextError("User already exists");
              } else setTextError(null);
            }}
          >
            <label htmlFor={signInEmailId}>
              <span>Email</span>
              <div className={cls.wrapper}>
                <input
                  className={`${isEmailError && cls.signInFormInputError}`}
                  value={emailValue}
                  onChange={(e) => {
                    const cleaned = e.target.value.replaceAll(" ", "");
                    e.target.value = cleaned;
                    setEmailValue(cleaned);
                    setEmailValidity(e.target.checkValidity());
                  }}
                  id={signInEmailId}
                  placeholder={"Email"}
                  aria-placeholder={"Email"}
                  type="email"
                  onBlur={() => {
                    setEmailTouched(true);
                  }}
                  required
                />
              </div>

              {isEmailError && <span className={cls.signInFormInputMessage}>Invalid email format.</span>}
            </label>
            <label htmlFor={signInPasswordId}>
              <span>Password</span>
              <div className={cls.wrapper}>
                <input
                  className={`${isPasswordError && cls.signInFormInputError}`}
                  value={passwordValue}
                  onChange={(e) => {
                    const cleaned = e.target.value.replaceAll(" ", "");
                    e.target.value = cleaned;
                    setPasswordValue(cleaned);
                  }}
                  minLength={4}
                  placeholder={"Password"}
                  type={passwordVisible ? "text" : "password"}
                  id={signInPasswordId}
                  onBlur={() => {
                    setPasswordTouched(true);
                  }}
                />
                <button
                  className={cls.signInFormEye}
                  type="button"
                  onClick={() => {
                    isPasswordVisible((v) => !v);
                  }}
                >
                  {passwordVisible ? <PasswordIconEyeClose /> : <PasswordIconEyeOpen />}
                </button>
              </div>

              {isPasswordError && <span className={cls.signInFormInputMessage}>4 characters minimum.</span>}
            </label>

            <button disabled={isSubmitDisabled} className={`${btn.btn} ${cls.signInButton}`} type="submit">
              Sign in
            </button>
          </form>
          <div className={cls.signInPageForgot}>
            <Link to={"#"}>Forgot password?</Link>
          </div>
          <div className={cls.signInBlockSignIn}>
            <span>Already on MaToDo?</span> <Link to={"/signup"}>Sign up</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
