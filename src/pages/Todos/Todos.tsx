import { useState, useEffect  } from "react";
import { Navigate } from "react-router-dom";
import { IconNoProjects, IconSearch } from "../../components/icons";
import btn from "../../assets/buttons.module.css";
import { TodoItem } from "./TodoItem";
import { TodoSort } from "./TodoSort";
import type { Filter, ITodo, SortBy, SortDir } from "./types";
import cls from "./Todos.module.css";
import { supabase } from "../../lib/supabase";
import { useAuthReady, useSession } from "../../hooks/useAuth";
import { AuthErrorBanner } from "../../components/AuthErrorBanner";

export const Todos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<Filter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [todoCreateValue, setTodoCreateValue] = useState("");
  const [error, setError] = useState<string | null>(null);


  const session = useSession();
  const ready = useAuthReady();

  useEffect(() => {
    if (!session) {
      setTodos([]);
      setError(null);
      return;
    }
    supabase.from("todos").select("*").then(({ data, error }) => {
      if (error) {
        setError(error.message);
        return;
      }
      setError(null);
      setTodos((data ?? []).map((row) => ({
        id: row.id,
        text: row.text,
        completed: row.completed,
        createdAt: new Date(row.created_at),
      })));
    });
  }, [session]);

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
    if (!text) {
      setEditingId(null);
      return;
    }
    supabase.from("todos").update({ text }).eq("id", editingId).select().single().then(({ data, error }) => {
      if (error) {
        setError(error.message);
        return;
      }
      setError(null);
      setTodos((prev) => prev.map((item) => (item.id === editingId ? { ...item, text: data.text } : item)));
      setEditingId(null);
    });
  };

  const addTodo = () => {
    const text = todoCreateValue.trim();
    if (!text) return;
    supabase.from("todos").insert({ text }).select().single().then(({ data, error }) => {
      if (error) {
        setError(error.message);
        return;
      }
      setError(null);
      setTodos((prev) => [...prev, { id: data.id, text: data.text, completed: data.completed, createdAt: new Date(data.created_at) }]);
      setTodoCreateValue("");
    });
  };

  const renderSort = () => (
    <TodoSort
      sortBy={sortBy}
      sortDir={sortDir}
      onSortBy={setSortBy}
      onToggleDir={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
    />
  );

  if (!ready) return null;
  if (!session) return <Navigate to="/signin" replace />;

  return (
    <section className={cls.todos}>
      <div className="container">
        {error && <AuthErrorBanner message={error} onClose={() => setError(null)}  />}
        <div className={cls.todosContent}>
          <div className={cls.todosTop}>
            <div className={cls.todosSearch}>
              <IconSearch className={cls.todoSearchIcon} />
              <input
                className={cls.todosSearchInput}
                type="search"
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
                  {(["all", "active", "completed"] as Filter[]).map((status) => (
                    <button
                      key={status}
                      className={`${cls.todosListStatusButton} ${filterStatus === status && cls.todosListStatusButtonActive}`}
                      type="button"
                      onClick={() => setFilterStatus(status)}
                    >
                      {status[0].toUpperCase() + status.slice(1)}
                    </button>
                  ))}
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
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        editing={editingId === todo.id}
                        deleting={deletingId === todo.id}
                        draft={editDraft}
                        setDraft={setEditDraft}
                        onEdit={() => {
                          setEditingId(todo.id);
                          setEditDraft(todo.text);
                        }}
                        onSave={saveEdit}
                        onCancel={() => setEditingId(null)}
                        onToggle={(checked) => {
                          supabase.from("todos").update({ completed: checked }).eq("id", todo.id).select().single().then(({ data, error }) => {
                            if (error) {
                              setError(error.message);
                              return;
                            }
                            setError(null);
                            setTodos((prev) => prev.map((item) => (item.id === todo.id ? { ...item, completed: data.completed } : item)));
                          });
                        }}
                        onDelete={() => {
                          if (deletingId) return;
                          supabase.from("todos").delete().eq("id", todo.id).then(({ error }) => {
                            if (error) {
                              setError(error.message);
                              return;
                            }
                            setError(null);
                            setDeletingId(todo.id);
                          });
                        }}
                        onDeleteDone={() => {
                          setTodos((prev) => prev.filter((item) => item.id !== todo.id));
                          setDeletingId(null);
                        }}
                      />
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
