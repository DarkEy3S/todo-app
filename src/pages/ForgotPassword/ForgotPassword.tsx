import { useId, useState } from "react";
import { Link, useSearchParams, useNavigate} from "react-router-dom";
import btn from "../../assets/buttons.module.css";
import field from "../../components/AuthFields/AuthFields.module.css";
import cls from "./ForgotPassword.module.css";
import { supabase } from "../../lib/supabase";
import { AuthErrorBanner } from "../../components/AuthErrorBanner";


export const ForgotPassword = () => {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const sent = useSearchParams()[0].has("sent");
  const navigate = useNavigate()

  return (
    <section className={cls.page}>
      <div className={cls.card}>
      {error && <AuthErrorBanner message={error} onClose={() => setError(null)}  />}

        <div className={cls.inner}>
          
          {sent ? (
            <>
              <h1 className={cls.title}>Check your email</h1>
              <p className={cls.text}>We sent a password reset link to your email. Open it and choose a new password.</p>
            </>
          ) : (
            <>
              <h1 className={cls.title}>Forgot password</h1>
              <p className={cls.text}>Enter the email associated with your account and we will send a reset link.</p>
              <form className={cls.form} onSubmit={(e) => e.preventDefault()}>
                <label className={field.label} htmlFor={emailId}>
                  <span className={field.labelTitle}>Email</span>
                  <input
                    id={emailId}
                    className={field.input}
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value.replaceAll(" ", ""))}
                  />
                </label>
                <button className={`${btn.btn} ${cls.button}`} type="submit" onClick={() => {
                  supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/reset-password`,
                  }).then(({ error }) => {
                    if (error) setError(error.message);
                    else navigate("/forgot-password?sent");
                  });
                }}>
                  Send reset link
                </button>
              </form>
            </>
          )}
          <Link className={cls.back} to="/signin">
            Back to Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};
