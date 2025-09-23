import { Suspense, useState } from "react";
import cls from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { SideNav } from "../SideNav";
export const MainLayout = () => {
  const [burgerActive, setBurgerActive] = useState(false);

  const burgerFunction = (): void => {
    return setBurgerActive(!burgerActive);
  };

  return (
    <>
      <div className={cls.mainLayout}>
        <Header burgerFunction={burgerFunction} burgerActive={burgerActive} />
        <div className={cls.mainRow}>
          <SideNav className={burgerActive ? cls.active : ""} />
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
    </>
  );
};
