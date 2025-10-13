import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Manager from './private/Manager';
import Clients from './private/pages/Clients';
import Employee from './private/pages/Employee';
import Cart from './private/pages/Cart';
import Dashboard from './private/pages/Dashboard';
import Config from './private/pages/Config';
import Admin from './private/pages/Admin';
import Home from './private/pages/Home';
import UserAuth from './private/UserAuth';
import ProductCreate from './private/pages/ProductCreate';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Manager/>,
    children:[
      {path:'/main',element:<Home/>},
      {path:'/products', element:<ProductCreate/>},
      {path:'/cart',     element:<Cart/>},
      {path:'/clients',  element:<Clients/>},
      {path:'/employee',element:<Employee/>},
      {path:'/dashboard',element:<Dashboard/>},
      {path:'/config',element:<Config/>},
      {path:'/admin',element:<Admin/>},
    ]
  },
  {
    path:'/auth',
    element:<UserAuth/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
