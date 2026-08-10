import { Suspense, useState, useRef, useEffect } from "react";
import cls from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { SideNav } from "../SideNav";
import { useScrollLock } from "../../hooks/useScrollLock";

export const MainLayout = () => {
  const [burgerActive, setBurgerActive] = useState(false);
  const sideNavRef = useRef<HTMLDivElement | null>(null);
  const burgerBtnRef = useRef<HTMLDivElement | null>(null);
  useScrollLock(burgerActive);

  useEffect(() => {
    if (!burgerActive) return; // если меню закрыто, слушатель не нужен

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        sideNavRef.current &&
        !sideNavRef.current.contains(target) &&
        burgerBtnRef.current &&
        !burgerBtnRef.current.contains(target)
      ) {
        setBurgerActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [burgerActive]);

  const burgerFunction = (): void => {
    setBurgerActive((prev) => !prev);
  };

  return (
    <div className={cls.mainLayout}>
      <Header burgerFunction={burgerFunction} burgerActive={burgerActive} burgerBtnRef={burgerBtnRef} />{" "}
      <div className={cls.mainRow}>
        <SideNav ref={sideNavRef} className={burgerActive ? cls.active : ""} />
        <div className={cls.mainWrapper}>
          <main className={cls.main}>
            <Suspense>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
