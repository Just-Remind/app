import { Route } from "@tanstack/react-location";

import Admin from "./pages/Admin";
import Book from "./pages/Book";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import { Restricted } from "./ui";

const routes: Route[] = [
  { path: "/", element: <Dashboard /> },
  { path: "/books/:id", element: <Book /> },
  { path: "/settings", element: <Settings /> },
  {
    path: "/admin",
    element: (
      <Restricted adminOnly privateRoute>
        <Admin />
      </Restricted>
    ),
  },
  { element: <div>Page not found</div> },
];

export default routes;
