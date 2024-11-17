import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import EmployeeAuth from './private/EmployeeAuth';
import './index.css'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Manager from './private/Manager';
import Products from './private/pages/Products';
import Clients from './private/pages/Clients';
import Employee from './private/pages/Employee';
import Cart from './private/pages/Cart';
import Dashboard from './private/pages/Dashboard';
import Config from './private/pages/Config';
import Admin from './private/pages/Admin';
import Home from './private/pages/Home';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Manager/>,
    children:[
      {path:'/main.manager/',element:<Home/>},
      {path:'/main.manager/products', element:<Products/>},
      {path:'/main.manager/cart',     element:<Cart/>},
      {path:'/main.manager/clients',  element:<Clients/>},
      {path:'/main.manager/employee',element:<Employee/>},
      {path:'/main.manager/dashboard',element:<Dashboard/>},
      {path:'/main.manager/config',element:<Config/>},
      {path:'/main.manager/admin',element:<Admin/>},
    ]
  },
  {
    path:'/auth.manager',
    element:<EmployeeAuth/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
