const mongoose=require("mongoose");

const connectToMongo=()=>{
    mongoose.connect("mongodb://localhost:27017/note-3",()=>{
        console.log("Connect to mongo successfully")
    })
}

module.exports=connectToMongo;