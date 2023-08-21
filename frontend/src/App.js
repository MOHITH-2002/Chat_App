
import React from 'react'
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Message from './components/Messages/Messanger';

const App = () => {
  const router = createBrowserRouter([

    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/user-api-messenger-single",
      element: <Message/>,
    },
  
    {
      path: "/message/login",
      element: <Login/>,
    },
    {
      path: "/message/register",
      element: <Register/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
    )
}

export default App
