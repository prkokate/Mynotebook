import NoteContext from "./noteContext";
 import { useState } from "react";


const NoteState=(props)=>{
   
    const host="http://localhost:8000"
    const token=localStorage.getItem('token');

     
    const noteInitial =[]

    const [notes,setnotes]=useState(noteInitial);
    const [enote,setenote]=useState({id:"",etitle:"",edescription:"",etag:""});

    const fetchNotes = async()=>{
        const response =await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers:{
                'Content-Type' :'application/json',
                'auth-token': token
            }
        })
        const json =await response.json();
        setnotes(json);
        
    }

    const addnote= async({title,description,tag})=>{
      

          const response =await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers:{
                'Content-Type' :'application/json',
                'auth-token': token
            },
            body : JSON.stringify({title,description,tag})
        })
        const json = await response.json();
        const note=json;

         setnotes(notes.concat(note));
    }

    const deletenote= async(id)=>{
        //console.log("Note deleted with id "+id);
        const response =await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type' :'application/json',
                'auth-token': token
            }
        })
        const json =await response.json();
      const newNote=notes.filter((note)=>{return note._id!==id});
      setnotes(newNote);
    }

    const editnote= async (id,title,description,tag)=>{
        const response =await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type' :'application/json',
                'auth-token': token
            },
            body : JSON.stringify({title,description,tag})
        })
        const json=await response.json();
       
        
        const newNotes=notes;
         newNotes.forEach((note)=>{
            if(note._id===id){
                setenote({id:note._id,etitle:title,edescription:description,etag:tag});
               // note._id=id;
                note.title=title;
                note.description=description; 
                console.log("Edited title : ", note.title);
                return;
            }
        })
        setnotes(newNotes);
     
       


    }
    return(
        <NoteContext.Provider value={{notes,addnote,deletenote,editnote,fetchNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;