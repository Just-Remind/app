import { Outlet, ReactLocation, Router } from "@tanstack/react-location";

import routes from "./routes";

const location = new ReactLocation();

const Application = (): JSX.Element => (
  <Router location={location} routes={routes}>
    <Outlet />
  </Router>
);

export default Application;
