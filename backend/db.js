require("dotenv").config()
const mongoose = require('mongoose');

const MongoUri=process.env.MONGO_URI;

const connectToMongo=()=>{
    mongoose.connect(MongoUri).then(()=>{
        console.log('connected to mongoose!');
    })
   
}

module.exports = connectToMongo;