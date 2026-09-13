import { Link } from "react-router-dom";
import { ContactInfoMail } from "../ContactInfo";
import { EdutIcon } from "../icons.tsx";
import { initials, useSession } from "../../hooks/useAuth";
import cls from "./Profile.module.css";

export const Profile = () => {
  const session = useSession();
  const user = session?.user;
  const email = user?.email ?? "Not signed in";
  const avatar = user?.user_metadata?.avatar_url as string | undefined;

  return (
    <div className={cls.profile}>
      {avatar ? (
        <img className={cls.profileAvatar} src={avatar} alt="" />
      ) : (
        <div className={cls.profileAvatar}>{initials(user)}</div>
      )}
      {session ? (
        <ContactInfoMail mail={email} className={cls.profileEmail} />
      ) : (
        <span className={cls.profileEmail}>{email}</span>
      )}
      {session && (
        <Link to="/profile" className={cls.profileEdit}>
          <EdutIcon /> Edit profile
        </Link>
      )}
    </div>
  );
};
