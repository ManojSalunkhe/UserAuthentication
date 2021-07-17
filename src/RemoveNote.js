import React, { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
/* eslint-disable */



const RemoveNotes = (props) => {

    const { handleUpdateDelete, id } = props

    const handleRemove = () => {
        // console.log(id)
        axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
            headers: {
                "x-auth": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                handleUpdateDelete(result)
            })
    }




    return (
        <div>
            <button onClick={() => swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        handleRemove()
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                })
            } class="btn btn-danger">remove</button>
        </div>
    )
}

export default RemoveNotes