import { Button, Row, Text } from "@geist-ui/react";
import { useRouter } from "next/router";
import { Layout } from "../components";
import { Page } from "../constants";

/**
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#404-page
 */
export default function Custom404() {
  const router = useRouter();
  const handleTop = () => {
    router.push(`${Page.TOP.getUri()}`);
  };

  return (
    <Layout>
      <Row justify="center">
        <Text h1 type="warning">
          404 Not Found
        </Text>
      </Row>
      <Row justify="center">
        <Button type="secondary" ghost onClick={handleTop}>
          TOP
        </Button>
      </Row>
    </Layout>
  );
}
