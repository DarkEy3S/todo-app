import cls from "./SideNav.module.css";
import { HomeIcon, SignOutIcon, TodosIcon } from "../icons";
import { Link } from "react-router-dom";
import { Profile } from "../Profile";
import { forwardRef } from "react";
import { Modal } from "../Modal";
import { SignOut } from "../SignOut";
import { useDisclosure } from "../../hooks/useDisclosure";

interface IProp {
  className: string;
}

export const SideNav = forwardRef<HTMLDivElement, IProp>(({ className }, ref) => {
  const { isOpen, open, close } = useDisclosure();

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
              <Link to={"/todos"}>
                <TodosIcon /> Todos
              </Link>
            </li>
            <li>
              <button type={"button"} onClick={open}>
                <SignOutIcon /> Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        title={"Sign out"}
        children={
          <SignOut
            onClose={close}
            handleSignOut={() => {
              console.log("Sing out success");
              close();
            }}
          />
        }
        onClose={close}
      />
    </aside>
  );
});
