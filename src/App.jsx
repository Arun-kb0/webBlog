import './App.css'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import HomePage from './Pages/HomePage'
// import CreatePostPage from './Pages/CreatePostPage'
// import LoginPage from './Pages/LoginPage'
// import SignUpPage from './Pages/SignUpPage'
// import ProfilePage from './Pages/ProfilePage'
import Navigation from './Pages/Navigation'

const HomePage = lazy(() => import("./Pages/HomePage"))
const CreatePostPage = lazy(() => import("./Pages/CreatePostPage"))
const LoginPage = lazy(() => import("./Pages/LoginPage"))
const SignUpPage = lazy(() => import('./Pages/SignUpPage'))
const ProfilePage = lazy(() => import('./Pages/ProfilePage'))

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<h1>loading...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createpost" element={<CreatePostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
