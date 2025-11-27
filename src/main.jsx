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
        element: <AvailableFoods></AvailableFoods>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
