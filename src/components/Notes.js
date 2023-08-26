import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import EditText from './EditText';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
   const navigator=useNavigate();
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
      if(localStorage.getItem('token')){
        
        fetchNotes();
      }
      else{
           navigator('/login');
           Alert("Login to veiw notes","warning");
      }
    },[]);

  return (

      <>
      <EditText referencee={ref} Enote={enote} Alert={Alert}  />
      <Addnote Alert={Alert} />
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
