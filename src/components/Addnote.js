import React, { useState ,useContext} from 'react'
import noteContext from '../context/notes/noteContext';

export default function Addnote(props) {

    const {Alert}=props;
    const [note,setnote]=useState({title:"",description:"",tag:""});
    
    const {addnote}=useContext(noteContext);

    const handlechange=(e)=>{

        setnote({...note, [e.target.name]:e.target.value})
    }

    const newNote=(e)=>{
      e.preventDefault();
      addnote(note);
      Alert("Note added succesfully","success");
      setnote({title:"",description:"",tag:""});
    }

  return (
    <div className='container'> <br />
    <h1>Add a note</h1>
    <form  className="my-3">
      <div className="mb-3 row">
      <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
      <div className="col-sm-10">
      <input type="text"required style={note.title.trim().length>=5?{background:"#A8DF8E"}:{background:"#ECCDB4"}} onChange={handlechange} className="form-control"  name="title" id="title" value={note.title} placeholder="Enter note title (Atleast 5 characters)"/>
      </div>
        </div>
        <div className="mb-3 row">
      <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
      <div className="col-sm-10">
        <input type="text" style={note.description.trim().length>=5?{background:"#A8DF8E"}:{background:"#ECCDB4"}}   onChange={handlechange} className="form-control" placeholder='write your note here (Atleast 5 characters)' name="description" id="description" value={note.description}/>
      </div>
        </div>
        <div className="mb-3 row">
      <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
      <div className="col-sm-10">
        <input  type="text" onChange={handlechange} placeholder='Add a tag' className="form-control" name="tag" id="tag" value={note.tag}/>
      </div>
        </div>
      
        <button  disabled={note.title.trim().length<5 || note.description.trim().length<5}  className='btn btn-primary' onClick={newNote} > Submit ✔</button>
    </form><br /><br /><br /><br />
  
  </div>
  )
}
