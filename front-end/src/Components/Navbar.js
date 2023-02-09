import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import noteContext from '../Context/NoteContext';

const Navbar = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const context=useContext(noteContext);
  const {doSearch,allNotes}=context;
  const authorized=localStorage.getItem("token")
  const logOut=()=>{
    localStorage.removeItem("token");
    navigate("/signup")
  };


  const handleSearch=(e)=>{
    if(e.target.value===""){
allNotes();
    }else{
      doSearch(e.target.value);

    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {
            authorized?
            <>
          
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname=="/"?"active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          
         <li className="nav-item">
           <Link onClick={logOut} className={`nav-link ${location.pathname=="/signup"?"active":""}`} aria-current="page" to="/signup">Logout</Link>
         </li>

         </>:
         <>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname=="/login"?"active":""}`} to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname=="/signup"?"active":""}`} to="/signup">Signup</Link>
          </li>
         </>
          }
          
         
        
        </ul>
        <form className="d-flex">
          <input onChange={handleSearch} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        </form>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
