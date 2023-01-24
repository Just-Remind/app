import { useEffect } from "react";

import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

import { Sidebar } from "components/layouts";

import routes from "./routes";

const Application = (): JSX.Element => {
  // next router
  const router = useRouter();

  // hooks
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((result) => {
      const userEmail = result.attributes.email;
      const extensionId = process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID;
      const isChrome = !!window.chrome && !!window.chrome.runtime;
      if (extensionId && isChrome && chrome.runtime) {
        chrome.runtime.sendMessage(extensionId, { userEmail }, (response) => {
          console.log("response", response);
        });
      }
    });
  }, [router]);

  // Set up a ReactLocation instance
  const location = new ReactLocation();

  return (
    <Router location={location} routes={routes}>
      <div>
        <Sidebar>
          <Outlet />
        </Sidebar>
      </div>
    </Router>
  );
};

export default Application;
