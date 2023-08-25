import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';

export default function EditText(props) {

  const {Enote}=props;
  const [enote,setenote]=useState({etitle:Enote.title,edescription:Enote.description,etag:Enote.tag});
    
  const {editnote}=useContext(noteContext);

  const handlechange=(e)=>{

      setenote({...enote, [e.target.name]:e.target.value})
  }

  const updateNote=(e)=>{
    e.preventDefault();
    editnote(Enote._id,enote.etitle,enote.edescription,enote.etag);
  }

  return (
<>

<button style={{display:"none"}} ref={props.referencee} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form  className="my-3">
      <div className="modal-body">
        
      <div className="mb-3 row">
      <label htmlFor="etitle" className="col-sm-2 col-form-label">Title</label>
      <div className="col-sm-10">
      <input type="text" onChange={handlechange} className="form-control"  name="etitle" id="etitle " value={enote.etitle} placeholder="Enter note title"/>
      </div>
        </div>
        <div className="mb-3 row">
      <label htmlFor="edescription" className="col-sm-2 col-form-label">Description</label>
      <div className="col-sm-10">
        <input type="text" onChange={handlechange} className="form-control" placeholder='write your note here' name="edescription" id="edescription"/>
      </div>
        </div>
        <div className="mb-3 row">
      <label htmlFor="etag" className="col-sm-2 col-form-label">Tag</label>
      <div className="col-sm-10">
        <input type="text" onChange={handlechange} placeholder='Add a tag' className="form-control" name="etag" id="etag"/>
      </div>
        </div>
  
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateNote}>Save changes</button>
      </div>
    </form>
    </div>
  </div>
</div>
</>
  )
}
