import Head from "next/head";
import { TodoRegister } from "../../components/pages";

export default function TodoRegisterPage() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <TodoRegister />
    </>
  );
}
