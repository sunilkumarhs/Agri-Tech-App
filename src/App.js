import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";
import ReactDOM from "react-dom/client";
import Error from "./components/Error";
import Login from "./components/loginSection/Login";
import FarmerReg from "./components/loginSection/FarmerReg";
import BuyerReg from "./components/loginSection/BuyerReg";
import FarmerSection from "./components/bussinessSection/FarmerSection";
import FarmerPrfEdit from "./components/loginSection/FarmerPrfEdit";
import BuyerPrfEdit from "./components/loginSection/BuyerPrfEdit";
import BuyerSection from "./components/bussinessSection/BuyerSection";
import FertilizerList from "./components/fertilizerData/FertilizerList";
import AgriProductList from "./components/agriProductData/AgriProductList";

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
      {
        path: "/BuyerSection",
        element: <BuyerSection />,
      },
      {
        path: "/FarmerPrfEdit",
        element: <FarmerPrfEdit />,
      },
      {
        path: "/BuyerPrfEdit",
        element: <BuyerPrfEdit />,
      },
      {
        path: "/FertilizerList",
        element: <FertilizerList />,
      },
      {
        path: "/AgriProductList",
        element: <AgriProductList />,
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
