import {
  Button,
  Card,
  Description,
  Divider,
  Dot,
  Input,
  Text,
} from "@geist-ui/react";
import { ArrowLeft, Save } from "@geist-ui/react-icons";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { Page } from "../../constants";
import { useDate, useTodo } from "../../hooks";

export const TodoRegisterForm = () => {
  const router = useRouter();
  const { registerTodo } = useTodo();
  const { toLocaleDateString, toDate } = useDate();

  const [title, setTitle] = useState<string>("");
  const [titleValidationMessage, setTitleValidationMessage] = useState<string>(
    "Required"
  );
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [deadlineValidationMessage, setDeadlineValidationMessage] = useState<
    string
  >();
  const [formValid, setFormValid] = useState<boolean>(false);

  //----------------------------------------------------
  // title
  //----------------------------------------------------
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) =>
    validateTitle(e.target.value);

  const validateTitle = (value: string) => {
    let message: string = undefined;
    setTitle(value);
    setTitleValidationMessage(message);
    if (!value) {
      message = "Required";
      setTitleValidationMessage(message);
    } else {
      if (value.length > 10) {
        message = "Must be less than or equal to 10";
        setTitleValidationMessage(message);
      }
    }
    setFormValid(!message);
  };
  //----------------------------------------------------
  // deadline
  //----------------------------------------------------
  const handleDeadline = (e: ChangeEvent<HTMLInputElement>) =>
    validateDeadline(e.target.value);

  const validateDeadline = (value: string) => {
    let message: string = undefined;
    setDeadline(toDate(value));
    setDeadlineValidationMessage(message);
    if (!value) {
      message = "Required";
      setDeadlineValidationMessage(message);
    } else {
      if (new Date(value).getTime() <= new Date().getTime()) {
        message = "Must be today or later";
        setDeadlineValidationMessage(message);
      }
    }
    setFormValid(!message);
  };

  const submitRegisterTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerTodo({ title, deadline, complete: false });
    router.push(Page.TODO_LIST.getUri());
  };

  const getStatus = (
    message: string
  ): "default" | "secondary" | "success" | "warning" | "error" => {
    return !message ? "success" : "error";
  };

  return (
    <form onSubmit={submitRegisterTodo}>
      <Card shadow>
        <Card.Content>
          <Input
            placeholder="Enter the title"
            value={title}
            status={getStatus(titleValidationMessage)}
            onChange={handleTitle}
          >
            <Description
              title={<Text>Title</Text>}
              content={
                <Dot type={getStatus(titleValidationMessage)}>
                  <Text type={getStatus(titleValidationMessage)} small>
                    {titleValidationMessage || "ok"}
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
            status={getStatus(deadlineValidationMessage)}
            onChange={handleDeadline}
          >
            <Description
              title={<Text>Deadline</Text>}
              content={
                <Dot type={getStatus(deadlineValidationMessage)}>
                  <Text type={getStatus(deadlineValidationMessage)} small>
                    {deadlineValidationMessage || "ok"}
                  </Text>
                </Dot>
              }
            />
          </Input>
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
            htmlType="submit"
            type="secondary"
            icon={<Save />}
            shadow
            auto
            disabled={!formValid}
          >
            Register
          </Button>
        </Card.Footer>
      </Card>
    </form>
  );
};
