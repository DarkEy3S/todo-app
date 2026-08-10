import cls from "./SingUp.module.css";
import { Link } from "react-router-dom";
import { useId } from "react";
import btn from "../../assets/buttons.module.css";
import { useState } from "react";
import { PasswordIconEyeClose, PasswordIconEyeOpen } from "../../components/icons";

export const SingUp = () => {
  const singUpEmailId: string = useId();
  const singUpPasswordId: string = useId();
  const singUpPrivacyId: string = useId();
  const [emailValidity, setEmailValidity] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [privacyCheckbox, setPrivacyCheckbox] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passworddTouched, setPasswordTouched] = useState(false);
  const [passwordVisible, isPasswordVisible] = useState(false);

  const isEmailValid = emailValidity === false;
  const isPasswordValid = passwordValue.trim().length < 4;

  const isSubmitDisabled = isEmailValid || isPasswordValid || privacyCheckbox === false;
  const isEmailError = isEmailValid && emailTouched;
  const isPasswordError = isPasswordValid && passworddTouched;

  return (
    <section className={cls.singUp}>
      <div className={cls.singUpWrapper}>
        <h1 className={cls.singUpTitle}>Sing up</h1>
        <form className={cls.singUpForm} action="">
          <label htmlFor={singUpEmailId}>
            <span>Email</span>
            <div className={cls.wrapper}>
              <input
                className={`${isEmailError && cls.singUpFormInputError}`}
                value={emailValue}
                onChange={(e) => {
                  const cleaned = e.target.value.replaceAll(" ", "");
                  e.target.value = cleaned;
                  setEmailValue(cleaned);
                  setEmailValidity(e.target.checkValidity());
                }}
                id={singUpEmailId}
                placeholder={"Email"}
                aria-placeholder={"Email"}
                type="email"
                onBlur={() => {
                  setEmailTouched(true);
                }}
                required
              />
            </div>

            {isEmailError && <span className={cls.singUpFormInputMessage}>Invalid email format.</span>}
          </label>
          <label htmlFor={singUpPasswordId}>
            <span>Password</span>
            <div className={cls.wrapper}>
              <input
                className={`${isPasswordError && cls.singUpFormInputError}`}
                value={passwordValue}
                onChange={(e) => {
                  const cleaned = e.target.value.replaceAll(" ", "");
                  e.target.value = cleaned;
                  setPasswordValue(cleaned);
                }}
                minLength={4}
                placeholder={"Password"}
                type={passwordVisible ? "text" : "password"}
                id={singUpPasswordId}
                onBlur={() => {
                  setPasswordTouched(true);
                }}
              />
              <button
                className={cls.singUpFormEye}
                type="button"
                onClick={() => {
                  isPasswordVisible((v) => !v);
                }}
              >
                {passwordVisible ? <PasswordIconEyeClose /> : <PasswordIconEyeOpen />}
              </button>
            </div>

            {isPasswordError && <span className={cls.singUpFormInputMessage}>4 characters minimum.</span>}
          </label>
          <label className={cls.singUpPrivacy} htmlFor={singUpPrivacyId}>
            <input
              checked={privacyCheckbox}
              onChange={(e) => {
                setPrivacyCheckbox(e.target.checked);
              }}
              type="checkbox"
              id={singUpPrivacyId}
            />
            <span>
              I agree to the MaToDo <Link to={"#"}>Privacy Policy</Link>
            </span>
          </label>

          <button disabled={isSubmitDisabled} className={`${btn.btn} ${cls.singUpButton}`} type="submit">
            Sing up
          </button>
        </form>
        <div className={cls.singUpBlockSignIn}>
          <span>Already on MaToDo?</span> <Link to={"#"}>Sing in</Link>
        </div>
      </div>
    </section>
  );
};
