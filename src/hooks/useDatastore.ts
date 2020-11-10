import { EditTodoType, RegisterTodoType, TodoEntity, TodoId } from "../entity";
import {
  CountTodosResponse,
  DeleteTodoResponse,
  InsertTodoResponse,
  SelectTodoResponse,
  SelectTodosResponse,
  UpdateTodoResponse,
} from "../models";
import { usePaging } from "./usePaging";

// In memory database pseudo
const datastore = new Map<number, TodoEntity>();
const DATA_NUMBER = 16;
const RANDUM_FROM = 1;
const RANDUM_TO = 60;
for (let i = 1; i <= DATA_NUMBER; i++) {
  const now = new Date();
  const randamNumber = Math.floor(
    Math.random() * (RANDUM_TO - RANDUM_FROM) + RANDUM_FROM
  );
  datastore.set(i, {
    id: i,
    title: `title ${i}`,
    deadline: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + randamNumber
    ),
    complete: i % 2 === 0,
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Custom Hooks for Datastore
 * @author treetips
 */
export const useDatastore = () => {
  const { pageLimit } = usePaging();

  /**
   * select * from todo where id = :id
   * @param id todo id
   */
  const selectTodo = async (id: TodoId): Promise<SelectTodoResponse> => {
    return new Promise<SelectTodoResponse>((resolve) => {
      const todo = datastore.get(id);
      resolve({ todo });
    });
  };

  /**
   * select * from todo offset n limit n
   */
  const selectTodos = async (props?: {
    page?: number;
    limit?: number;
  }): Promise<SelectTodosResponse> => {
    const { limit, page = 1 } = props;

    const optimizedLimit = (() => {
      const MAX_LIMIT = pageLimit;
      // not set
      if (!limit) {
        return Number.MAX_VALUE;
      }
      // valid value
      if (1 <= limit && limit <= MAX_LIMIT) {
        return limit;
      }
      // invalid value
      return MAX_LIMIT;
    })();

    const optimizedPage = (() => {
      const DEFAULT_PAGE = 1;
      // not set
      if (!page) {
        return DEFAULT_PAGE;
      }
      // valid value
      if (DEFAULT_PAGE <= page) {
        return page;
      }
      // invalid value
      return DEFAULT_PAGE;
    })();

    return new Promise<SelectTodosResponse>((resolve) => {
      // raw
      const todos = Array.from(datastore.values()).map(
        (todoEntity: TodoEntity) => todoEntity
      );
      // sort
      const sortedTodos = todos.sort(
        (todoEntity1: TodoEntity, todoEntity2: TodoEntity) => {
          if (todoEntity1.updatedAt > todoEntity2.updatedAt) {
            return -1; // 1=asc, -1=desc
          }
          if (todoEntity1.id > todoEntity2.id) {
            return -1; // 1=asc, -1=desc
          }
          return 0;
        }
      );
      // paging
      const pagenateTodos = sortedTodos.slice(
        optimizedPage === 1 ? 0 : (optimizedPage - 1) * optimizedLimit,
        optimizedPage === 1 ? optimizedLimit : optimizedPage * optimizedLimit
      );
      resolve({ todos: pagenateTodos });
    });
  };

  /**
   * select count(*) from todo
   */
  const countTodos = async (): Promise<CountTodosResponse> => {
    return new Promise<CountTodosResponse>((resolve) => {
      resolve({ count: datastore.size });
    });
  };

  /**
   * insert into todo values(n)
   * @param entity RegisterTodoType
   */
  const insertTodo = async (
    entity: RegisterTodoType
  ): Promise<InsertTodoResponse> => {
    const maxTodoId = Array.from(datastore.keys()).reduce((a, b) =>
      Math.max(a, b)
    );
    const nextTodoId = maxTodoId + 1;
    const now = new Date();
    const insertEntity = {
      ...entity,
      id: nextTodoId,
      complete: false,
      createdAt: now,
      updatedAt: now,
    } as const;
    return new Promise<InsertTodoResponse>((resolve) => {
      datastore.set(nextTodoId, insertEntity);
      resolve({ todo: insertEntity });
    });
  };

  /**
   * update todo set n = n where id = :id
   * @param entity EditTodoType
   */
  const updateTodo = async (
    entity: EditTodoType
  ): Promise<UpdateTodoResponse> => {
    const { todo } = await selectTodo(entity.id);
    const updateEntity = {
      ...todo,
      ...entity,
      updatedAt: new Date(),
    } as const;
    return new Promise<UpdateTodoResponse>((resolve) => {
      datastore.set(entity.id, updateEntity);
      resolve({ todo: updateEntity });
    });
  };

  /**
   * delete todo where id = :id
   * @param id todo id
   */
  const deleteTodo = async (id: TodoId): Promise<DeleteTodoResponse> => {
    return new Promise<DeleteTodoResponse>((resolve) => {
      datastore.delete(id);
      resolve({ numberOfdeleted: 1 });
    });
  };

  return {
    selectTodo,
    selectTodos,
    countTodos,
    insertTodo,
    updateTodo,
    deleteTodo,
  } as const;
};
