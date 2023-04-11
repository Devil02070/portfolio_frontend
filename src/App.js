// import React, { createContext, useReducer } from 'react'
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './components/views/Home';
import About from './components/views/About';
import Contact from './components/views/Contact';
import Members from './components/views/Members';
import Errorpage from './components/views/Errorpage';
// import Single_user from './components/views/Single_user'
import SingleUser from './components/views/Single_user'

import Login from './components/auth/Login';
import Register from './components/auth/Signup';
import Logout from './components/auth/Logout';


// import { initialState, reducer } from './reducer/UseReducer';
// contextapi
// export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/about" element={<About />}></Route>
      <Route exact path="/contact" element={<Contact />}></Route>
      <Route exact path="/view_users" element={<Members />}></Route>
      <Route path="/user/:id" element={<SingleUser/>}></Route>

      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      <Route exact path="/logout" element={<Logout />}></Route>
      <Route path='/*' element={<Errorpage />}></Route>
    </Routes>
  )
}

const App = () => {
  // const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      {/* <UserContext.Provider value={{ state, dispatch }}> */}
        <Navbar/>
        <Routing />
        <Footer />
      {/* </UserContext.Provider> */}
    </>
  )
}

export default App