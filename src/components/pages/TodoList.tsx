import {
  Badge,
  Button,
  Card,
  Divider,
  Dot,
  Note,
  Pagination,
  Row,
  Spacer,
  Spinner,
  Table,
  Text,
} from "@geist-ui/react";
import { Plus, ZoomIn } from "@geist-ui/react-icons";
import {
  TableCellActions,
  TableCellData,
} from "@geist-ui/react/dist/table/table-cell";
import { useRouter } from "next/router";
import { useState } from "react";
import { Page } from "../../constants";
import { TodoEntity } from "../../entity";
import { useDate, usePaging, useTodo } from "../../hooks";

export const TodoList = () => {
  const router = useRouter();
  const [listPage, setListPage] = useState<number>();
  const { fetchTodos, fetchAllTodos } = useTodo();
  const { getPageNumber } = usePaging();
  const { toLocaleDateString } = useDate();

  const fetchTodosResult = fetchTodos({ page: listPage });
  const fetchAllTodosResult = fetchAllTodos();

  if (fetchTodosResult.error || fetchAllTodosResult.error) {
    return (
      <Note type="error" label="ERROR" filled>
        An error has occurred.
      </Note>
    );
  }
  if (!fetchTodosResult.data || !fetchAllTodosResult.data) {
    return <Spinner size="large" />;
  }

  const todos = fetchTodosResult.data;
  const searchResultCount = fetchAllTodosResult.data?.length || 0;
  const pageCount = getPageNumber(searchResultCount);

  const actions = (_: TableCellActions, rowData: TableCellData) => {
    return (
      <Button
        type="secondary"
        size="medium"
        icon={<ZoomIn />}
        auto
        shadow
        ghost
        onClick={(_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          const rowTodo = rowData.rowValue as TodoEntity;
          router.push(Page.TODO_DETAIL.getUri(rowTodo.id));
        }}
      >
        Detail
      </Button>
    );
  };

  const tableData = todos?.map((todo: TodoEntity) => {
    return {
      ...todo,
      deadline: toLocaleDateString(todo.deadline),
      complete: (
        <Dot type={todo.complete ? "success" : "error"}>
          <Text className="no-margin">
            {todo.complete ? "Complete" : "Incomplete"}
          </Text>
        </Dot>
      ),
      actions,
    };
  });

  const handleRegister = () => {
    router.push(Page.TODO_REGISTER.getUri());
  };

  const handlePage = (pageNo: number) => {
    if (pageNo !== listPage) {
      setListPage(pageNo);
    }
  };

  const Pager = () => (
    <Pagination
      count={pageCount}
      initialPage={listPage || 1}
      limit={5}
      onChange={handlePage}
    />
  );

  return (
    <>
      <Button icon={<Plus />} type="secondary" shadow onClick={handleRegister}>
        Register
      </Button>

      <Spacer />

      <Card shadow>
        <Row justify="center">
          <Text h3>
            Search Result Count&nbsp;
            <Badge type="secondary" size="large">
              {searchResultCount}
            </Badge>
          </Text>
        </Row>

        <Divider />

        <Pager />
        <Table data={tableData}>
          <Table.Column prop="id" label="ID" width={180} />
          <Table.Column prop="title" label="Title" width={180} />
          <Table.Column prop="deadline" label="Deadline" width={110} />
          <Table.Column prop="complete" label="Complete" width={50} />
          <Table.Column prop="actions" label="Actions" />
        </Table>
        <Spacer />
        <Pager />
      </Card>
    </>
  );
};
