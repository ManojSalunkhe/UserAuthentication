import {Formik , Form ,Field , ErrorMessage} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import swal from 'sweetalert'

const Login = (props) => {

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const formData = {
    //         email: email,
    //         password: password
    //     }

    //     axios.post('http://dct-user-auth.herokuapp.com/users/login', formData)
    //         .then((response) => {
    //             const result = response.data
    //             console.log(result)
    //             if (result.hasOwnProperty('errors')) {
    //                 //Object.keys(result).includes('errors') this similar to result.hasOwnProperty('errors')}
    //                 alert(result.errors)
    //             } else {
    //                 swal('you are now logged in')
    //                 localStorage.setItem('token', result.token)
    //                 props.history.push('/')
    //                 props.handleAuth()
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error.message)
    //         })
    // }


    // const handleChange = (e) => {
    //     if (e.target.name === 'email') {
    //         setEmail(e.target.value)
    //     } else if (e.target.name === 'password') {
    //         setPassword(e.target.value)
    //     }
    // }

    const submittionData = (formData)=>{
        axios.post('http://dct-user-auth.herokuapp.com/users/login', formData)
                .then((response) => {
                    const result = response.data
                    console.log(result)
                    if (result.hasOwnProperty('errors')) {
                        //Object.keys(result).includes('errors') this similar to result.hasOwnProperty('errors')}
                        alert(result.errors)
                    } else {
                        swal('you are now logged in')
                        localStorage.setItem('token', result.token)
                        props.history.push('/')
                        props.handleAuth()
                    }
                })
                .catch((error) => {
                    console.log(error.message)
                })
    }

    const validationSchema = yup.object({
        email : yup.string().required() ,
        password : yup.string().required().min(6)
    })

    return (
        <div>
            <h2>LogIn</h2>
            <Formik 
            initialValues = {{
                email : '',
                password : ''
            }}
            
            validationSchema = {validationSchema}
            onSubmit = {(data,{resetForm})=>{
                submittionData(data)
                resetForm()
            }}
            >
                {
                    ({values,errors})=>(
                        <div>
                            <Form>
                            <Field name= "email" type="email"   placeholder="Enter email"  />
                <ErrorMessage name="email">{(msg)=><div style={{color : 'red'}}>{msg}</div>}</ErrorMessage>
                <Field name="password" type="password"   placeholder="password" />
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
                /><br />

                <input type="submit" />
            </form> */}

        </div>
    )
}
export default Login