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
    Auth.currentAuthenticatedUser().catch(() => {
      router.push("/landing");
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
