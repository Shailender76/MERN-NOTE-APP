const express=require("express");
const app=express();
const cors=require("cors");
const mongoConnection=require("./Db");
const PORT=8080;
mongoConnection();

//Middleware
app.use(cors());
app.use(express.json());

//Middleware
app.use("/api/user",require("./Routes/User"));
app.use("/api/note",require("./Routes/Notes"));

// app.get("/",(req,res)=>{
//     res.send("Hello World backend")
// })


app.listen(PORT,()=>{
    console.log(`App started successfully on port ${PORT}`)
});