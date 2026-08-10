import { ContactInfoMail } from "../ContactInfo";
import { EdutIcon } from "../icons.tsx";
import cls from "./Profile.module.css";
export const Profile = () => {
  return (
    <div className={cls.profile}>
      <div className={cls.profileAvatar}>NA</div>
      <ContactInfoMail mail={"name@BitPlatform.dev"} className={cls.profileEmail} />
      <div className={cls.profileEdit}>
        <EdutIcon /> Edit profile
      </div>
    </div>
  );
};
