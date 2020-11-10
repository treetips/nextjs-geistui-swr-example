import { TodoEntity } from "../entity";

export type SelectTodoResponse = {
  todo: TodoEntity;
};

export type SelectTodosResponse = {
  todos: TodoEntity[];
};

export type CountTodosResponse = {
  count: number;
};

export type InsertTodoResponse = {
  todo: TodoEntity;
};

export type UpdateTodoResponse = {
  todo: TodoEntity;
};

export type DeleteTodoResponse = {
  numberOfdeleted: number;
};
