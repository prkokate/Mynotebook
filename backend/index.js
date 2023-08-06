const connectToMongo=require('./db');

connectToMongo();

const express=require('express');
const app=express();
const port=8000;

app.get('/',(req,res)=>{
    res.send("SUCCESS!");
})

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
})