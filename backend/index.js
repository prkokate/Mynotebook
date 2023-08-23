const connectToMongo=require('./db');

connectToMongo();

var cors=require('cors');
const express=require('express');
const app=express();
const port=8000;
app.use(cors());
app.use(express.json());

// app.get('/',(req,res)=>{
//     res.send("SUCCESS!");
// })
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
})