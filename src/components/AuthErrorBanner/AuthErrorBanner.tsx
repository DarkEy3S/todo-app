import cls from "./AuthErrorBanner.module.css";
import { StringIconClear, StringIconInfo } from "../icons";

interface AuthErrorBannerProps {
  message: string;
  onClose: () => void;
}

export const AuthErrorBanner = ({ message, onClose }: AuthErrorBannerProps) => {
  return (
    <div className={cls.banner}>
      <div className={cls.iconInfo}>
        <StringIconInfo />
      </div>
      <div className={cls.message}>
        <span>{message}</span>
      </div>
      <div className={cls.iconClear}>
        <button type="button" onClick={onClose}>
          <StringIconClear />
        </button>
      </div>
    </div>
  );
};
