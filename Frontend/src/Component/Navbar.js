import React, { useState } from "react";
import {navigate,Link} from "react-router-dom";
import { Tooltip } from 'react-tippy';
import  {useUser} from  '../UserContext';
import instalogo from "../Image/instagramLogo.png";
import Home from      "../Image/home.png";
import white_home from "../Image/white_home.png";
import post from"../Image/post.png";
import GOfire from "../Image/GOfirelogo.png";
import axios from  'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tippy/dist/tippy.css';
import '../Css/Navbar.css'

export default function Navbar(){

const [home,sethome]= useState("true");
const [search,setsearch]= useState("");
const [searchbox,setsearchbox] = useState("true");
const [userDetail,setuserDetail]= useState([])
const {userData} =useUser();

function clicked(){
  setsearchbox(prevstate=>!prevstate);
}
const fetchuser= async(query) =>{
  setsearch(query);
await axios.post("https://gofirebackend.onrender.com/search",{query},{withcredentials:true})
.then((res)=>{
  setsearchbox("true");
  console.log(res.data);
  const dataarray= res.data.map(item=>item) 
  console.log(dataarray);
  setuserDetail(dataarray)
})
.catch((error)=>{
  "error in searching"
})
}

return(
    <div className="main">

    <nav  className="d-flex ">
    <img src={GOfire}    alt=""  className="" id="GOfirelogo" />
    <div class="group">
    
 <div className="d-flex">
 
  <input placeholder="Search"
   type="search"
    class="searchinput"
    value={search}
    onChange={(e)=>fetchuser(e.target.value)}
    
    />
   

    </div> <div >
    <ul className="list-group" id="collection">
      {
      userDetail.map((items)=> {
        return(<div key={items._id} className={`${searchbox ? 'search-dropbox': 'search-closebox'}`}>
         <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/000000/multiply--v1.png" alt="multiply--v1" className="cross" onClick={clicked}/>
       <Link to= {`/profile/${items._id}`}>
          <li className="list-item">{items.Email}</li>
       </Link>
</div>

        )

        })
      }
    </ul>
</div>
<div id="logos">

<Link to="/" className="post-logo"  >
  
  <Tooltip
  title="Home"
  position="bottom"
  trigger="mouseenter"
  >
<img width="36" height="36" src="https://img.icons8.com/arcade/36/home.png" alt="home"/>


</Tooltip>

</Link>



<Link to ="/signup" className="post-logo">  <Tooltip title="Signup" position ="bottom" trigger="mouseenter"  >
  <img width="36" height="36" src="https://img.icons8.com/arcade/36/add-user-male.png" alt="add-user-male"/>
  </Tooltip> </Link>
<Link to="/login" className="post-logo"><Tooltip title="Login" position="bottom" trigger="mouseenter" >
<img width="36" height="36" src="https://img.icons8.com/arcade/36/login-rounded-right.png" alt="login-rounded-right"/>
  
  
  </Tooltip></Link>
<Link to="/post" className="post-logo"><Tooltip title="Post" position="bottom" trigger="mouseenter">
<img width="26" height="36" src="https://img.icons8.com/3d-plastilina/36/image--v1.png" alt="image--v1"/>
  </Tooltip></Link>
{ //<Link to="/friendspost" className="post-logo">Fpost</Link>
}

<Link to="/profile" className="profile-logo">
<img src={userData.profilepic}
        alt=''
        id='profile-pics'
       
       />

</Link>
</div>
</div>


    </nav>





    

    
    </div>
)



}
