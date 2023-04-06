import './App.css'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Navigation from './Pages/Navigation'
import HomePageLoad from './Components/home/HomePageLoad'

const HomePage = lazy(() => import("./Pages/HomePage"))
const CreatePostPage = lazy(() => import("./Pages/CreatePostPage"))
const LoginPage = lazy(() => import("./Pages/LoginPage"))
const SignUpPage = lazy(() => import('./Pages/SignUpPage'))
const ProfilePage = lazy(() => import('./Pages/ProfilePage'))


function App() {

  // !fix needed
  const Fallback = ()=>{

    const location = useLocation()
    let FallbackComponent =null

    switch (location.pathname) {
      case '/':
        FallbackComponent = <HomePageLoad />
        return FallbackComponent
      case '/profile':
        FallbackComponent = <div> loading createpost .....</div>
        return FallbackComponent
  
    }
  }
  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<div></div>} >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createpost" element={<CreatePostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/load" element={<HomePageLoad />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}




export default App
