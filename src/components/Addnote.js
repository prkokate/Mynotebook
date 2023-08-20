import React, { useState ,useContext} from 'react'
import noteContext from '../context/notes/noteContext';

export default function Addnote() {

    const [note,setnote]=useState({title:"",description:"",tag:"general"});
    
    const {addnote}=useContext(noteContext);

    const handlechange=(e)=>{

        setnote({...note, [e.target.name]:e.target.value})
    }

    const newNote=(e)=>{
      e.preventDefault();
      addnote(note);
    }

  return (
    <div className='container'> <br />
    <h1>Add a note</h1>
    <form  className="my-3">
      <div className="mb-3 row">
      <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
      <div className="col-sm-10">
      <input type="text" onChange={handlechange} className="form-control"  name="title" id="title " placeholder="Enter note title"/>
      </div>
        </div>
        <div className="mb-3 row">
      <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
      <div className="col-sm-10">
        <input type="text" onChange={handlechange} className="form-control" name="description" id="description"/>
      </div>
        </div>
      
        <button className='btn btn-primary' onClick={newNote} > Submit ✔</button>
    </form><br /><br /><br /><br />
  
  </div>
  )
}
