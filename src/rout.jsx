import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Categories from "./components/Categories/Categories";
import ForgotPassword from "./pages/ForgetPassword/ForgetPassword"
import ResetPassword from "./pages/ForgetPassword/ResetPassword"
import UserContextProvider from "./context/UserContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element:
    <UserContextProvider>
     <MainLayout /> 
    </UserContextProvider>, 
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "cart",
        element:
          <Cart />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "Auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

export default router;
