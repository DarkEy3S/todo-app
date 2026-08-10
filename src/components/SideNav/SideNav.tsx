import cls from "./SideNav.module.css";
import { HomeIcon, SignOutIcon, TodosIcon } from "../icons.tsx";
import { Link } from "react-router-dom";
import { Profile } from "../Profile";
import { forwardRef } from "react";
interface IProp {
  className: string;
}

export const SideNav = forwardRef<HTMLDivElement, IProp>(({ className }, ref) => {
  return (
    <aside ref={ref} className={`${cls.sideNav} ${className}`}>
      <div className={cls.sideWrapper}>
        <div className={cls.sideNavTop}>
          <Profile />
        </div>
        <div className={cls.sideNavBottom}>
          <ul>
            <li>
              <Link to={"/"}>
                <HomeIcon /> Home
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <TodosIcon /> Todos
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <SignOutIcon /> Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
});
