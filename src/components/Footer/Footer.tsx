import cls from "./Footer.module.css";
import { ContactInfoMail, ContactInfoSociety } from "../ContactInfo";

export const Footer = () => {
  return (
    <footer className={cls.footer}>
      <div className={cls.footerTop}>
        <ContactInfoSociety className={cls.footerSociety} />
      </div>
      <div className={cls.footerBottom}>
        <ContactInfoMail mail={"sevak.martirosyan1@gmail.com"} className={cls.mail} />
        <p>
          Made with <span>❤️</span> uSign MaToDo platform!
        </p>
      </div>
    </footer>
  );
};
