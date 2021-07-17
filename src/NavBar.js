import React, { useState } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Account from './Account'
import Notes from './Notes'
import './style.css'


const NavBar = (props) => {

    const { userLoggedIn, handleAuth } = props


    return (
        <div >
            <ul class="flex-container">
                <li class="nav-item"> <Link to="/" class="nav-link" aria-current="page">Home</Link></li>
                {userLoggedIn ? (
                    <>
                        <li class="nav-item"><Link to="/account" class="nav-link">Account</Link></li>
                        <li class="nav-item"><Link to="/notes" class="nav-link">My Notes</Link></li>
                        <li class="nav-item"><Link onClick={() => {
                            localStorage.removeItem('token')
                            alert("you are logged out now")
                            handleAuth()
                            props.history.push('/')
                        }} to={""} class="nav-link">Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li class="nav-item"><Link to="/register" class="nav-link">Register</Link></li>
                        <li class="nav-item"><Link to="/login" class="nav-link">Login</Link></li>
                    </>
                )}
            </ul>
            <Route path="/notes" component={Notes} />
            <Route path="/" component={Home} exact={true} />
            <Route path="/register" component={Register} />
            <Route path="/login" render={(props) => {
                return <Login
                    {...props}
                    handleAuth={handleAuth}
                />
            }} />
            <Route path={'/account'} component={Account} />
        </div>
    )
}

// const WrappedComponenet = withRouter(NavBar)

// export default WrappedComponenet

export default withRouter(NavBar)