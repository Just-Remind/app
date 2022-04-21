import { Outlet, ReactLocation, Router } from "@tanstack/react-location";

import { Sidebar } from "components/layouts";

import routes from "./routes";

const location = new ReactLocation();

const Application = (): JSX.Element => (
  <Router location={location} routes={routes}>
    <div>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </div>
  </Router>
);

export default Application;
