import "./style.scss";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import MyOnline from "./pages/MyOnline";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Paymentlist from "./pages/Paymentlist";
import WishList from "./pages/WishList";
import Lecturelist from "./pages/Lecturelist";
import Detail from "./pages/Detail";
import LecturePlay from "./pages/LecturePlay";
import PaymentPopup from "./pages/PaymentPopup";
import ForgotEmail from "./pages/ForgotEmail";
import ForgotPassword from "./pages/ForgotPassword";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/myonline",
        element: <MyOnline />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/paymentlist",
        element: <Paymentlist />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      {
        path: "/lecturelist",
        element: <Lecturelist />,
      },
      {
        path: "/detail",
        element: <Detail />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/lectureplay",
    element: <LecturePlay />,
  },
  {
    path: "/homelogin",
    element: <homelogin />,
  },
  {
    path: "/paymentpopup",
    element: <PaymentPopup />,
  },
  {
    path: "/forgot-email",
    element: <ForgotEmail />,
  },
  {
    path: "/forgot-Password",
    element: <ForgotPassword />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
