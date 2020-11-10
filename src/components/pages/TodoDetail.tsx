import {
  Button,
  Card,
  Divider,
  Dot,
  Grid,
  Note,
  Spinner,
  Text,
} from "@geist-ui/react";
import { ArrowLeft, Edit3, Trash2 } from "@geist-ui/react-icons";
import { useRouter } from "next/router";
import { Page } from "../../constants";
import { TodoId } from "../../entity";
import { useDate, useTodo } from "../../hooks";
import { Layout } from "../Layout";

type Props = {
  id: TodoId;
};

export const TodoDetail = (props: Props) => {
  const { id } = props;
  const router = useRouter();
  const { fetchTodo, removeTodo } = useTodo();
  const { toLocaleDateString, toLocaleDateTimeString } = useDate();

  const { data, error } = fetchTodo(id);
  if (error) {
    return (
      <Layout>
        <Note type="warning" label="Note" filled>
          TODO id {id} was not found.
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

  const handleEditTodo = () => {
    router.push(Page.TODO_EDIT.getUri(id));
  };

  const handleDeleteTodo = async () => {
    router.push(`${Page.TODO_LIST.getUri()}`);
    await removeTodo(id);
  };

  return (
    <>
      <Layout>
        <Text h1>Todo Detail</Text>

        <Card shadow>
          <Card.Content>
            <Grid.Container gap={2} justify="center">
              <Grid xs={24} sm={8}>
                <Text type="success" className="no-margin" b>
                  ID
                </Text>
              </Grid>
              <Grid xs={24} sm={16}>
                {todo.id}
              </Grid>
            </Grid.Container>

            <Divider />

            <Grid.Container gap={2} justify="center">
              <Grid xs={24} sm={8}>
                <Text type="success" className="no-margin" b>
                  Title
                </Text>
              </Grid>
              <Grid xs={24} sm={16}>
                {todo.title}
              </Grid>
            </Grid.Container>

            <Divider />

            <Grid.Container gap={2} justify="center">
              <Grid xs={24} sm={8}>
                <Text type="success" className="no-margin" b>
                  Deadline
                </Text>
              </Grid>
              <Grid xs={24} sm={16}>
                {toLocaleDateString(todo.deadline)}
              </Grid>
            </Grid.Container>

            <Divider />

            <Grid.Container gap={2} justify="center">
              <Grid xs={24} sm={8}>
                <Text type="success" className="no-margin" b>
                  Complete
                </Text>
              </Grid>
              <Grid xs={24} sm={16}>
                <Dot type={todo.complete ? "success" : "error"}>
                  <Text className="no-margin">
                    {todo.complete ? "Complete" : "Incomplete"}
                  </Text>
                </Dot>
              </Grid>
            </Grid.Container>

            <Divider />

            <Grid.Container gap={2} justify="center">
              <Grid xs={24} sm={8}>
                <Text type="success" className="no-margin" b>
                  CreatedAt
                </Text>
              </Grid>
              <Grid xs={24} sm={16}>
                {toLocaleDateTimeString(todo.createdAt)}
              </Grid>
            </Grid.Container>

            <Divider />

            <Grid.Container gap={2} justify="center">
              <Grid xs={24} sm={8}>
                <Text type="success" className="no-margin" b>
                  UpdatedAt
                </Text>
              </Grid>
              <Grid xs={24} sm={16}>
                {toLocaleDateTimeString(todo.updatedAt)}
              </Grid>
            </Grid.Container>
          </Card.Content>
          <Card.Footer>
            <Button
              type="secondary"
              size="medium"
              icon={<ArrowLeft />}
              auto
              shadow
              ghost
              onClick={(_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                router.push(Page.TODO_LIST.getUri());
              }}
            >
              Back
            </Button>
            <Button
              type="secondary"
              icon={<Edit3 />}
              shadow
              auto
              onClick={handleEditTodo}
            >
              Edit
            </Button>
            <Button
              type="error"
              icon={<Trash2 />}
              shadow
              auto
              ghost
              onClick={handleDeleteTodo}
            >
              Delete
            </Button>
          </Card.Footer>
        </Card>
      </Layout>
    </>
  );
};
