import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import DetailIndicadoresPerformance from './pages/DetailIndicadoresPerformance';
import reportWebVitals from './reportWebVitals';



const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Welcome to Baspan React!</div>,
  },
  {
    path: "/DetailIndicadoresPerformance",
    element: <DetailIndicadoresPerformance></DetailIndicadoresPerformance>
  }
]);



const root = ReactDOM.createRoot(
  document.getElementById('root-react') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();