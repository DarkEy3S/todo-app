import cls from "./Todos.module.css";
import { IconNoProjects, IconSearch, IconSort, IconEdit, IconDelete } from "../../components/icons";
import btn from "../../assets/buttons.module.css";
import { useState, useEffect } from "react";

interface ITodo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type Filter = "all" | "active" | "completed";
type SortBy = "alphabetical" | "date";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<Filter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [isSortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [todoCreateValue, setTodoCreateValue] = useState("");

  const visibleTodos = todos
    .filter((todo) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "active") return !todo.completed;
      return todo.completed;
    })
    .filter((todo) => todo.text.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    .sort((a, b) => {
      const result = sortBy === "alphabetical" ? a.text.localeCompare(b.text) : a.createdAt.getTime() - b.createdAt.getTime();
      return sortDir === "asc" ? result : -result;
    });

  const getEmptyMessage = () => {
    if (todos.length === 0) return "No todos yet";
    if (searchQuery.trim()) return "No matching todos";
    if (filterStatus === "active") return "No active todos";
    if (filterStatus === "completed") return "No completed todos";
    return "Nothing to show";
  };

  const saveEdit = () => {
    if (!editingId) return;
    const text = editDraft.trim();
    if (text) setTodos((prev) => prev.map((item) => (item.id === editingId ? { ...item, text } : item)));
    setEditingId(null);
  };

  const addTodo = () => {
    const text = todoCreateValue.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text, completed: false, createdAt: new Date() }]);
    setTodoCreateValue("");
  };

  const renderSort = () => (
    <div className={cls.todosListSort} onClick={(e) => e.stopPropagation()}>
      <button
        className={`${cls.todosListSortArrow} ${sortDir === "desc" ? cls.todosListSortArrowDesc : ""}`}
        type="button"
        onClick={() => {
          setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        }}
      >
        <IconSort />
      </button>
      <button className={cls.todosListSortText} type="button" onClick={() => setSortOpen((v) => !v)}>
        Sort by
      </button>
      {isSortOpen && (
        <div className={cls.todosListSortMenu}>
          <button
            type={"button"}
            onClick={() => {
              setSortBy("alphabetical");

              setSortOpen((v) => !v);
            }}
          >
            {sortBy === "alphabetical" && <span className={cls.todosListSortCheck}>✓</span>}
            Alphabetical
          </button>
          <button
            type={"button"}
            onClick={() => {
              setSortBy("date");

              setSortOpen((v) => !v);
            }}
          >
            {sortBy === "date" && <span className={cls.todosListSortCheck}>✓</span>}
            Date
          </button>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    if (!isSortOpen) return;
    const close = () => setSortOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [isSortOpen]);

  return (
    <section className={cls.todos}>
      <div className="container">
        <div className={cls.todosContent}>
          <div className={cls.todosTop}>
            <div className={cls.todosSearch}>
              <IconSearch className={cls.todoSearchIcon} />
              <input
                className={cls.todosSearchInput}
                type={"search"}
                placeholder="Search some todo..."
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
          </div>
          <div className={cls.todosBottom}>
            <div className={cls.todosTitleWrapper}>
              <h1 className={cls.todosTitle}>Todos</h1>
              <div className={cls.todosListSortDesktopHidden}>{renderSort()}</div>
            </div>
            <div className={cls.todosAdd}>
              <textarea
                className={cls.todosAddInput}
                value={todoCreateValue}
                placeholder="Add a todo"
                rows={1}
                onChange={(e) => setTodoCreateValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    addTodo();
                  }
                }}
              />
              <button
                disabled={!todoCreateValue.trim()}
                className={`${cls.todosAddButton} ${btn.btn}`}
                type="button"
                onClick={addTodo}
              >
                Add
              </button>
            </div>
            <div className={cls.todosList}>
              <div className={cls.todosListTop}>
                <div className={cls.todosListStatus}>
                  <button
                    className={`${cls.todosListStatusButton} ${filterStatus === "all" && cls.todosListStatusButtonActive}`}
                    type={"button"}
                    onClick={() => {
                      setFilterStatus("all");
                    }}
                  >
                    All
                  </button>
                  <button
                    className={`${cls.todosListStatusButton} ${filterStatus === "active" && cls.todosListStatusButtonActive}`}
                    type={"button"}
                    onClick={() => {
                      setFilterStatus("active");
                    }}
                  >
                    Active
                  </button>
                  <button
                    className={`${cls.todosListStatusButton} ${filterStatus === "completed" && cls.todosListStatusButtonActive}`}
                    type={"button"}
                    onClick={() => {
                      setFilterStatus("completed");
                    }}
                  >
                    Completed
                  </button>
                </div>
                <div className={cls.todosListSortMobileHidden}>{renderSort()}</div>
              </div>
              <div className={cls.todosListBottom}>
                {visibleTodos.length <= 0 ? (
                  <div className={cls.todosNoProjects}>
                    <IconNoProjects />
                    <span>{getEmptyMessage()}</span>
                  </div>
                ) : (
                  <div className={cls.todosItems}>
                    {visibleTodos.map((todo) => (
                      <div
                        key={todo.id}
                        className={`${cls.todosItem} ${deletingId === todo.id ? cls.todosItemDeleting : ""}`}
                        onAnimationEnd={(e) => {
                          if (e.target !== e.currentTarget || deletingId !== todo.id) return;
                          setTodos((prev) => prev.filter((item) => item.id !== todo.id));
                          setDeletingId(null);
                        }}
                      >
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
                          {editingId === todo.id ? (
                            <div
                              className={cls.todosItemEditRow}
                              onBlur={(e) => {
                                if (!e.currentTarget.contains(e.relatedTarget)) saveEdit();
                              }}
                            >
                              <textarea
                                className={cls.todosItemEditInput}
                                value={editDraft}
                                autoFocus
                                rows={1}
                                onChange={(e) => setEditDraft(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Escape") setEditingId(null);
                                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                    e.preventDefault();
                                    saveEdit();
                                  }
                                }}
                              />
                              <button
                                className={`${btn.btn} ${cls.btnEditSave}`}
                                type="button"
                                disabled={!editDraft.trim()}
                                onClick={saveEdit}
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className={`${cls.todosItemContentText} ${todo.completed && cls.todosItemContentTextCompleted}`}>
                              <span>{todo.text}</span>
                            </div>
                          )}
                          <span className={cls.todosItemContentDate}>
                            {todo.createdAt.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              weekday: "long",
                            })}
                          </span>
                        </div>
                        {editingId !== todo.id && (
                          <div className={cls.todosItemButtons}>
                            <button
                              type="button"
                              className={cls.todosItemEdit}
                              onClick={() => {
                                setEditingId(todo.id);
                                setEditDraft(todo.text);
                              }}
                            >
                              <IconEdit />
                            </button>
                            <button
                              type="button"
                              className={cls.todosItemDelete}
                              onClick={() => {
                                if (deletingId) return;
                                setDeletingId(todo.id);
                              }}
                            >
                              <IconDelete />
                            </button>
                          </div>
                        )}
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
