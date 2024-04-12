import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header/Header';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import { Quiz } from './Components/Quiz';
import Home from './Pages/Home';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:  <App/>,
//   },
//   {
//     path: "/quiz",
//     element:  <Quiz/>,
//   }
// ]);
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      {/* ... etc. */}
    </Route>,
      // <Route path='*' element={<h1> Page not Found</h1>}/>

  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* <Header/> */}
//     <App/>
//     <RouterProvider router={router} /> 
//     {/* prop ka name always router hoga  eg. router={}*/}
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
