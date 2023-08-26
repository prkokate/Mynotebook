import React,{useEffect} from 'react'
import {Link,useLocation, useNavigate} from "react-router-dom";
import Alert from './Alert';
  

export default function Navbar(props) {
   const {Alert}=props;
    let location = useLocation();
    const navigateTo=useNavigate();
    // useEffect(() => {
    //     console.log(location.pathname)
    //   }, [location]);

    const handleLogout=()=>{
       localStorage.removeItem('token');
       navigateTo('/');
       Alert("You have been logged out!","danger")
    }
  return (
    <nav style={{position:"fixed",width:"100%"}} className="navbar navbar-expand-lg  navbar-dark bg-dark">
  <div  className="container-fluid">
    <Link className="navbar-brand" to="/home">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/home'?"active" :""}`} aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active" :""}`} to="/about">About Us</Link>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" to="/">Action</a></li>
            <li><a className="dropdown-item" to="/">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" to="/">Something else here</a></li>
          </ul>
        </li> */}
        {/* <li className="nav-item">
          <a className="nav-link disabled" to='/' aria-disabled="true">Disabled</a>
        </li> */}
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link className='btn btn-primary mx-2' to="/login" >Login</Link>
        <Link className='btn btn-primary mx-2' to="/signup" >Sign up</Link>
      </form> : <button onClick={handleLogout} className='btn btn-danger mx-3'>Logout</button>}
    </div>
  </div>
</nav>
  )
}
