import cls from "./Home.module.css";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <section className={cls.home}>
      <h1 className={cls.homeTitle}>MaToDo Project</h1>
      <p className={cls.homeSubtitle}>Create, track, and complete your tasks in one simple app.</p>
      <Link to={"https://github.com/DarkEy3S/todo-app/tree/dev"} className={cls.homeBtn} target={"_blank"}>
        GitHub Repo
      </Link>
    </section>
  );
};
