import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
<nav className='flex justify-center bg-sky-900 ' >
    <Link to="/" className='navlink'>Home</Link>
    <Link to="/createpost" className='navlink'>Create post</Link>
    <Link to="/login" className='navlink'>Login</Link>
</nav>
  )
}

export default Navbar