
import React ,{useContext,useReducer} from "react";
import GOfire from "../Image/GOfirelogo.png";
import '../Css/Signup.css';

import { useState } from "react";
import { Link, useNavigate,useHistory } from "react-router-dom";
import { Usercontext } from "../App";
import axios from "axios";
 
export default function Signup(){

  const [input, setinput] = useState("");
    const  [password, setpassword] = useState("");
    const [Email, setEmail] = useState("");
    const collectdata =async (e) => { 
      console.log("registration started")
      await axios.post('https://gofirebackend.onrender.com/register',{input,password, Email},{withCredentials:true})
      .then((res)=>{console.log("collected")
      alert("welcome 😊😊");
      window.location.reload();
    
 
    })
      .catch((err)=>{console.log("GADBAD HO GYA BHAIII ")
    
      alert("welcome 😊😊");
      window.location.reload();
    })
  }


    return(
<>


<div class="card">
    <div class="circles"></div>
    <div class="circles"></div>
    <div class="card-inner">
    <p class="title">Sign Form</p>
            <input placeholder="Username" class="username input" type="text" value={input} onChange = {(e)=>  setinput(e.target.value) }   />
            <input placeholder="Email" class="username input" type="email" value={Email} onChange = {(e)=>  setEmail(e.target.value) } />
            <input placeholder="Password" class="password input" type="password"/>
            <button class="btn" className='login' type="submit" onClick={collectdata} >Sign</button>   
    </div>

</div>





</>


    )
}
