// eslint-disable-next-line no-unused-vars
import React from 'react'
import { createBrowserRouter , createRoutesFromElements , Route , RouterProvider } from 'react-router-dom'
// import { NavLink } from 'react-router-dom';
import Welcome from './component/Welcome'
import Login from './component/Login'
import SignUp from './component/SingnUp'


import './App.css'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Route>
  )
);



const App = () => <RouterProvider router={router} />

export default App;
