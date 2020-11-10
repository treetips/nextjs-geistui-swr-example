import { Text } from "@geist-ui/react";
import Head from "next/head";
import { Layout } from "../../components";
import { TodoList } from "../../components/pages";

export default function TodoPage() {
  return (
    <>
      <Head>
        <title>TODO List</title>
      </Head>
      <Layout>
        <Text h1>TODO List</Text>
        <TodoList />
      </Layout>
    </>
  );
}
