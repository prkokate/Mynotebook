import React ,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';


export default function Noteitem(props) {
   

    const {note,update,Alert}=props;
    const {deletenote}=useContext(noteContext);


  return (
    <>
   
    <div className='col-md-3'>
      <div className="card my-3" >
 
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <button className="btn btn-primary mx-3 my-4" onClick={()=>{update(note)}} >Edit</button><span>
    <button className='btn btn-danger mx-3 my-4' onClick={()=>{deletenote(note._id); Alert("Note Deleted!","danger")}} >Delete</button>
    </span>
  </div>
</div>
</div>
</>

  )
}
