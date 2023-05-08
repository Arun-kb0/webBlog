import './App.css'
import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navigation from './Pages/Navigation'
import SearchPage from './Pages/SearchPage'
import Inbox from './Components/inbox/Inbox'

const HomePage = lazy(() => import("./Pages/HomePage"))
const CreatePostPage = lazy(() => import("./Pages/CreatePostPage"))
const LoginPage = lazy(() => import("./Pages/LoginPage"))
const SignUpPage = lazy(() => import('./Pages/SignUpPage'))
const ProfilePage = lazy(() => import('./Pages/ProfilePage'))
const ViewHashtagsPage = lazy(() => import('./Pages/ViewHashtagsPage'))


import { onAuthStateChanged } from './imports/firebaseFunctions'
import { auth } from './firebase-config'
import { useDispatch } from 'react-redux'
import { setUser } from './features/redux/firebase/auth/authAction'
import AddUsersPage from './Pages/AddUsersPage'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
         dispatch(setUser(user))
    })
    return () => {
      unSub()
    }
  }, [])


  // !fix needed
  // const Fallback = ()=>{

  //   const location = useLocation()
  //   let FallbackComponent =null

  //   switch (location.pathname) {
  //     case '/':
  //       FallbackComponent = <HomePageLoad />
  //       return FallbackComponent
  //     case '/profile':
  //       FallbackComponent = <div> loading createpost .....</div>
  //       return FallbackComponent
  //   }
  // }

  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<div></div>} >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/createpost" element={<CreatePostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/hashtags" element={<ViewHashtagsPage />} />
          <Route path="/addfollowers" element={<AddUsersPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/chat" element={<Inbox />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}




export default App
