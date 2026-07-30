import { createRoot } from "react-dom/client";
import "./app/index.css";
import App from "./app/App.jsx";
import { store } from "./app/app.store.js";
import { Provider } from "react-redux";
// 1. Import the ToastProvider (adjust the relative path if you placed it inside another folder like ./features/common/ or ./context/)
import { ToastProvider } from "../src/context/ToastContext.jsx"; 

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Provider>,
);