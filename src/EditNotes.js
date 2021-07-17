import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

const EditNotes = (props) => {

    const { id } = props
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        axios.get('http://dct-user-auth.herokuapp.com/api/notes', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                setData(result)
            })
    }, [data])

    const handleEditChange = (e) => {
        if (e.target.name === 'title') {
            const result = e.target.value
            setTitle(result)
        } else if (e.target.name === 'body') {
            const result = e.target.value
            setBody(result)
        }
    }

    const handleEdit = (id) => {
        const result = data.filter((note) => {
            return note._id == id
        })
        setTitle(result[0].title)
        setBody(result[0].body)
        setFlag(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: title,
            body: body
        }
        axios.put(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, formData, {
            headers: {
                "x-auth": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                setData(result)
                if (result.hasOwnProperty('error')) {
                    alert(result.message)
                } else {
                    swal('successfully saved')
                }
            })
            .catch((err) => {
                swal(err.message)
            })
        setFlag(false)
    }

    const handleStatus = () => {
        setFlag(false)
    }


    return (
        <div >

            {flag ? (
                <form onSubmit={handleSubmit} >
                    <input type="text" placeholder="enter title" value={title} onChange={handleEditChange} name="title" /><br />
                    <textarea type="text" placeholder="body" value={body} onChange={handleEditChange} name="body" /><br />
                    <button onClick={handleStatus} class="btn btn-danger">cancel</button>
                    <input type="submit" value="save" class="btn btn-primary" />
                </form>
            )
                : (

                    <button onClick={() => handleEdit(id)} class="btn btn-dark" >Edit</button>
                )
            }
        </div>

    )
}
export default EditNotes