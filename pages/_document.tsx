import { Html, Head, Main, NextScript } from "next/document";

import loader from "src/loader";

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head />
      <head>
        <style>{loader}</style>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <div id="globalLoader">
          <div className="loader">
            <div />
            <div />
          </div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
