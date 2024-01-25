import React from 'react';

import  { BrowserRouter as Router,Switch,Route, BrowserRouter, Routes} from "react-router-dom";

import Signup from './Component/Signup';
import Login from './Component/Login';
import Home from './Component/Home';
import Profile from './Component/Profile';
import Navbar from './Component/Navbar';
import Post from './Component/Post';
import Userprofile from './Component/Friendsprofile';
import Friendspost from './Component/Friendspost';
import { UserProvider } from './UserContext';
import Footer from './Component/Footer';
import './App.css';











function App() {

  
 
  return (
    <div className='mainbody'>
  <UserProvider>
   
   <BrowserRouter basename="/">
   <div className='app-nav'>
<Navbar/>
</div>
<Routes>
   < Route path='/signup' element={<Signup/>} />
   <Route path ='/login' element ={<Login/>} />
  <Route path ='/' element ={<Home/>} />
   <Route exact path ='/profile' element ={<Profile/>} /> 
   <Route path='/post' element={<Post/>} />
   <Route path='/friendspost' element={<Friendspost/>} />
   <Route path='/profile/:userid' element={<Userprofile/>} />
  </Routes>
  <div className='app-footer'>
  <Footer/>
  </div>
   </BrowserRouter>
   
   </UserProvider>
  
   </div>
   
  );
}

export default App;
