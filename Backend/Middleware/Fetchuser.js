require('dotenv').config();
const jwt=require("jsonwebtoken");

const verifyToken=(req,res,next)=>{
    const token=req.header("auth-token");
    if(!token){
        return res.status(401).send("Not allowed")
    }else{
        const identity=jwt.verify(token,process.env.REACT_APP_SECRET_KEY);
// console.log(identity);
        if(identity){
            req.user=identity.user;
            next();
        }else{
            res.status(403).send("Auth-token is not valid")
        }
    }
}

module.exports=verifyToken;