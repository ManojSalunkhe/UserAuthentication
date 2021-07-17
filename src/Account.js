import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Account = (props) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get('http://dct-user-auth.herokuapp.com/users/account', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                setUser(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <h2>User Account</h2>
            <p>Email - {user.email}</p>
            <p>Username - {user.username}</p>
        </div>
    )
}

export default Account