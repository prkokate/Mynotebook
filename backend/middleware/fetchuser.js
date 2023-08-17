const jwt = require('jsonwebtoken')
const JWT_SECRET="Pr@tham";

const fetchuser=(req,res,next)=>{
    //Get the user from the jwt Token and add id to req object
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Access denied!"})

    }
    try{

        const data=jwt.verify(token, JWT_SECRET);
        //VERIFY GENERATED TOKEN!
        //.verify() generates an error if tokrn not matched, this is handled in catch block
        req.user=data.user;
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).send({error:"Access deniedd"})
    }

}


module.exports=fetchuser