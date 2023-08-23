import NoteContext from "./noteContext";
 import { useState } from "react";


const NoteState=(props)=>{
   
    const host="http://localhost:8000"
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkNjBhNTUxOGZiZDlmNmQ2NzI0NWU5In0sImlhdCI6MTY5MjYyNTg1OX0.yO0Zeh5m1cI_VUoppzllea6s0MDb_yXdl8VjToiSlrU";

     
    const noteInitial =[]

    const [notes,setnotes]=useState(noteInitial);

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
        console.log(json);
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
        console.log("Add :",json )
        const note={
            "_id": json._id
            ,
            "user":  json.user
            ,
            "title": json.title,
            "description": json.description,
            "tag": json.tag,
            "date":  json.date
            ,
            "__v": 0
          }

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

    const editnote= async (id,title,description)=>{
        const response =await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'POST',
            headers:{
                'Content-Type' :'application/json',
                'auth-token': token
            },
            body : JSON.stringify({title,description})
        })
        const json=await response.json();
       // console.log(json)

        
        const newNotes=notes;
         newNotes.forEach((note)=>{
            console.log(note._id)
            if(note._id===id){
              
                note._id=id;
                note.title=title;
                console.log( note.title);
                note.description=description; 
            }
        })
        setnotes(newNotes);
        notes.forEach((note)=>{
            console.log(note.title);
        });
       // console.log("Edited note");



    }
    return(
        <NoteContext.Provider value={{notes,addnote,deletenote,editnote,fetchNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;