import { Route } from "@tanstack/react-location";

import Book from "./pages/Book";
import Dashboard from "./pages/Dashboard";

const routes: Route[] = [
  { path: "/", element: <Dashboard /> },
  { path: "/books/:id", element: <Book /> },
  {
    element: <div>Page not found</div>,
  },
];

export default routes;
