const express=require('express');
const router=express.Router();
//Imports User schema whic is connected to DB in the index.js
const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs'); 




router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password','Password length must be greater tham 5!').isLength({min:5})
    //Validators using external 'express-validator' package
],async (req,res)=>{
    
    //If validation fails,give some response
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    try{

    //To check if any user with submitted email already exists in DB
    let user = await User.findOne({email:req.body.email});
    
    if(user){
        return res.status(400).json({error : "A user with this email id already exists!"})
    }

    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password, salt);


    //User.create() creates an entry with UserSchema directly in the DB, under 'users' collection
    user = await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email
    })
    
    //Some response to be sent after succesfull creation
    res.json({"status":"User created succesfully!"});
    // res.json(user);
}
catch(error){
    console.log(error);
    res.status(500).send("Some error occurred!");
}



//OTHER less efficient methods used :
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    //     res.json({
    //         error:"Please enter unique email!"
    // })})

    // console.log(req.body);
    //  const user=User(req.body);
    //  user.save();
    
})

module.exports=router;