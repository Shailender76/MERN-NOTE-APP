import React, { useContext } from 'react'
import noteContext from '../Context/NoteContext'

const NoteItem = (props) => {
    const context=useContext(noteContext);
    const {deleteNote}=context;
    const handleDelete = (id) => {
        deleteNote(id)
    }
    return (
        <div className="col-4 my-3">
            <div className="card" >
                <div className="card-body">
                    <h3>Note-{props.index + 1}</h3>
                    <h5 className="card-title mb-4">{props.note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.note.tag}</h6>
                    <p className="card-text">{props.note.description}.</p>
                    <button onClick={()=>{props.updation(props.note)}} className="btn btn-primary mx-2">Update</button>
                    <button onClick={() => { handleDelete(props.note._id) }} className="btn btn-danger ">Delete</button>
                </div>
            </div>
        </div>

    )
}

export default NoteItem
