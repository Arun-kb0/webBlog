import React,{useState} from 'react'
import Navbar from '../Components/Navbar'
import SideBar from '../Components/SideBar'

function Navigation() {
    console.log("navigation")
    const [viewSideBar, setViewSideBar] = useState(false)
    const getViewSideBarBit = (bit)=>{
        setViewSideBar(bit)
    }

    console.log("viewSideBar "+viewSideBar)
  return (
    <div className='fixed w-full z-50'>
       { viewSideBar && <SideBar/>}
        <Navbar getViewSideBarBit={getViewSideBarBit} />
    </div>
  )
}

export default Navigation