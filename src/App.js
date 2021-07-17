import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import './style.css'

const App = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleAuth()
    }
  }, [])

  return (
    <div className="container" >
      <h1 class="heading" >User-Auth</h1>
      <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} />
    </div>
  )
}

export default App