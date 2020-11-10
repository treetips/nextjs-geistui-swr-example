import { Row } from "@geist-ui/react";
import { Github } from "@geist-ui/react-icons";
import styles from "../../../styles/Footer.module.scss";
import { ExternalLink } from "../atoms";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Row justify="center">
        <ExternalLink href="https://github.com/treetips/nextjs-geistui-swr-example">
          <Github /> Github
        </ExternalLink>
      </Row>
    </footer>
  );
};
