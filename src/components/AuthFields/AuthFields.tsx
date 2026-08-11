import cls from "./AuthFields.module.css";
import { PasswordIconEyeClose, PasswordIconEyeOpen } from "../icons";
import type { ChangeEvent } from "react";

interface AuthFieldsProps {
  emailId: string;
  passwordId: string;
  emailValue: string;
  passwordValue: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  isEmailError: boolean;
  isPasswordError: boolean;
  passwordVisible: boolean;
  onTogglePassword: () => void;
}

export const AuthFields = ({
  emailId,
  passwordId,
  emailValue,
  passwordValue,
  onEmailChange,
  onPasswordChange,
  onEmailBlur,
  onPasswordBlur,
  isEmailError,
  isPasswordError,
  passwordVisible,
  onTogglePassword,
}: AuthFieldsProps) => {
  return (
    <>
      <label className={cls.label} htmlFor={emailId}>
        <span className={cls.labelTitle}>Email</span>
        <div className={cls.wrapper}>
          <input
            className={`${cls.input} ${isEmailError ? cls.inputError : ""}`}
            value={emailValue}
            onChange={onEmailChange}
            id={emailId}
            placeholder="Email"
            type="email"
            onBlur={onEmailBlur}
            required
          />
        </div>
        {isEmailError && <span className={cls.fieldMessage}>Invalid email format.</span>}
      </label>

      <label className={cls.label} htmlFor={passwordId}>
        <span className={cls.labelTitle}>Password</span>
        <div className={cls.wrapper}>
          <input
            className={`${cls.input} ${isPasswordError ? cls.inputError : ""}`}
            value={passwordValue}
            onChange={onPasswordChange}
            minLength={4}
            placeholder="Password"
            type={passwordVisible ? "text" : "password"}
            id={passwordId}
            onBlur={onPasswordBlur}
          />
          <button className={cls.eyeButton} type="button" onClick={onTogglePassword}>
            {passwordVisible ? <PasswordIconEyeClose /> : <PasswordIconEyeOpen />}
          </button>
        </div>
        {isPasswordError && <span className={cls.fieldMessage}>4 characters minimum.</span>}
      </label>
    </>
  );
};
