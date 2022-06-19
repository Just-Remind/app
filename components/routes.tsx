import { Route } from "@tanstack/react-location";

import Book from "./pages/Book";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

const routes: Route[] = [
  { path: "/", element: <Dashboard /> },
  { path: "/books/:id", element: <Book /> },
  { path: "/settings", element: <Settings /> },
  {
    element: <div>Page not found</div>,
  },
];

export default routes;
