import { Suspense } from "react";
import cls from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
export const MainLayout = () => {
  return (
    <>
      <div className={cls.mainLayout}>
        <Header />
        <main className={cls.main}>
          <Suspense>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};
