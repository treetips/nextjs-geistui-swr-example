export type TodoId = number;

export type TodoEntity = {
  id: TodoId;
  title: string;
  deadline: Date;
  complete: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type FetchTodoType = TodoEntity;

export type RegisterTodoType = Omit<
  TodoEntity,
  "id" | "complete" | "createdAt" | "updatedAt"
>;
export type EditTodoType = Omit<TodoEntity, "updatedAt">;
