import {
  Button,
  Card,
  Description,
  Divider,
  Dot,
  Input,
  Text,
  Toggle,
} from "@geist-ui/react";
import { ArrowLeft, Save } from "@geist-ui/react-icons";
import { ToggleEvent } from "@geist-ui/react/dist/toggle/toggle";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { Page } from "../../constants";
import { TodoEntity } from "../../entity";
import { TodoFormValidationType } from "../../form/TodoForm";
import { useDate, useTodo } from "../../hooks";

type Props = {
  todo: TodoEntity;
};

export const TodoEditForm = (props: Props) => {
  const { todo } = props;
  const router = useRouter();
  const { editTodo } = useTodo();
  const { toLocaleDateString, toDate } = useDate();

  const [validationMessage] = useState<TodoFormValidationType>({});
  const [title, setTitle] = useState<string>(todo.title);
  const [deadline, setDeadline] = useState<Date>(todo.deadline);
  const [complete, setComplete] = useState<boolean>(todo.complete);
  const [formValid, setFormValid] = useState<boolean>(true);

  //----------------------------------------------------
  // title
  //----------------------------------------------------
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) =>
    validateTitle(e.target.value);

  const validateTitle = (value: string) => {
    setTitle(value);
    validationMessage.title = undefined;
    if (!value) {
      validationMessage.title = "Required";
    } else {
      if (value.length > 10) {
        validationMessage.title = "Must be less than or equal to 10";
      }
    }
    setFormValid(!validationMessage.title);
  };
  //----------------------------------------------------
  // deadline
  //----------------------------------------------------
  const handleDeadline = (e: ChangeEvent<HTMLInputElement>) =>
    validateDeadline(e.target.value);

  const validateDeadline = (value: string) => {
    setDeadline(toDate(value));
    validationMessage.deadline = undefined;
    if (!value) {
      validationMessage.deadline = "Required";
    } else {
      if (new Date(value).getTime() <= new Date().getTime()) {
        validationMessage.deadline = "Must be today or later";
      }
    }
    setFormValid(!validationMessage.deadline);
  };
  //----------------------------------------------------
  // complete
  //----------------------------------------------------
  const handleComplete = (e: ToggleEvent) => setComplete(e.target.checked);

  const submitEditTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editTodo(todo.id, todo, { title, deadline, complete });
    router.push(Page.TODO_DETAIL.getUri(todo.id));
  };

  const getStatus = (
    message: string
  ): "default" | "secondary" | "success" | "warning" | "error" => {
    return !message ? "success" : "error";
  };

  return (
    <form onSubmit={submitEditTodo}>
      <Card shadow>
        <Card.Content>
          <Input
            placeholder="Enter the title"
            value={title}
            status={getStatus(validationMessage.title)}
            onChange={handleTitle}
          >
            <Description
              title={<Text>Title</Text>}
              content={
                <Dot type={getStatus(validationMessage.title)}>
                  <Text type={getStatus(validationMessage.title)} small>
                    {validationMessage.title || "ok"}
                  </Text>
                </Dot>
              }
            />
          </Input>

          <Divider />

          <Input
            placeholder="yyyy-MM-dd"
            type="date"
            value={toLocaleDateString(deadline)}
            status={getStatus(validationMessage.deadline)}
            onChange={handleDeadline}
          >
            <Description
              title={<Text>Deadline</Text>}
              content={
                <Dot type={getStatus(validationMessage.deadline)}>
                  <Text type={getStatus(validationMessage.deadline)} small>
                    {validationMessage.deadline || "ok"}
                  </Text>
                </Dot>
              }
            />
          </Input>

          <Divider />

          <Description
            title={<Text>Complete</Text>}
            content={
              <Toggle
                initialChecked={complete}
                size="large"
                onChange={handleComplete}
              />
            }
          />
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
              router.push(Page.TODO_DETAIL.getUri(todo.id));
            }}
          >
            Back
          </Button>
          <Button
            htmlType="submit"
            type="secondary"
            icon={<Save />}
            shadow
            auto
            disabled={!formValid}
          >
            Save
          </Button>
        </Card.Footer>
      </Card>
    </form>
  );
};
