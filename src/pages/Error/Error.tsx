import cls from "./Error.module.css";

export const Error = () => (
  <section className={cls.error}>
    <h1 className={cls.title}>404</h1>
    <p className={cls.text}>Ooops, Something went wrong.</p>
  </section>
);
