import NoteContext from "./noteContext";
 import { useState } from "react";


const NoteState=(props)=>{

    const noteInitial =[
        {
            "_id": "64de13dabb21f2625e9517eda6"
            ,
            "user":  "64d60a5518fbd9f6d67245e9"
            ,
            "title": "My first Note",
            "description": "I love to learn backend and React! yayyy",
            "tag": "My-Thoughts",
            "date":  "2023-08-17T13:16:27.253Z"
            ,
            "__v": 0
          },
          {
            "_id": "64de1dabb21f62557e9517eda6"
            ,
            "user":  "64d60a5518fbd9f6d67245e9"
            ,
            "title": "My first Note",
            "description": "I love to learn backend and React! yayyy",
            "tag": "My-Thoughts",
            "date":  "2023-08-17T13:16:27.253Z"
            ,
            "__v": 0
          },
          {
            "_id": "64de1dabb21f62578e9517eda6"
            ,
            "user":  "64d60a5518fbd9f6d67245e9"
            ,
            "title": "My first Note",
            "description": "I love to learn backend and React! yayyy",
            "tag": "My-Thoughts",
            "date":  "2023-08-17T13:16:27.253Z"
            ,
            "__v": 0
          }
         
    ]

    const [notes,setnotes]=useState(noteInitial);

    const addnote=({title,description,tag})=>{
        const note={
            "_id": "64de1dabb21f698215e95e17eda6"
            ,
            "user":  "64d60a5518fbd9f6d67245e9"
            ,
            "title": title,
            "description": description,
            "tag": tag,
            "date":  "2023-08-17T13:16:27.253Z"
            ,
            "__v": 0
          }

          setnotes(notes.concat(note));
    }

    const deletenote=(id)=>{
        //console.log("Note deleted with id "+id);
      const newNote=notes.filter((note)=>{return note._id!==id});
      setnotes(newNote);
    }

    const editnote=(id,title,description)=>{
        //const newNote=notes.filter((note)=>{return note._id===id});
        notes.forEach((note)=>{
            if(note._id===id){
                note.title=title;
                note.description=description; 
            }
        })

        console.log("Edited note");



    }
    return(
        <NoteContext.Provider value={{notes,addnote,deletenote,editnote}} >
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;