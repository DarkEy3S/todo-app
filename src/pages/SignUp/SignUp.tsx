import cls from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import btn from "../../assets/buttons.module.css";
import { AuthErrorBanner } from "../../components/AuthErrorBanner";
import { AuthFields } from "../../components/AuthFields";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useId, useState } from "react";
import { supabase } from "../../lib/supabase";

export const SignUp = () => {
  const form = useAuthForm();
  const navigate = useNavigate();
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
              supabase.auth.signUp({
                email: form.emailValue,
                password: form.passwordValue,
                options: {
                  emailRedirectTo: `${window.location.origin}/todos`,
                }
              }).then(({ error }) => {
                if (error) form.setTextError(error.message);
                else navigate("/confirm-email", { state: { email: form.emailValue } });
              });
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
