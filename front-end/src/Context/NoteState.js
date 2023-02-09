import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const [notes, setNotes] = useState([]);
    const host = "http://localhost:8080/api/note";

    const allNotes = async () => {
        const response = await fetch(`${host}/getallnotes`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const result = await response.json();
        setNotes(result)
    }


    const addNote = async (addstate) => {
        const response = await fetch(`${host}/addnote`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },

            body: JSON.stringify(addstate)
        });
        const result = await response.json();
        if (result) {
            console.log(result)
            setNotes([...notes, result])

        }


    }

    const deleteNote = async(id)=>{
        const response=await fetch(`${host}/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token")
            }
        });
        const result=await response.json();
        if(result){
            setNotes(notes.filter((note)=>{
                return note._id!==id;
            }))
        }
    }
    const doSearch=async(val)=>{
        const response=await fetch(`${host}/search/${val}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token")
            }
        });
        const result=await response.json();
        if(result){
            setNotes(result)
        }
    }

    const updateNote=async(note)=>{
        const response =await fetch(`${host}/updatenote/${note.id}`,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token")
            },
            body:JSON.stringify({title:note.title,description:note.description,tag:note.tag})
        });
        const result=await response.json();
        console.log(result)
        let newnotes=JSON.parse(JSON.stringify(notes))
        console.log(newnotes)
        if(result){
            for(let note of newnotes){
                if(result._id===note._id){
                    note.title=result.title;
                    note.description=result.description;
                    note.tag=result.tag;
                    break;
                }
           
               
            }
            setNotes(newnotes);
        }
    }

    return (
        <NoteContext.Provider value={{ addNote, allNotes, notes, deleteNote ,updateNote,doSearch}}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;