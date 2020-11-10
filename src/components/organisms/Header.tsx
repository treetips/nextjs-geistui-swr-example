import { Tabs, useTabs } from "@geist-ui/react";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../../styles/Layout.module.scss";
import { Page } from "../../constants";

type Props = {
  component: React.ReactNode;
};

export const Header = (props: Props) => {
  const { component } = props;
  const router = useRouter();
  const page = Page.ofRelativeUrl(router.pathname) || Page.TOP;

  const { bindings } = useTabs(String(page.id));

  bindings.onChange = (tabIndexStr: string) => {
    const tabPage = Page.of(Number(tabIndexStr));
    router.push(tabPage.relativeUrl);
  };

  const WrapperComponent = () => {
    return (
      <div className={styles.container}>
        <main className={styles.main}>{component}</main>
      </div>
    );
  };

  return (
    <Tabs {...bindings}>
      <Tabs.Item label={Page.TOP.pageTitle} value={String(Page.TOP.id)}>
        <WrapperComponent />
      </Tabs.Item>
      <Tabs.Item
        label={Page.TODO_LIST.pageTitle}
        value={String(Page.TODO_LIST.id)}
      >
        <WrapperComponent />
      </Tabs.Item>
      <Tabs.Item
        label={Page.TODO_REGISTER.pageTitle}
        value={String(Page.TODO_REGISTER.id)}
      >
        <WrapperComponent />
      </Tabs.Item>
      <Tabs.Item
        label={Page.CONTEXT_API.pageTitle}
        value={String(Page.CONTEXT_API.id)}
      >
        <WrapperComponent />
      </Tabs.Item>
      <Tabs.Item label={Page.ERROR.pageTitle} value={String(Page.ERROR.id)}>
        <WrapperComponent />
      </Tabs.Item>
    </Tabs>
  );
};
