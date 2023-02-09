import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

const Signup = () => {

    const [credentials,setCredentials]=useState({name:"",email:"",password:""});
    const navigate=useNavigate();
    const onConvert=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
if(localStorage.getItem("token")){
  navigate("/")
}
    },[])

    const handleSignup=async(e)=>{
      e.preventDefault();
    const response=await fetch(`http://localhost:8080/api/user/signup`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
    });
    const result=await response.json();
    if(result){
        localStorage.setItem("token",result.auth);
        navigate("/")
    }
    }
  return (
    <div className="container mt-4">
      <h1 className='mb-3'>Create Your Account</h1>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label htmlFor="exampleInputname1" className="form-label">Name</label>
          <input value={credentials.name} onChange={onConvert} name="name" type="text" className="form-control" id="exampleInputname1" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputemail1" className="form-label">Email</label>
          <input value={credentials.email} onChange={onConvert} name="email" type="email" className="form-control" id="exampleInputemail1" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputpassword1" className="form-label">Password</label>
          <input value={credentials.password} onChange={onConvert} name="password" type="password" className="form-control" id="exampleInputpassword1" aria-describedby="emailHelp" />

        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
     
    </div>
  )
}

export default Signup
