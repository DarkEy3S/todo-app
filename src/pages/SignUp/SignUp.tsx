import cls from "./SignUp.module.css";
import { Link } from "react-router-dom";
import { useId } from "react";
import btn from "../../assets/buttons.module.css";
import { useState } from "react";
import { AuthErrorBanner } from "../../components/AuthErrorBanner";
import { AuthFields } from "../../components/AuthFields";

export const SignUp = () => {
  const signUpEmailId: string = useId();
  const signUpPasswordId: string = useId();
  const signUpPrivacyId: string = useId();
  const [emailValidity, setEmailValidity] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [privacyCheckbox, setPrivacyCheckbox] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordVisible, isPasswordVisible] = useState(false);
  const [textError, setTextError] = useState<string | null>(null);

  const isEmailValid = !emailValidity;
  const isPasswordValid = passwordValue.trim().length < 4;

  const isSubmitDisabled = isEmailValid || isPasswordValid || !privacyCheckbox;
  const isEmailError = isEmailValid && emailTouched;
  const isPasswordError = isPasswordValid && passwordTouched;

  return (
    <section className={cls.signUp}>
      <div className={cls.signUpContent}>
        {textError && <AuthErrorBanner message={textError} onClose={() => setTextError(null)} />}

        <div className={cls.signUpWrapper}>
          <h1 className={cls.signUpTitle}>Sign up</h1>
          <form
            className={cls.signUpForm}
            action=""
            onSubmit={(event) => {
              event.preventDefault();
              if (emailValue === "test@test.test") {
                setTextError("User already exists");
              } else setTextError(null);
            }}
          >
            <AuthFields
              emailId={signUpEmailId}
              passwordId={signUpPasswordId}
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
            <label className={cls.signUpPrivacy} htmlFor={signUpPrivacyId}>
              <input
                checked={privacyCheckbox}
                onChange={(e) => {
                  setPrivacyCheckbox(e.target.checked);
                }}
                type="checkbox"
                id={signUpPrivacyId}
              />
              <span>
                I agree to the MaToDo <Link to={"#"}>Privacy Policy</Link>
              </span>
            </label>
            <button disabled={isSubmitDisabled} className={`${btn.btn} ${cls.signUpButton}`} type="submit">
              Sign up
            </button>
          </form>
          <div className={cls.signUpBlockSignIn}>
            <span>Already on MaToDo?</span> <Link to={"/signin"}>Sign in</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
