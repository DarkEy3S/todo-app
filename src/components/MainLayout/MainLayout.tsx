import { Suspense } from "react";
import cls from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
export const MainLayout = () => {
  return (
    <>
      <div className={cls.mainLayout}>
        <Header />
        <div className={cls.mainWrapper}>
          <main className={cls.main}>
            <Suspense>
              <Outlet />
            </Suspense>
          </main>
          <footer className={cls.footer}></footer>
        </div>
      </div>
    </>
  );
};
