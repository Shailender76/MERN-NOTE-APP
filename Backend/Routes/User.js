const express=require("express");
const router=express.Router();
const User=require("../Models/users");
const {validationResult,body}=require("express-validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require('dotenv').config();
const verifyToken=require("../Middleware/Fetchuser")

// API FOR SIGNUP
router.post("/signup",[
    body("name","Enter valid name").isLength({min:3}),
    body("email","Enter valid email").isEmail(),
    body("password","Enter Atleast 6 character password").isLength({min:6})
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    let  user= await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"User already exist"})
    }
const salt=await bcrypt.genSalt(10);
const secPass=await bcrypt.hash(req.body.password,salt);
    user=new User({
        name:req.body.name,
        email:req.body.email,
        password:secPass
        
    })

   user= await user.save();
   const data={user:user.id};
//    console.log(data)
// console.log(process.env.REACT_APP_SECRET_KEY)
const auth=jwt.sign(data,process.env.REACT_APP_SECRET_KEY);

   if(user){
    res.status(200).json({user,auth});
   }else{
    res.status(500).send("Internal server error")
   }
});


// API FOR LOGIN
router.post("/login",[
    body("email","Enter a valid email").isEmail(),
    body("password","Enter a valid password").isLength({min:6})

],async(req,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
};

let user=await User.findOne({email:req.body.email});
if(!user){
    return res.status(400).json({error:"User does not exist"});
}

const check=await bcrypt.compare(req.body.password,user.password);
if(!check){
    return res.status(400).json({error:"Invalid Credentials"})
};
const data={user:user.id};
const auth=jwt.sign(data,process.env.REACT_APP_SECRET_KEY)
if(user){
    res.status(200).json({user,auth})
}else{
    res.status(500).send("Internal server error")
}
})
  

// API FOR GETTING USER DETAIL
router.get("/getuser",verifyToken,async(req,res)=>{
let user=await User.findById(req.user);
if(user){
    res.status(200).json(user)
}else{
    res.status(500).send("Internal server error")
}
})


module.exports=router