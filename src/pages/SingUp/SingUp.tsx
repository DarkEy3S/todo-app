import cls from "./SingUp.module.css";
import { Link } from "react-router-dom";
import { useId } from "react";
import btn from "../../assets/buttons.module.css";
import { useState } from "react";

export const SingUp = () => {
  const singUpEmailId: string = useId();
  const singUpPasswordId: string = useId();
  const singUpPrivacyId: string = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [privacyCheckbox, setPrivacyCheckbox] = useState(false);

  const isSubmitDisabled = email.trim() === "" || password.trim() === "" || privacyCheckbox === false;

  return (
    <section className={cls.singUp}>
      <div className={cls.singUpWrapper}>
        <h1 className={cls.singUpTitle}>Sing up</h1>
        <form className={cls.singUpForm} action="">
          <label htmlFor={singUpEmailId}>
            <span>Email</span>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id={singUpEmailId}
              placeholder={"Email"}
              aria-placeholder={"Email"}
              type="email"
            />
          </label>
          <label htmlFor={singUpPasswordId}>
            <span>Password</span>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              minLength={4}
              placeholder={"Password"}
              aria-placeholder={"Password"}
              type="password"
              id={singUpPasswordId}
            />
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
