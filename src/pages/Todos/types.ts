export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type Filter = "all" | "active" | "completed";
export type SortBy = "alphabetical" | "date";
export type SortDir = "asc" | "desc";
