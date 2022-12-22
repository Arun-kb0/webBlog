import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import { useSelector, useDispatch } from 'react-redux'
import { clearLoginUser } from '../features/login/loginSlice'


function Navbar() {

  const { isAuth } = useSelector((store) => {
    return store.login
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear()
        dispatch(clearLoginUser())
        navigate("/login")

      })
  }

  return (
    <nav className='flex justify-center bg-gray-900 p-2' >
      <Link to="/"><span className='navlink'>Home</span></Link>
      {
        isAuth ?
        <div>

          <Link to="/createpost"><span className='navlink'>Create post</span> </Link>
          <button onClick={signUserOut}
          > <span className='navlink' >Logout</span></button>
        </div>

          :
          <Link to="/login" ><span className='navlink'>Login</span> </Link>

      }
    </nav>
  )
}

export default Navbar