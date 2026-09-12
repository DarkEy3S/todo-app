import { IconDelete, IconEdit } from "../../../components/icons";
import btn from "../../../assets/buttons.module.css";
import type { ITodo } from "../types";
import cls from "./TodoItem.module.css";

interface TodoItemProps {
  todo: ITodo;
  editing: boolean;
  deleting: boolean;
  draft: string;
  setDraft: (value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onToggle: (checked: boolean) => void;
  onDelete: () => void;
  onDeleteDone: () => void;
}

export const TodoItem = ({
  todo,
  editing,
  deleting,
  draft,
  setDraft,
  onEdit,
  onSave,
  onCancel,
  onToggle,
  onDelete,
  onDeleteDone,
}: TodoItemProps) => (
  <div
    className={`${cls.item} ${deleting ? cls.deleting : ""}`}
    onAnimationEnd={(e) => {
      if (e.target !== e.currentTarget || !deleting) return;
      onDeleteDone();
    }}
  >
    <div className={cls.checkbox}>
      <input checked={todo.completed} type="checkbox" onChange={(e) => onToggle(e.target.checked)} />
    </div>
    <div className={cls.content}>
      {editing ? (
        <div className={cls.editRow} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && onSave()}>
          <textarea
            className={cls.editInput}
            value={draft}
            autoFocus
            rows={1}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onCancel();
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                onSave();
              }
            }}
          />
          <button className={`${btn.btn} ${cls.save}`} type="button" disabled={!draft.trim()} onClick={onSave}>
            Save
          </button>
        </div>
      ) : (
        <div className={`${cls.text} ${todo.completed ? cls.completed : ""}`}>
          <span>{todo.text}</span>
        </div>
      )}
      <span className={cls.date}>
        {todo.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        })}
      </span>
    </div>
    {!editing && (
      <div className={cls.buttons}>
        <button type="button" onClick={onEdit}>
          <IconEdit />
        </button>
        <button type="button" onClick={onDelete}>
          <IconDelete />
        </button>
      </div>
    )}
  </div>
);
