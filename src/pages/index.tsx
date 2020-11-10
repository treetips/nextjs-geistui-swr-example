import { Card, Grid, Text } from "@geist-ui/react";
import Head from "next/head";
import { Layout } from "../components";
import { AutoResizeImage, ExternalLink, Strong } from "../components/atoms";

const ICON_WIDTH = 100;

export default function Index() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <Text h1>Vercel Friendly Example 💖</Text>

        <Card shadow>
          <Card.Body>
            <Grid.Container justify="center" alignItems="center">
              <Grid xs={8} sm={6}>
                <AutoResizeImage
                  src="/images/vercel-icon.png"
                  title="Vercel"
                  href="https://vercel.com/"
                  resizeOption={{
                    type: "width",
                    value: ICON_WIDTH,
                  }}
                />
              </Grid>
              <Grid xs={8} sm={6}>
                <AutoResizeImage
                  src="/images/nextjs-icon.png"
                  title="Vercel Next.js"
                  href="https://nextjs.org/"
                  resizeOption={{
                    type: "width",
                    value: ICON_WIDTH,
                  }}
                />
              </Grid>
              <Grid xs={8} sm={6}>
                <AutoResizeImage
                  src="/images/swr-icon.png"
                  title="Vercel SWR"
                  href="https://swr.vercel.app/"
                  resizeOption={{
                    type: "width",
                    value: ICON_WIDTH,
                  }}
                />
              </Grid>
              <Grid xs={8} sm={6}>
                <AutoResizeImage
                  src="/images/geistui-icon.png"
                  title="Vercel GeistUI"
                  href="https://geist-ui.dev/"
                  resizeOption={{
                    type: "width",
                    value: ICON_WIDTH,
                  }}
                />
              </Grid>
              <Grid xs={8} sm={6}>
                <AutoResizeImage
                  src="/images/vscode-icon.png"
                  title="Microsoft Visual Studio Code"
                  href="https://code.visualstudio.com/"
                  resizeOption={{
                    type: "width",
                    value: ICON_WIDTH,
                  }}
                />
              </Grid>
              <Grid xs={8} sm={6}>
                <AutoResizeImage
                  src="/images/typescript-icon.png"
                  title="Microsoft TypeScript"
                  href="https://www.typescriptlang.org/"
                  resizeOption={{
                    type: "width",
                    value: ICON_WIDTH,
                  }}
                />
              </Grid>
              <Grid xs={8} sm={6}>
                <AutoResizeImage
                  src="/images/react-icon.png"
                  title="React.js"
                  href="https://reactjs.org/"
                  resizeOption={{
                    type: "width",
                    value: ICON_WIDTH,
                  }}
                />
              </Grid>
              <Grid xs={8} sm={6}>
                <AutoResizeImage
                  src="/images/webvitals-icon.png"
                  title="Web Vitals"
                  href="https://web.dev/vitals/"
                  resizeOption={{
                    type: "width",
                    value: ICON_WIDTH,
                  }}
                />
              </Grid>
            </Grid.Container>
          </Card.Body>
          <Card.Footer>
            <Text p>
              These images are <Strong>png</Strong>, but has been converted
              to&nbsp;<Strong>webp</Strong> etc. by &nbsp;
              <ExternalLink href="https://nextjs.org/docs/basic-features/image-optimization">
                next/image
              </ExternalLink>
              .
            </Text>
          </Card.Footer>
        </Card>
      </Layout>
    </>
  );
}
