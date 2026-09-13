import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import btn from "../../assets/buttons.module.css";
import { supabase } from "../../lib/supabase";
import cls from "./ConfirmEmail.module.css";

const WAIT = 60;

export const ConfirmEmail = () => {
  const { state, search } = useLocation();
  const email = (state as { email?: string } | null)?.email;
  const failed = Boolean((state as { failed?: boolean } | null)?.failed) || new URLSearchParams(search).has("failed");
  const [left, setLeft] = useState(WAIT);

  useEffect(() => {
    if (left <= 0) return;
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [left]);

  const resend = async () => {
    if (left > 0 || !email) return;
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/todos` },
    });
    if (!error) setLeft(WAIT);
  };

  return (
    <section className={cls.page}>
      <div className={cls.card}>
        <div className={cls.inner}>
          <h1 className={cls.title}>{failed ? "Email Confirmation Failed!" : "Confirm Your Email Address"}</h1>
          <p className={cls.text}>
            {failed
              ? "Looks like the confirmation link either is invalid or has expired."
              : "We have sent a confirmation link to your email address. Please confirm your email by clicking on the link."}
          </p>
          <div className={cls.footer}>
            {!failed && <p className={cls.hint}>Haven’t you received the confirmation email?</p>}
            <button className={btn.btn} type="button" disabled={left > 0 || !email} onClick={resend}>
              {left > 0 ? `Resend email (${left})` : "Resend email"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
