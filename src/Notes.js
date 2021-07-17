import axios from 'axios'
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import RemoveNote from './RemoveNote'
import EditNotes from './EditNotes'
import './style.css'


const Notes = (props) => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [data, setData] = useState([])
    console.log(data)

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


    const handleChange = (e) => {
        if (e.target.name == "title") {
            setTitle(e.target.value)
        } else if (e.target.name == "body") {
            setBody(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: title,
            body: body
        }
        axios.post('http://dct-user-auth.herokuapp.com/api/notes', formData, {
            headers: {
                "x-auth": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                const x = [result, ...data]
                setData(x)
                if (result.hasOwnProperty('error')) {
                    alert(result.message)
                } else {
                    swal('successfully saved')
                }
            })
            .catch((err) => {
                swal(err.message)
            })
        setTitle('')
        setBody('')
    }


    const handleUpdateDelete = (result) => {
        console.log(result)
        const filteredData = data.filter((note) => {
            return note._id != result._id
        })
        setData(filteredData)
    }

    const handleDataShow = (note) => {
        swal(note.body)
    }

    return (
        <div class="row" >
            <div class="col-sm-8">  <h1 >Notes - {data.length}</h1>
                {data.length > 0 ?
                    data.map((note) => {
                        return (
                            <div key={note._id}>
                                <p style={{ cursor: "pointer" }} onClick={() => handleDataShow(note)}>{note.title}</p>
                                <EditNotes id={note._id} />
                                <RemoveNote id={note._id} handleUpdateDelete={handleUpdateDelete} />
                                <hr />
                            </div>
                        )
                    }) : <h3>'No notes found add your first notes'</h3>} </div>
            <div class="col-sm-4" class="form-group" id="formStyle">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <h2 style={{ "text-align": "center" }}>Add Note</h2>
                        <input type="text" placeholder="title" value={title} onChange={handleChange} name="title" class="form-control" /><br />
                        <textarea type="text" placeholder="body" value={body} onChange={handleChange} name="body" class="form-control" /><br />
                        <input type="submit" value="save" class="btn btn-primary" />
                    </div>
                </form>
            </div>


        </div>
    )
}
export default Notes
