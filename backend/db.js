const mongoose = require('mongoose');
const mongoURI = "";
//Add mongodb string while deploying

const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log('connected to mongoose!');
    })
   
}

module.exports = connectToMongo;
