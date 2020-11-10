import { Note, Spinner, Text } from "@geist-ui/react";
import { TodoId } from "../../entity";
import { useTodo } from "../../hooks";
import { Layout } from "../Layout";
import { TodoEditForm } from "../organisms";

type Props = {
  id: TodoId;
};

export const TodoEdit = (props: Props) => {
  const { id } = props;
  const { fetchTodo } = useTodo();

  const { data, error } = fetchTodo(id);
  if (error) {
    return (
      <Layout>
        <Note type="error" label="ERROR" filled>
          An error has occurred.
        </Note>
      </Layout>
    );
  }
  if (!data) {
    return (
      <Layout>
        <Spinner size="large" />
      </Layout>
    );
  }

  const todo = data;

  return (
    <Layout>
      <Text h1>Edit Todo {id}</Text>
      <TodoEditForm todo={todo} />
    </Layout>
  );
};
