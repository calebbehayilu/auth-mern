import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import store from "./redux/store.js";
import router from "./routes/routes.jsx";
import Providers from "./utils/providers.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Providers>
        <RouterProvider router={router} />
        {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
      </Providers>
    </Provider>
  </React.StrictMode>
);
