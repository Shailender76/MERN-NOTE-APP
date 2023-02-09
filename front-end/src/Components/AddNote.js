import React, { useContext, useState } from 'react'
import noteContext from '../Context/NoteContext';
import MyNotes from './MyNotes';

const AddNote = () => {
  const [addstate, setAddState] = useState({ title: "", description: "", tag: "" });
  const context=useContext(noteContext);
  const {addNote}=context;

  const onConvert = (e) => {
    setAddState({ ...addstate, [e.target.name]: e.target.value });
  }
  const handleAddNote = (e) => {
    e.preventDefault();
    // console.log(addnote);
    addNote(addstate)
    
    setAddState({ title: "", description: "", tag: "" })
  }
  return (
    <div className="container mt-4">
      <h1 className='mb-3'>Add your note</h1>
      <form onSubmit={handleAddNote}>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle1" className="form-label">Title</label>
          <input value={addstate.title} onChange={onConvert} name="title" type="text" className="form-control" id="exampleInputTitle1" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputDescription1" className="form-label">Description</label>
          <input value={addstate.description} onChange={onConvert} name="description" type="text" className="form-control" id="exampleInputDescription1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputTag" className="form-label">Tag</label>
          <input onChange={onConvert} value={addstate.tag} name="tag" type="text" className="form-control" id="exampleInputTag" />
        </div>
        <button type="submit" className="btn btn-primary">Add Note</button>
      </form>
      <MyNotes/>
    </div>
  )
}

export default AddNote
