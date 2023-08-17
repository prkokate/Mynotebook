const express=require('express');
const fetchuser = require('../middleware/fetchuser');
const router=express.Router();
const {body,validationResult}=require('express-validator'); //npm i express-validator
const Notes=require('../models/Notes')


//Route 1 : Get all notes using GET api/notes/fetchallnotes
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
     const notes=await Notes.find({user : req.user.id});
     res.json(notes);
    }
     catch(error){
        res.send(400).json({error:'internal server error'});
     }
})


//Route 2 : Add a new note using POST api/notes/addnote
router.post('/addnote',fetchuser, [
    body('title','Enter a valid title').isLength({min :3}),
    body('description','Content should have atleast 5 characters!').isLength({min:5})
], async (req,res)=>{
   
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

   try {
    const {title,description,tag}=req.body;

    const note =  new Notes({
        title, description,tag, user:req.user.id
    })

    const savedNote= await note.save();
    res.json(savedNote);
}
catch(error){
    console.log(error);
    res.status(400).json({error:'Internal server errorr'})
}
})



//Route 3 : Update an existing note using PUT api/notes/updatenote
//we usually use PUT method for updation
router.put('/updatenote/:id',fetchuser, [
    body('title','Enter a valid title').isLength({min :3}),
    body('description','Content should have atleast 5 characters!').isLength({min:5})
], async (req,res)=>{
   
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

   try {
    const {title,description,tag}=req.body;
     
    //Create a new note object
    const Newnote={};
    if(title){Newnote.title=title}
    if(description){Newnote.description=description}
    if(tag){Newnote.tag=tag}

    //Find
    const note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).json({error :"unauthorized access attempt!"})
    }

    const notes= await Notes.findByIdAndUpdate(req.params.id, {$set:Newnote},{new :true});
    res.json(notes);
     
  
}
catch(error){
    console.log(error);
    res.status(400).json({error:'Internal server errorr'})
}
})


//Route 3 : Delete an existing note using DELETE api/notes/deletenote
//we usually use DELETE method for deletion
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
   

   try {
    const {title,description,tag}=req.body;
     
    //Create a new note object
    const Newnote={};
    if(title){Newnote.title=title}
    if(description){Newnote.description=description}
    if(tag){Newnote.tag=tag}

    //Find note to be deleted
    const note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).json({error :"unauthorized access attempt!"})
    }

    const notes= await Notes.findByIdAndDelete(req.params.id, {$set:Newnote},{new :true});
    res.json({success : "Note deleted succesfully"});
     
  
}
catch(error){
    console.log("ERROR GIVEN : ",error);
    res.status(400).json({error:'Internal server errorr'})
}
})



module.exports=router;