import cls from "./SignUp.module.css";
import { Link } from "react-router-dom";
import btn from "../../assets/buttons.module.css";
import { AuthErrorBanner } from "../../components/AuthErrorBanner";
import { AuthFields } from "../../components/AuthFields";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useId, useState } from "react";

export const SignUp = () => {
  const form = useAuthForm();
  const signUpPrivacyId = useId();
  const [privacyCheckbox, setPrivacyCheckbox] = useState(false);
  const isSubmitDisabled = form.isFieldsDisabled || !privacyCheckbox;

  return (
    <section className={cls.signUp}>
      <div className={cls.signUpContent}>
        {form.textError && <AuthErrorBanner message={form.textError} onClose={form.clearError} />}

        <div className={cls.signUpWrapper}>
          <h1 className={cls.signUpTitle}>Sign up</h1>
          <form
            className={cls.signUpForm}
            action=""
            onSubmit={(event) => {
              event.preventDefault();
              if (form.emailValue === "test@test.test") {
                form.setTextError("User already exists");
              } else form.setTextError(null);
            }}
          >
            <AuthFields
              emailId={form.emailId}
              passwordId={form.passwordId}
              emailValue={form.emailValue}
              passwordValue={form.passwordValue}
              onEmailChange={form.handleEmailChange}
              onPasswordChange={form.handlePasswordChange}
              onEmailBlur={form.handleEmailBlur}
              onPasswordBlur={form.handlePasswordBlur}
              isEmailError={form.isEmailError}
              isPasswordError={form.isPasswordError}
              passwordVisible={form.passwordVisible}
              onTogglePassword={form.togglePasswordVisible}
            />
            <label className={cls.signUpPrivacy} htmlFor={signUpPrivacyId}>
              <input
                checked={privacyCheckbox}
                onChange={(e) => setPrivacyCheckbox(e.target.checked)}
                type="checkbox"
                id={signUpPrivacyId}
              />
              <span>
                I agree to the MaToDo <Link to="/privacy">Privacy Policy</Link>
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
