import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useSWR, { cache } from "swr";
import { TodoEntity, TodoId } from "../entity";
import { TodoForm } from "../form/TodoForm";
import { usePaging } from "./usePaging";

Axios.interceptors.request.use((request: AxiosRequestConfig) => {
  request.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
  request.headers = {
    headers: { "Content-Type": "application/json" },
  };
  return request;
});

Axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
});

/**
 * Custom Hooks for Todo
 * @author treetips
 */
export const useTodo = () => {
  const { pageLimit } = usePaging();

  /**
   * Fetch single todo with cache
   * @param id todo id
   */
  const fetchTodo = (id: TodoId) => {
    const URL = `/todo/${id}`;
    const fetcher = () =>
      Axios.get(URL).then((res: AxiosResponse<TodoEntity>) => res.data);
    return useSWR(URL, fetcher);
  };

  /**
   * Fetch multiple todo with cache
   */
  const fetchTodos = (props?: { page?: number }) => {
    const page = props?.page || 1;
    const queryString = `?_page=${page}&_limit=${pageLimit}&_sort=updatedAt&_order=desc`;
    const URL = `/todo${queryString}`;
    const fetcher = () =>
      Axios.get(URL).then((res: AxiosResponse<TodoEntity[]>) => res.data);
    return useSWR(URL, fetcher);
  };

  /**
   * Fetch count of all todo
   */
  const fetchAllTodos = () => {
    const URL = `/todo`;
    const fetcher = () =>
      Axios.get(URL).then((res: AxiosResponse<TodoEntity[]>) => res.data);
    return useSWR(URL, fetcher);
  };

  /**
   * Register single todo
   * @param form register form
   */
  const registerTodo = async (form: TodoForm): Promise<TodoEntity> => {
    cache.clear();
    const URL = `/todo`;
    const todo = await Axios.post(URL, {
      ...form,
      complete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((res: AxiosResponse<TodoEntity>) => res.data);
    return todo;
  };

  /**
   * Edit single todo
   * @param id todo id
   * @param currentTodo current todo
   * @param form edit form
   */
  const editTodo = async (
    id: TodoId,
    currentTodo: TodoEntity,
    form: TodoForm
  ): Promise<TodoEntity> => {
    cache.clear();
    const URL = `/todo/${id}`;
    const todo = await Axios.put(URL, {
      ...currentTodo,
      ...form,
      updatedAt: new Date(),
    }).then((res: AxiosResponse<TodoEntity>) => res.data);
    return todo;
  };

  /**
   * Remove single todo
   * @param id todo id
   */
  const removeTodo = async (id: TodoId): Promise<void> => {
    cache.clear();
    const URL = `/todo/${id}`;
    await Axios.delete(URL).then(() => {});
  };

  return {
    fetchTodo,
    fetchTodos,
    fetchAllTodos,
    registerTodo,
    editTodo,
    removeTodo,
  } as const;
};
