import React, { useState } from "react";
import {navigate,Link} from "react-router-dom";
import { Tooltip } from 'react-tippy';
import  {useUser} from  '../UserContext';
import instalogo from "../Image/instagramLogo.png";
import Home from      "../Image/home.png";
import white_home from "../Image/white_home.png";
import post from"../Image/post.png";
import axios from  'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tippy/dist/tippy.css';
import '../Css/Footer.css';
export default function Footer(){
  const {userData} =useUser();
  return(
   
    
    <nav class="footer">
    <input id="menu" type="checkbox"/>
    <label for="menu">Menu</label>
    <ul class="menu">
      <li>
        <Link to="/">
          <span>Home</span>
          <i class="fas fa-address-card" aria-hidden="true"><img width="26" height="26" src="https://img.icons8.com/ios-filled/26/home.png" alt="home"/></i>
        </Link>
      </li>
      <li>
        <Link to="/Signup">
          <span>Signup</span>
          <i class="fas fa-tasks" aria-hidden="true"><img  src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/26/external-add-user-tanah-basah-glyph-tanah-basah-2.png" alt="external-add-user-tanah-basah-glyph-tanah-basah-2"/></i>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <span>Login</span>
          <i class="fas fa-users" aria-hidden="true"><img    src="https://img.icons8.com/external-glyph-design-circle/26/external-login-photography-glyph-design-circle.png" alt="external-login-photography-glyph-design-circle"/></i>
        </Link>
      </li>
      <li>
        <Link to="/post">
          <span>Post</span>
          <i class="fas fa-envelope-open-text" aria-hidden="true"><img  src="https://img.icons8.com/ios/26/plus-2-math.png" alt="plus-2-math"/></i>
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <span></span>
          <i class="fas fa-envelope-open-profile" aria-hidden="true"><img src={userData.profilepic}
        alt=''
        id='profile-pics'
       
       /></i>
        </Link>
      </li>
    </ul>
  </nav>
  
  )
}