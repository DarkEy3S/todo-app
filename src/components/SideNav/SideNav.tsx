import cls from "./SideNav.module.css";
import { HomeIcon, SingOutIcon, TodosIcon } from "../icons.tsx";
import { Link } from "react-router-dom";
import { Profile } from "../Profile";

export const SideNav = ({ className }: { className: string }) => {
  return (
    <aside className={`${cls.sideNav} ${className}`}>
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
                <SingOutIcon /> Sing out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
