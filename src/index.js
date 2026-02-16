import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Manager from './private/Manager';
import Employee from './private/pages/Employee';
import Dashboard from './private/pages/Dashboard';
import Config from './private/pages/Config';
import Admin from './private/pages/Admin';
import Home from './private/pages/Home';
import UserAuth from './private/UserAuth';
import ProductCreate from './private/pages/ProductCreate';
import ProductSearch from './private/pages/ProductSearch';
import ProductUpdate from './private/pages/ProductUpdate';
import ClientSearch from './private/pages/ClientSearch';
import ClientCreate from './private/pages/ClientCreate';
import ClientCart from './private/pages/ClientCart';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Manager/>,
    children:[
      {path:'/main',element:<Home/>},

      {path:'/products', element:<ProductCreate/>},
      {path:'/products/search', element:<ProductSearch/>},
      {path:'/products/update', element:<ProductUpdate/>},

      {path:'/client/create',  element:<ClientCreate/>},
      {path:'/client/search',  element:<ClientSearch/>},
      {path:'/client/cart',  element:<ClientCart/>},

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
