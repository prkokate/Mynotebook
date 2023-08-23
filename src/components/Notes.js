import React, { useContext, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import EditText from './EditText';

export default function Notes() {
    const {notes,fetchNotes}=useContext(noteContext);
    const ref=useRef(null);

    const update=(note)=>{
      ref.current.click();

    }
    
    useEffect(()=>{
      fetchNotes();
    },[]);

  return (

      <>
      <EditText referencee={ref}  />
      <Addnote/>
      <div className="row my-3">
     {
        notes.map((note)=>{
            return <Noteitem key={note._id} note={note} update={update} />
        })
     }
  </div>
  </>
  )
}
