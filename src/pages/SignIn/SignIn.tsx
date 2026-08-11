import cls from "./SignIn.module.css";
import { Link } from "react-router-dom";
import btn from "../../assets/buttons.module.css";
import { AuthErrorBanner } from "../../components/AuthErrorBanner";
import { AuthFields } from "../../components/AuthFields";
import { useAuthForm } from "../../hooks/useAuthForm";

export const SignIn = () => {
  const form = useAuthForm();
  return (
    <section className={cls.signIn}>
      <div className={cls.signInContent}>
        {form.textError && <AuthErrorBanner message={form.textError} onClose={form.clearError} />}
        <div className={cls.signInWrapper}>
          <h1 className={cls.signInTitle}>Sign in</h1>
          <form
            className={cls.signInForm}
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

            <button disabled={form.isFieldsDisabled} className={`${btn.btn} ${cls.signInButton}`} type="submit">
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
