import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClientProvider } from 'react-query';
import queryClient from './api/src/queryClient';
import './Styles/main.scss'; 

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

