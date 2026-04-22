import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Categories from "./components/Categories/Categories";
import ForgotPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ForgetPassword/ResetPassword";
import Products from "./pages/Products/Products.jsx";
import ProductDetails from "./pages/Products/ProductDetails";
import CategoryProducts from "./pages/Products/CategoryProducts";
import CheckOut from "./pages/CheckOut/CheckOut.jsx";
import ProtectedRouter from "./protectedRouter.jsx";
import PublicOnlyRoute from "./publicOnlyRoute.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ProfileInfoPage from "./pages/Profile/ProfileInfoPage.jsx";
import ProfileOrdersPage from "./pages/Profile/ProfileOrdersPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        ),
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/category/:categoryId",
        element: <CategoryProducts />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRouter>
            <CheckOut />
          </ProtectedRouter>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
        children: [
          {
            index: true,
            element: <ProfileInfoPage />,
          },
          {
            path: "orders",
            element: <ProfileOrdersPage />,
          },
        ],
      },
    ],
  },
  {
    path: "Auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicOnlyRoute>
            <ForgotPassword />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "reset-password",
        element: (
          <PublicOnlyRoute>
            <ResetPassword />
          </PublicOnlyRoute>
        ),
      },
    ],
  },
]);

export default router;
