import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import EditText from './EditText';

export default function Notes(props) {
   const {Alert}=props;
    const {notes,fetchNotes}=useContext(noteContext);
    const ref=useRef(null);
    //const [noteId,setNoteid]=useState("");
    const [enote,setNotenote]=useState({_id:"",title:"",description:"",tag:""});

    const update=(note)=>{
      setNotenote(note);
      console.log(enote);
      ref.current.click();
      // editnote(note._id,note.title,note.description,note.tag);
    }
    
    useEffect(()=>{
      fetchNotes();
    },[]);

  return (

      <>
      <EditText referencee={ref} Enote={enote} />
      <Addnote/>
      <div className="container">
        {notes.length===0 && "You have no notes yet!"}
      </div>
      <div className="row my-3">
     {
        notes.map((note)=>{
            return <Noteitem key={note._id} note={note} update={update} Alert={Alert} />
        })
     }
  </div>
  </>
  )
}
