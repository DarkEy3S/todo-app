import { useId, useState } from "react";

export const useAuthForm = () => {
  const emailId: string = useId();
  const passwordId: string = useId();

  const [emailValidity, setEmailValidity] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordVisible, isPasswordVisible] = useState(false);
  const [textError, setTextError] = useState<string | null>(null);

  const isEmailValid = !emailValidity;
  const isPasswordValid = passwordValue.trim().length < 4;

  const isFieldsDisabled = isEmailValid || isPasswordValid;
  const isEmailError = isEmailValid && emailTouched;
  const isPasswordError = isPasswordValid && passwordTouched;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replaceAll(" ", "");
    e.target.value = cleaned;
    setEmailValue(cleaned);
    setEmailValidity(e.target.checkValidity());
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replaceAll(" ", "");
    e.target.value = cleaned;
    setPasswordValue(cleaned);
  };

  const handleEmailBlur = () => setEmailTouched(true);
  const handlePasswordBlur = () => setPasswordTouched(true);

  const togglePasswordVisible = () => isPasswordVisible((v) => !v);
  const clearError = () => setTextError(null);

  return {
    emailId,
    passwordId,
    emailValue,
    passwordValue,
    isEmailError,
    isPasswordError,
    passwordVisible,
    textError,
    setTextError,
    isFieldsDisabled,
    handleEmailChange,
    handlePasswordChange,
    handleEmailBlur,
    handlePasswordBlur,
    togglePasswordVisible,
    clearError,
  };
};
