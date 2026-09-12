import { useEffect, useState } from "react";
import { IconSort } from "../../../components/icons";
import type { SortBy, SortDir } from "../types";
import cls from "./TodoSort.module.css";

interface TodoSortProps {
  sortBy: SortBy;
  sortDir: SortDir;
  onSortBy: (value: SortBy) => void;
  onToggleDir: () => void;
}

export const TodoSort = ({ sortBy, sortDir, onSortBy, onToggleDir }: TodoSortProps) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [isOpen]);

  return (
    <div className={cls.sort} onClick={(e) => e.stopPropagation()}>
      <button className={`${cls.arrow} ${sortDir === "desc" ? cls.arrowDesc : ""}`} type="button" onClick={onToggleDir}>
        <IconSort />
      </button>
      <button className={cls.text} type="button" onClick={() => setOpen((v) => !v)}>
        Sort by
      </button>
      {isOpen && (
        <div className={cls.menu}>
          <button
            type="button"
            onClick={() => {
              onSortBy("alphabetical");
              setOpen(false);
            }}
          >
            {sortBy === "alphabetical" && <span className={cls.check}>✓</span>}
            Alphabetical
          </button>
          <button
            type="button"
            onClick={() => {
              onSortBy("date");
              setOpen(false);
            }}
          >
            {sortBy === "date" && <span className={cls.check}>✓</span>}
            Date
          </button>
        </div>
      )}
    </div>
  );
};
