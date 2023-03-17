import NProgress from "nprogress";
import { useEffect } from "react";
import Router from "next/router";
import React from "react";
import "../styles/main.scss";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const start = () => NProgress.start();
    const end = () => NProgress.done();

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return <Component {...pageProps} />;
}
