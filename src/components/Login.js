import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {


    const {Alert}=props;
    const [credentials,setcredentials]=useState({email:"",password:""});
    const [pass,setpass]=useState("password");
    // const [passText,setpassText]=useState("Hide Password");

    const history = useNavigate()
    
    const handlechange=(e)=>{

        setcredentials({...credentials, [e.target.name]:e.target.value})
    }

    const showPassword=(e)=>{
        e.preventDefault();
        if(pass==='password'){

            setpass("text")
        }
        else{
            setpass("password")
        }
    }

    const newLogin= async (e)=>{
        e.preventDefault();
       // const host="http://localhost:8000";
        const response = await fetch("http://localhost:8000/api/auth/login",{
            method: 'POST',
            headers:{
                'Content-Type' :'application/json'
                
            },
            body : JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json=await response.json();
        console.log(json);

        if(json.success){
            localStorage.setItem('token',json.Token);
            history('/home')
            Alert("Logged in successfully!","success")

        }
        else{
            Alert(json.error,"danger")
        }
      }
  return (


    <div className='container my-5' >
        <br /><br /><br />
      <form onSubmit={newLogin}  className="my-5">
      <div className="mb-3 row">
      <label htmlFor="email" className="col-sm-2 col-form-label">Email : </label>
      <div className="col-sm-10">
      <input type="email"required style={credentials.email.trim().length>=5?{background:"#A8DF8E"}:{background:"#ECCDB4"}} onChange={handlechange} className="form-control"  name="email" id="email" value={credentials.email} placeholder="Enter your email Id"/>
      </div>
        </div>
        <div className="mb-3 row">
      <label htmlFor="password" className="col-sm-2 col-form-label">Password : </label>
      <div className="col-sm-10">
        <input type={pass} style={credentials.password.trim().length>=5?{background:"#A8DF8E"}:{background:"#ECCDB4"}}   onChange={handlechange} className="form-control" placeholder='Enter your Password' name="password" id="password" value={credentials.password}/>
        <span><button onClick={showPassword} className='btn btn-primary' >{ pass==='password'?'show password':'Hide password'} </button></span>
      </div>
        </div>
       
      
        <button type='submit' disabled={credentials.email.trim().length<5 || credentials.password.trim().length<5}  className='btn btn-primary'  > Login ✔</button>
    </form>
    </div>
  )
}
