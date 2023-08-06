const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://prkokate10:Rajsheet1510@cluster0.xsshhjl.mongodb.net/test";

const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log('connected to mongoose!');
    })
   
}

module.exports = connectToMongo;