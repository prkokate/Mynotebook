
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


function App() {

  const [alrt,setalrt]=useState({msg:"",type:"primary",disp:"none"})

  const giveAlert=(msg,type)=>{
      setalrt({msg:msg,type:type,disp:"block"})

      setTimeout(()=>{
        setalrt({msg:"",type:"primary",disp:"none"});
      },3000);
    
  }

  return (
    <>
    <NoteState>
    <Router>
    <Navbar Alert={giveAlert} />
    <Alert  alert={alrt} />
    <br /><br /><br />
      <Routes>

        <Route exact path="/home" element={<Home Alert={giveAlert} />} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Login Alert={giveAlert} />} />
        <Route exact path="/signup" element={<SignUp Alert={giveAlert} />} />
            

      </Routes>
    </Router>
    </NoteState>
   
    
    </>
  );
}

export default App;
