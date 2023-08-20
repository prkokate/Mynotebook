import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';

export default function Notes() {
    const {notes,addnote}=useContext(noteContext);
  return (

      <>
      <Addnote/>
      <div className="row my-3">
     {
        notes.map((note)=>{
            return <Noteitem key={note._id} note={note} />
        })
     }
  </div>
  </>
  )
}
