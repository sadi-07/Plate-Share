import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Home/Home.jsx';
import MainLayout from './Layout/MainLayout.jsx';
import AvailableFoods from './Food/AvailableFoods.jsx';

import AOS from "aos";
import "aos/dist/aos.css";
import Login from './Auth/Login.jsx';
import Register from './Auth/Register.jsx';
import AuthProvider from './Contetexts/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import Error404 from './Error/Error404.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import FoodDetails from './Food/FoodDetails.jsx';
import MyFoods from './Food/MyFoods.jsx';
import AddFood from './Food/AddFood.jsx';
import MyFoodRequest from './Food/MyFoodRequest.jsx';

AOS.init();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/availableFoods",
        element: <AvailableFoods></AvailableFoods>,
        loader: () => fetch('http://localhost:3000/foods')
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/myFoods",
        element: (
          <PrivateRoute>
            <MyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/myFoodRequests",
        element: (
          <PrivateRoute>
            <MyFoodRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <Error404></Error404>,
      },

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position='top-right' reverseOrder={false}></Toaster>
    </AuthProvider>
  </StrictMode>,


)
