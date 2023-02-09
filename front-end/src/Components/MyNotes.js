import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../Context/NoteContext'
import NoteItem from './NoteItem';

const MyNotes = () => {
  const context = useContext(noteContext);
  const navigate=useNavigate();
  const openModal = useRef(null);
  const closeModal = useRef(null);
  const { notes, allNotes, updateNote } = context;
  const [update, setUpdate] = useState({ title: "", description: "", tag: "", id: "" });

  const onConvert = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  }

  const updation = (note) => {
    setUpdate({ title: note.title, description: note.description, tag: note.tag, id: note._id })
    openModal.current.click()

  }

  const handleUpdateNote = () => {
    updateNote(update);
    closeModal.current.click();
  }
  useEffect(() => {
    if(localStorage.getItem("token")){
      allNotes()

    }else{
      navigate("/signup")
    }
  }, [])
  return (
    <div className='container my-3'>
      <h1>Your Notes</h1>
      <div className="row">
        {notes.map((note, i) => {
          return <NoteItem updation={updation} key={i} index={i} note={note} />
        })}
      </div>

      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary" style={{ display: "none" }} ref={openModal} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-3">
                  <label htmlFor="exampleInputTitle1" className="form-label">Title</label>
                  <input value={update.title} onChange={onConvert} name="title" type="text" className="form-control" id="exampleInputTitle1" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputDescription1" className="form-label">Description</label>
                  <input value={update.description} onChange={onConvert} name="description" type="text" className="form-control" id="exampleInputDescription1" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputTag" className="form-label">Tag</label>
                  <input onChange={onConvert} value={update.tag} name="tag" type="text" className="form-control" id="exampleInputTag" />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={closeModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleUpdateNote} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyNotes
