import { Button, Note, Row, Spacer, Text } from "@geist-ui/react";
import { AppContext } from "next/app";
import { useRouter } from "next/router";
import { Layout } from "../components";
import { Page } from "../constants";

type Props = {
  statusCode: number | string;
};

/**
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#500-page
 */
function Error(props: Props) {
  const { statusCode } = props;
  const router = useRouter();
  const handleTop = () => {
    router.push(`${Page.TOP.getUri()}`);
  };

  return (
    <Layout>
      <Row justify="center">
        <Text h1 type="error">
          500 Internal Server Error
        </Text>
      </Row>

      <Row justify="center">
        <Note type="error" label="error" filled>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </Note>
      </Row>

      <Spacer />

      <Row justify="center">
        <Button type="secondary" ghost onClick={handleTop}>
          TOP
        </Button>
      </Row>
    </Layout>
  );
}

Error.getInitialProps = async (appContext: AppContext): Promise<Props> => {
  const { ctx } = appContext;
  const statusCode = ctx?.res
    ? ctx?.res.statusCode
    : ctx?.err
    ? ctx?.err.statusCode
    : 500;
  return { statusCode };
};

export default Error;
