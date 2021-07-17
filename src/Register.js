import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Formik , Form ,Field , ErrorMessage} from 'formik'
import * as yup from 'yup'


const Register = (props) => {

    // const [username, setUsername] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')



    // const handleSubmit = (e) => {
    //     e.preventDefault()
        // const formData = {
        //     username: username,
        //     email: email,
        //     password: password
        // }

        // axios.post('http://dct-user-auth.herokuapp.com/users/register', formData)
        //     .then((response) => {
        //         const result = response.data
        //         if (result.hasOwnProperty('errors')) {
        //             alert(result.message)
        //         } else {
        //             alert('successfully registered')
        //             props.history.push('/login')
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
   // }

    // const handleChange = (e) => {
    //     if (e.target.name === 'username') {
    //         setUsername(e.target.value)
    //     } else if (e.target.name === 'email') {
    //         setEmail(e.target.value)
    //     } else if (e.target.name === 'password') {
    //         setPassword(e.target.value)
    //     }
    // }

    const submittionData = (formData)=>{
        
         axios.post('http://dct-user-auth.herokuapp.com/users/register', formData)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    alert('successfully registered')
                    props.history.push('/login')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const validationSchema = yup.object({
        username : yup.string().required(),
        email : yup.string().required(),
        password :yup.string().required().min(5)
    })
    return (
        <div>
            <h2>Register with Us</h2>
            <Formik
            initialValues = {{
                username : '',
                email : '',
                password : ''

            }}

            validationSchema = {validationSchema}

            onSubmit = {(data,{resetForm})=>{
                console.log(data)
                submittionData(data)
                resetForm()
            }}
            >
                {
                    ({values,errors})=>(
                        <div>
                            <Form>
                                <Field name="username" type="input" placeholder="enter username"/>
                                <ErrorMessage name="username">{(msg)=><div style={{color : 'red'}}>{msg}</div>}</ErrorMessage>
                                <Field name = "email" type="email" placeholder="enter email"/>
                                <ErrorMessage name="email">{(msg)=><div style={{color : 'red'}}>{msg}</div>}</ErrorMessage>
                                <Field name= "password" type="password" placeholder="enter password"/>
                                <ErrorMessage name="password">{(msg)=><div style={{color : 'red'}}>{msg}</div>}</ErrorMessage>
                                <Field type="submit" value="submit"/>
                            </Form>
                        </div>
                    )
                }
            </Formik>
            {/* <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="enter username"
                    value={username}
                    onChange={handleChange}
                    name="username"
                /><br />
                <input
                    type="text"
                    placeholder="enter email"
                    value={email}
                    onChange={handleChange}
                    name="email"
                /><br />
                <input
                    type="password"
                    placeholder="enter password"
                    value={password}
                    onChange={handleChange}
                    name="password"
                />

                <input type="submit" />
            </form> */}

        </div>
    )
}

export default Register