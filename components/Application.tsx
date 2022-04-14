import { Outlet, ReactLocation, Router } from "@tanstack/react-location";

import { Header } from "components/ui";

import routes from "./routes";

const location = new ReactLocation();

const Application = (): JSX.Element => (
  <Router location={location} routes={routes}>
    <Header />
    <main className="p-6">
      <Outlet />
    </main>
  </Router>
);

export default Application;
