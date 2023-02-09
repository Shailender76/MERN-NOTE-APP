const mongoose=require("mongoose");
const {Schema}=mongoose;

const noteSchema=new Schema({
    title:{type:String,required:true },
    description:{ type:String,required:true},
    tag:{type:String,required:true},
    user:{type: Schema.Types.ObjectId, ref: 'user'}
});

const Note=mongoose.model("note",noteSchema);
module.exports=Note;
