import logoSvg from "/public/logo.svg";
import { Link } from "react-router-dom";
import cls from "./Header.module.css";
import { SingInIcon, SingUpIcon } from "../icons.tsx";

interface HeaderProps {
  burgerFunction?: () => void;
  burgerActive: boolean;
}

export const Header = ({ burgerFunction, burgerActive }: HeaderProps) => {
  return (
    <header className={cls.header}>
      <div className={cls.headerTop}>
        <div className={`${cls.headerBurger} ${burgerActive ? cls.active : ""}`} onClick={burgerFunction}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link to={"/"} className={cls.headerLogo}>
          <img src={logoSvg} alt="logo" />
          <span>MaToDo</span>
        </Link>
        <Link to={"#"} className={cls.headerPrivacy}>
          Privacy
        </Link>
        <div className={cls.headerAccounts}>
          <p>
            <SingUpIcon />
            <span>Sing up</span>
          </p>
          <p>
            <SingInIcon />
            <span>Sing in</span>
          </p>
        </div>
      </div>
      <div className={cls.headerBottom}>
        <p className={cls.headerText}>Our Site may use “cookies” to enhance User experience.</p>
        <Link to={"#"} className={cls.headerPrivacy}>
          Privacy
        </Link>
      </div>
    </header>
  );
};
