import { Text } from "@geist-ui/react";
import { Layout } from "../Layout";
import { TodoRegisterForm } from "../organisms";

export const TodoRegister = () => {
  return (
    <Layout>
      <Text h1>Register Todo</Text>
      <TodoRegisterForm />
    </Layout>
  );
};
