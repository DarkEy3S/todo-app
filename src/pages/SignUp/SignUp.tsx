import cls from "./SignUp.module.css";
import { Link } from "react-router-dom";
import { useId } from "react";
import btn from "../../assets/buttons.module.css";
import { useState } from "react";
import { PasswordIconEyeClose, PasswordIconEyeOpen, StringIconInfo, StringIconClear } from "../../components/icons";

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
        {textError && (
          <div className={cls.signUpunsucces}>
            <div className={cls.stringIconInfo}>
              <StringIconInfo />
            </div>
            <div className={cls.signUpunsuccesMessage}>
              <span>{textError}</span>
            </div>
            <div className={cls.stringIconClear}>
              <button type="button" onClick={() => setTextError(null)}>
                <StringIconClear />
              </button>
            </div>
          </div>
        )}
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
            <label htmlFor={signUpEmailId}>
              <span>Email</span>
              <div className={cls.wrapper}>
                <input
                  className={`${isEmailError && cls.signUpFormInputError}`}
                  value={emailValue}
                  onChange={(e) => {
                    const cleaned = e.target.value.replaceAll(" ", "");
                    e.target.value = cleaned;
                    setEmailValue(cleaned);
                    setEmailValidity(e.target.checkValidity());
                  }}
                  id={signUpEmailId}
                  placeholder={"Email"}
                  aria-placeholder={"Email"}
                  type="email"
                  onBlur={() => {
                    setEmailTouched(true);
                  }}
                  required
                />
              </div>

              {isEmailError && <span className={cls.signUpFormInputMessage}>Invalid email format.</span>}
            </label>
            <label htmlFor={signUpPasswordId}>
              <span>Password</span>
              <div className={cls.wrapper}>
                <input
                  className={`${isPasswordError && cls.signUpFormInputError}`}
                  value={passwordValue}
                  onChange={(e) => {
                    const cleaned = e.target.value.replaceAll(" ", "");
                    e.target.value = cleaned;
                    setPasswordValue(cleaned);
                  }}
                  minLength={4}
                  placeholder={"Password"}
                  type={passwordVisible ? "text" : "password"}
                  id={signUpPasswordId}
                  onBlur={() => {
                    setPasswordTouched(true);
                  }}
                />
                <button
                  className={cls.signUpFormEye}
                  type="button"
                  onClick={() => {
                    isPasswordVisible((v) => !v);
                  }}
                >
                  {passwordVisible ? <PasswordIconEyeClose /> : <PasswordIconEyeOpen />}
                </button>
              </div>

              {isPasswordError && <span className={cls.signUpFormInputMessage}>4 characters minimum.</span>}
            </label>
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
            <span>Already on MaToDo?</span> <Link to={"#"}>Sign in</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
