import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import EmployeeAuth from './private/EmployeeAuth';
import './index.css'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Manager from './private/Manager';

const router = createBrowserRouter([
  {
    path:'/main.manager',
    element:<Manager/>,
    children:[
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
