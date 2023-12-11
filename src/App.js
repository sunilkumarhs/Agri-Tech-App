import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";
import ReactDOM from "react-dom/client";
import Error from "./components/Error";
import Login from "./components/loginSection/Login";
import FarmerReg from "./components/loginSection/FarmerReg";
import BuyerReg from "./components/loginSection/BuyerReg";
import FarmerSection from "./components/bussinessSection/FarmerSection";

const AppLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/FarmerReg",
        element: <FarmerReg />,
      },
      {
        path: "/BuyerReg",
        element: <BuyerReg />,
      },
      {
        path: "/FarmerSection",
        element: <FarmerSection />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
