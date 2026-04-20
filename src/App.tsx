import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./layout/Layout";
import Home from "./components/pages/Home";
import Bookings from "./components/pages/Bookings";
import Cabins from "./components/pages/Cabins";
import Users from "./components/pages/Users";
import Settings from "./components/pages/Settings";
import CheckIn from "./components/features/bookings/CheckIn";
import Login from "./components/features/users/Login";
import Account from "./components/features/users/Account";
import SignUp from "./components/features/users/SignUp";
import ProtectedRoute from "./components/features/users/ProtectedRoute";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "bookings", element: <Bookings /> },
        { path: "cabins", element: <Cabins /> },
        { path: "users", element: <Users /> },
        { path: "settings", element: <Settings /> },
        { path: "checkin/:bookingId", element: <CheckIn /> },
        { path: "account", element: <Account /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
  ]);

  return (
    <>
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
