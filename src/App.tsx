
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./components/pages/Home";
import Bookings from "./components/pages/Bookings";
import Cabins from "./components/pages/Cabins";
import Users from "./components/pages/Users";
import Settings from "./components/pages/Settings";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "bookings", element: <Bookings /> },
        { path: "cabins", element: <Cabins /> },
        { path: "users", element: <Users /> },
        { path: "settings", element: <Settings /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;