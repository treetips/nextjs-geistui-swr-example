import { Spinner, Text } from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../components";
import { TodoDetail } from "../../components/pages";
import { Page } from "../../constants";
import { TodoId } from "../../entity";

export default function TodoDetailPage() {
  const router = useRouter();
  const [id, setId] = useState<TodoId>();
  const [validationError, setValidationError] = useState<boolean>(false);
  const idStr = String(router.query?.id || "");

  useEffect(() => {
    if (idStr && /^[1-9]+[0-9]*$/i.test(idStr)) {
      setId(Number(idStr));
    } else {
      setValidationError(true);
    }
  }, [idStr]);

  if (validationError === true) {
    router.push(`${Page.ERROR_404.getUri()}`);
  }

  return (
    <>
      <Head>
        <title>Detail</title>
      </Head>
      {id ? (
        <TodoDetail id={id} />
      ) : (
        <Layout>
          <Spinner size="large" />
          <Text p>id = {id}</Text>
        </Layout>
      )}
    </>
  );
}
