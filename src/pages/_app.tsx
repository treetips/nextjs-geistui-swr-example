import { AppProps, NextWebVitalsMetric } from "next/app";
import "../../styles/globals.scss";

/**
 * @see https://nextjs.org/docs/advanced-features/measuring-performance
 * @param metric NextWebVitalsMetric
 */
export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  if (metric.label === "web-vital") {
    console.table(metric);
  }
};

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
};
export default MyApp;
