import cls from "./SignIn.module.css";
import { Link } from "react-router-dom";
import { useId } from "react";
import btn from "../../assets/buttons.module.css";
import { useState } from "react";
import { AuthErrorBanner } from "../../components/AuthErrorBanner";
import { AuthFields } from "../../components/AuthFields";

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
        {textError && <AuthErrorBanner message={textError} onClose={() => setTextError(null)} />}
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
            <AuthFields
              emailId={signInEmailId}
              passwordId={signInPasswordId}
              emailValue={emailValue}
              passwordValue={passwordValue}
              onEmailChange={(e) => {
                const cleaned = e.target.value.replaceAll(" ", "");
                e.target.value = cleaned;
                setEmailValue(cleaned);
                setEmailValidity(e.target.checkValidity());
              }}
              onPasswordChange={(e) => {
                const cleaned = e.target.value.replaceAll(" ", "");
                e.target.value = cleaned;
                setPasswordValue(cleaned);
              }}
              onEmailBlur={() => setEmailTouched(true)}
              onPasswordBlur={() => setPasswordTouched(true)}
              isEmailError={isEmailError}
              isPasswordError={isPasswordError}
              passwordVisible={passwordVisible}
              onTogglePassword={() => isPasswordVisible((v) => !v)}
            />

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
