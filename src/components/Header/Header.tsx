import logoSvg from "/public/logo.svg";
import { Link } from "react-router-dom";
import cls from "./Header.module.css";
import { SignInIcon, SignUpIcon } from "../icons.tsx";
import type { RefObject } from "react";

interface HeaderProps {
  burgerFunction?: () => void;
  burgerActive: boolean;
  burgerBtnRef: RefObject<HTMLDivElement | null>;
}

export const Header = ({ burgerFunction, burgerActive, burgerBtnRef }: HeaderProps) => {
  const burgerHandler = (): void => {
    if (burgerFunction) {
      burgerFunction();
    }
  };

  return (
    <header className={cls.header}>
      <div className={cls.headerTop}>
        <div ref={burgerBtnRef} className={`${cls.headerBurger} ${burgerActive ? cls.active : ""}`} onClick={burgerHandler}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link to={"/"} className={cls.headerLogo}>
          <img src={logoSvg} alt="logo" />
          <span>MaToDo</span>
        </Link>
        <Link to={"/privacy"} className={cls.headerPrivacy}>
          Privacy
        </Link>
        <div className={cls.headerAccounts}>
          <Link to={"/signup"}>
            <SignUpIcon />
            <span>Sign up</span>
          </Link>
          <p>
            <Link to={"/signin"}>
              <SignInIcon />
              <span>Sign in</span>
            </Link>
          </p>
        </div>
      </div>
      <div className={cls.headerBottom}>
        <p className={cls.headerText}>Our Site may use “cookies” to enhance User experience.</p>
        <Link to={"/privacy"} className={cls.headerPrivacy}>
          Privacy
        </Link>
      </div>
    </header>
  );
};
