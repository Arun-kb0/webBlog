import './App.css'
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CreatePostPage from './Pages/CreatePostPage'
import LoginPage from './Pages/LoginPage'
import Navbar from './Components/Navbar'
import { useSelector } from 'react-redux'
import SignUpPage from './Pages/SignUpPage'
import SideBar from './Components/SideBar'
import Navigation from './Pages/Navigation'
import ProfilePage from './Pages/ProfilePage'

function App() {
  // need replace with redux
  // const {isAuth} = useSelector((state)=>{
  //  return  state.login
  // })
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createpost" element={<CreatePostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
