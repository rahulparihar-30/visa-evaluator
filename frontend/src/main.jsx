import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import EvaluationForm from "./pages/EvaluationForm.jsx";
import Result from "./pages/Result.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/evaluate",
        element: <EvaluationForm />,
      },
      {
        path: "/result/:userId",
        element: <Result />,
      },
      {
        path: "/about",
        element: <div className="p-20 text-center text-slate-600">About Page Coming Soon</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
