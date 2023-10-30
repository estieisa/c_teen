import ReactDOM from "react-dom/client";
import "./firebase/firebase-config";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; 
import {store, persistor } from './redux/store'; 
import NetworkManager from "./NetworkManager";
// import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// if(process.env.NODE_ENV === 'production') disableReactDevTools()
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NetworkManager>
        <App/>
        </NetworkManager>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
