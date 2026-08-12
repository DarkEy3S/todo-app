import cls from "./Todos.module.css";
import { IconNoProjects, IconSearch, IconSort, IconEdit, IconDelete } from "../../components/icons";
import btn from "../../assets/buttons.module.css";
import { useState } from "react";

interface ITodo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const Todos = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: crypto.randomUUID(),
      text: "Project name",
      completed: false,
      createdAt: new Date("2022-01-03"),
    },
    {
      id: crypto.randomUUID(),
      text: "Project name",
      completed: false,
      createdAt: new Date("2022-01-03"),
    },
    {
      id: crypto.randomUUID(),
      text: "Project name",
      completed: false,
      createdAt: new Date("2022-01-03"),
    },
  ]);

  const [todoCreateValue, setTodoCreateValue] = useState("");

  return (
    <section className={cls.todos}>
      <div className="container">
        <div className={cls.todosContent}>
          <div className={cls.todosTop}>
            <div className={cls.todosSearch}>
              <IconSearch className={cls.todoSearchIcon} />
              <input className={cls.todosSearchInput} type={"search"} placeholder="Search some todo..." />
            </div>
          </div>
          <div className={cls.todosBottom}>
            <div className={cls.todosTitleWrapper}>
              <h1 className={cls.todosTitle}>Todos</h1>
              <div className={`${cls.todosListSort} ${cls.todosListSortDesktopHidden}`}>
                <button className={cls.todosListSortArrow} type={"button"}>
                  <IconSort />
                </button>
                <button className={cls.todosListSortText} type={"button"}>
                  Sort by
                </button>
              </div>
            </div>
            <div className={cls.todosAdd}>
              <input
                className={cls.todosAddInput}
                value={todoCreateValue}
                type="text"
                placeholder={"Add a todo"}
                onChange={(e) => setTodoCreateValue(e.target.value)}
              />
              <button
                disabled={todoCreateValue.trim() === ""}
                className={`${cls.todosAddButton} ${btn.btn}`}
                type={"button"}
                onClick={() => {
                  setTodos((prev) => [
                    ...prev,
                    {
                      id: crypto.randomUUID(),
                      text: todoCreateValue,
                      completed: false,
                      createdAt: new Date(),
                    },
                  ]);
                  setTodoCreateValue("");
                }}
              >
                Add
              </button>
            </div>
            <div className={cls.todosList}>
              <div className={cls.todosListTop}>
                <div className={cls.todosListStatus}>
                  <button className={`${cls.todosListStatusButton} ${cls.todosListStatusButtonActive}`} type={"button"}>
                    All
                  </button>
                  <button className={cls.todosListStatusButton} type={"button"}>
                    Active
                  </button>
                  <button className={cls.todosListStatusButton} type={"button"}>
                    Completed
                  </button>
                </div>
                <div className={`${cls.todosListSort} ${cls.todosListSortMobileHidden}`}>
                  <button className={cls.todosListSortArrow} type={"button"}>
                    <IconSort />
                  </button>
                  <button className={cls.todosListSortText} type={"button"}>
                    Sort by
                  </button>
                </div>
              </div>
              <div className={cls.todosListBottom}>
                {todos.length <= 0 ? (
                  <div className={cls.todosNoProjects}>
                    <IconNoProjects />
                    <span>No todos yet</span>
                  </div>
                ) : (
                  <div className={cls.todosItems}>
                    {todos.map((todo) => (
                      <div key={todo.id} className={cls.todosItem}>
                        <div className={cls.todosItemCheckbox}>
                          <input
                            checked={todo.completed}
                            type="checkbox"
                            name=""
                            id=""
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setTodos((prev) =>
                                prev.map((item) => (item.id === todo.id ? { ...item, completed: checked } : item)),
                              );
                            }}
                          />
                        </div>
                        <div className={cls.todosItemContent}>
                          <p className={cls.todosItemContentText}>{todo.text}</p>
                          <span className={cls.todosItemContentDate}>
                            {todo.createdAt.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              weekday: "long",
                            })}
                          </span>
                        </div>
                        <div className={cls.todosItemButtons}>
                          <button type="button" className={cls.todosItemEdit}>
                            <IconEdit />
                          </button>
                          <button
                            type="button"
                            className="cls.todosItemDelet"
                            onClick={() => {
                              setTodos((prev) => prev.filter((item) => item.id != todo.id));
                            }}
                          >
                            <IconDelete />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
