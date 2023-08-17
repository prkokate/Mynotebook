const express=require('express');
const router=express.Router();

const User=require('../models/User'); //Imports User schema which is connected to DB in the index.js
const {body,validationResult}=require('express-validator'); //npm i express-validator
const bcrypt=require('bcryptjs'); //npm install bcryptjs  ==> used for PASSWORD HASHING
const jwt = require('jsonwebtoken')//npm install jsonwebtoken


const JWT_SECRET="Pr@tham"; //Secret Token only known to us. Used to verify and validate requests. 
//When a user creates an unique new account, he is assigned a token with 3 parts, 3rd part being the JWT_SECRET
//The server saves the Secret token in form of its hash key. On login, a token is generated with user Id AND
//the secret token. The generated token is verified with the secret,if it matches => acces granted!

const fetchuser=require('../middleware/fetchuser'); //Middleware function
//This function is used (here) to verify the token and give TRUE response to 'get-user-data' method




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

    //FUNCTIONS USED FOR PASSWORD HASHING!
    const salt= await bcrypt.genSalt(10);
    //Salt is an extra secure string attached to OG password to increase security

    const secPass= await bcrypt.hash(req.body.password, salt);
    //hash() function generates a hash key to the OG password which is to be saved in the DB
    //instead of saving the orignal password.


    //User.create() creates an entry with UserSchema directly in the DB, under 'users' collection
    user = await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email
    })

    const data={
        user:{
            id:user.id
        }
    }

    const jwtData=jwt.sign(data, JWT_SECRET);
    console.log(jwtData);
    
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




//Route 2 : To verify and login user
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Please enter a valid password').exists()
    //Validators using external 'express-validator' package
],async (req,res)=>{
    
    //If validation fails,give some response
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    try{

    const {email,password}=req.body; // Submitted email and password

    let user= await User.findOne({email});

    if(!user){
        return res.status(400).json({error : `No user with email Id '${email}' exists!`});
    }

   // .compare() generates a hash key for submitted password and compares 
   //it with the hash key (of paswword of that user) stored in the DB.
   let passwordCompare=await bcrypt.compare(password,user.password); //returns true or false
   
   if(!passwordCompare){
    return res.status(400).json({error : `Please login with correct credentials`});
   }

   const data={
    user:{
        id : user.id
    }
   }

   const authtoken=jwt.sign(data, JWT_SECRET);
   res.json({Token:authtoken});
   
}
catch(error){
    console.log(error);
    res.status(400).send("Some error occurred!, Please try again");
}

})


//Route 3 : Get Details of logged in user using POST "api/auth/getuser". Login required.
router.post('/getuser', fetchuser, async(req,res)=>{
   try {
    //req.user is defined first in 'fetchuserjs'
    userId=req.user.id
    const user=await User.findById(userId).select('-password') // '-password' means : fetch everything except password
    res.send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error")
    }
})


module.exports=router;