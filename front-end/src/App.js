import './App.css';
import AddNote from './Components/AddNote';
import Navbar from './Components/Navbar';
import NoteState from './Context/NoteState';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <div >
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
        <Route exact path="/" element={<AddNote/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>


          </Routes>
          

        </Router>
      </NoteState>

    </div>
  );
}

export default App;
