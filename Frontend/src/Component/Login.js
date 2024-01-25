import React from 'react';
import GOfire from "../Image/GOfirelogo.png";
import '../Css/Login.css';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";



 export default function Login(){
  const [LEmail, setLEmail] = useState("");
  const  [Lpassword, setLpassword] = useState("");
  const navigate = useNavigate() ;

  const Checkdatas = async (e) => {
    console.log("checking");
     e.preventDefault();
   await axios.post('https://gofirebackend.onrender.com/login',{LEmail,Lpassword},{withCredentials:true})
   .then((users) => { 
   console.log("login in")
   alert("welcome 🎊🎊🎉🎇 ")
   navigate('/')

  
   
  
  
   
  
  })
   .catch((error) => {console.log("error")
   alert(" User Not Found 😒😒😒 ")
   window.location.reload();
  });
    
  };



    return(
    <form onSubmit={Checkdatas} method="post">
    <div class="card">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="card-inner">
    <p class="title">Login Form</p>
            <input placeholder="Email"   class="username input" type="email" value={LEmail}  onChange = {(e)=>  setLEmail(e.target.value) } />
            <input placeholder="Password"    class="password input" type="password"  value={Lpassword}  onChange = {(e)=>  setLpassword(e.target.value) } />
   
            <button type="submit" class=" login" >Login</button>

    </div>

</div>

    
    </form>
    )
 }
