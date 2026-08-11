import cls from "./SignOut.module.css";

interface IProp {
  onClose: () => void;
  handleSignOut: () => void;
}

export const SignOut = ({ onClose, handleSignOut }: IProp) => {
  return (
    <div className={cls.signOutContent}>
      <h3 className={cls.signOutTitle}>Are you sure you want to sign out?</h3>
      <div className={cls.signOutButtons}>
        <button className={cls.blueButton} type="button" onClick={handleSignOut}>
          Sign out
        </button>

        <button className={cls.whiteButton} type={"button"} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};
