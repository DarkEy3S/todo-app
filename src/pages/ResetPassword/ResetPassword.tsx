import { useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import btn from "../../assets/buttons.module.css";
import field from "../../components/AuthFields/AuthFields.module.css";
import cls from "../ForgotPassword/ForgotPassword.module.css";
import { supabase } from "../../lib/supabase";
import { AuthErrorBanner } from "../../components/AuthErrorBanner";


export const ResetPassword = () => {
  const passwordId = useId();
  const confirmId = useId();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState(""); 
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  return (
    <section className={cls.page}>
      <div className={cls.card}>
      {error && <AuthErrorBanner message={error} onClose={() => setError(null)}  />}

        <div className={cls.inner}>
          <h1 className={cls.title}>Reset password</h1>
          <p className={cls.text}>Choose a new password for your account.</p>
          <form className={cls.form} onSubmit={(e) => e.preventDefault()}>
            <label className={field.label} htmlFor={passwordId}>
              <span className={field.labelTitle}>New password</span>
              <input
                id={passwordId}
                className={field.input}
                type="password"
                placeholder="Password"
                minLength={4}
                value={password}
                onChange={(e) => setPassword(e.target.value.replaceAll(" ", ""))}
              />
            </label>
            <label className={field.label} htmlFor={confirmId}>
              <span className={field.labelTitle}>Confirm password</span>
              <input
                id={confirmId}
                className={field.input}
                type="password"
                placeholder="Password"
                minLength={4}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value.replaceAll(" ", ""))}
              />
            </label>
            <button className={`${btn.btn} ${cls.button}`} type="submit" onClick={() => {
              supabase.auth.updateUser({password: password}).then(({ error }) => {
                if (error) setError(error.message);
                else navigate("/todos");
              });
            }}>
              Save password
            </button>
          </form>
          <Link className={cls.back} to="/signin">
            Back to Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};
