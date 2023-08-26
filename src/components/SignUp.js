import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUp(props) {
  const {Alert}=props;
  const [credentials,setcredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const [pass,setpass]=useState("password");
  const [cpass,setcpass]=useState("password");
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

  const showCPassword=(e)=>{
    e.preventDefault();
    if(cpass==='password'){

        setcpass("text")
    }
    else{
        setcpass("password")
    }

}

  const signup= async (e)=>{
      e.preventDefault();
     // const host="http://localhost:8000";
      const response = await fetch("http://localhost:8000/api/auth/createuser",{
          method: 'POST',
          headers:{
              'Content-Type' :'application/json'
              
          },
          body : JSON.stringify({name:credentials.name ,email:credentials.email,password:credentials.password})
      })
      const json=await response.json();
      console.log(json);

      if(json.success){
          localStorage.setItem('token',json.Token);
          history('/home')
          Alert("Account created successfully!","success")

      }
      else{
          Alert(json.error,"danger")
      }
    }
return (


  <div className='container' >
    <h1 className='my-3' >Login to your Notebook</h1>
    <br /><br /><br />
    <form onSubmit={signup}  className="my-3">
    <div className="mb-3 row">
    <label htmlFor="name" className="col-sm-2 col-form-label">Name : </label>
    <div className="col-sm-10">
    <input type="text"required style={credentials.name.trim().length>=5?{background:"#A8DF8E"}:{background:"#ECCDB4"}} onChange={handlechange} className="form-control"  name="name" id="name" value={credentials.name} placeholder="Enter your name"/>
    </div>
      </div>
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
      <div className="mb-3 row">
    <label htmlFor="cpassword" className="col-sm-2 col-form-label">Password : </label>
    <div className="col-sm-10">
      <input type={cpass} style={credentials.cpassword===credentials.password?{background:"#A8DF8E"}:{background:"#ECCDB4"}}   onChange={handlechange} className="form-control" placeholder='Enter your Password' name="cpassword" id="cpassword" value={credentials.cpassword}/>
      <span><button onClick={showCPassword} className='btn btn-primary' >{ cpass==='password'?'show password':'Hide password'} </button></span>
    </div>
    
      </div>
     
    
      <button type='submit' disabled={credentials.email.trim().length<5 || credentials.password.trim().length<5 || credentials.cpassword!==credentials.password}  className='btn btn-primary'  > Sign Up ✔</button>
  </form>
  </div>
)
}
