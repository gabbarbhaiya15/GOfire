import react, { useEffect, useState } from 'react';
import '../Css/Userprofile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import  {useUser} from '../UserContext';



export default function Userprofile(){
 const [Fpost,setFpost] = useState([]);
 const [Frriendspost, setFriendpost] = useState([]);
 const [Like,setLike] = useState(false)
 const [data,setData] = useState([])
 const [profilepic,setProfilepic]= useState('') 
 const {userid} = useParams()
 const {userData}= useUser();
 
const follow = async ()=>{
  console.log(userid)
await axios.put("https://gofirebackend.onrender.com/follow",{followid: userid},{withCredentials: true})
.then((res)=>{
  console.log(res.data)
  window.location.reload();
})
.catch((error)=>{
  console.log("error in  following client side ")
})

}

const unfollow = ()=>{

  axios.put("https://gofirebackend.onrender.com/unfollow",{unfollowid: userid},{withCredentials: true})
  .then((res)=>{
    console.log(res.data)
    window.location.reload();
  })
  .catch((error)=>{
    console.log("error in  unfollowing")
  })
  
  }
  const likepost=(id)=>{

    axios.put("https://gofirebackend.onrender.com/like",{postId:id},{withCredentials:true})
    .then((res)=>{
  console.log(res.data)
  setLike(prevstate=>!prevstate)
  
    })
    .then(result=>{
      //   console.log(result)
  const newData = data.map(item=>{
   if(item._id === result._id){
       return result
   }else{
       return item
   }
  })
  setData(newData)
  }).catch(err=>{
  console.log(err)
  })
  
  
    .catch(()=>{
  
    })
  
  
  
  }
  
  const unlikepost=(id)=>{
  
    axios.put("https://gofirebackend.onrender.com/unlike",{postId:id},{withCredentials:true})
    .then((res)=>{
      console.log(res.data)
      setLike(prevstate=>!prevstate)
    }) 
    .then(result=>{
      //   console.log(result)
  const newData = data.map(item=>{
   if(item._id=== result._id){
       return result
   }else{
       return item
   }
  })
  setData(newData)
  }).catch(err=>{
  console.log(err)
  })
    
    .catch(()=>{
  
    })
   
  
  
  }










 
useEffect(() => {
  console.log("running");
  const fetchData = async () => {
    try {
      const result = await axios.get(`https://gofirebackend.onrender.com/friendsid/${userid}`, {
        withCredentials: true,
      });
      console.log(result.data);
      setFpost(result.data.user);
     
      console.log(result.data);
  const postarray = result.data.post.map(items=> items);
  setFriendpost(postarray)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [userid]);

const boxStyle = {
    
  background: `url(${Fpost.coverpic})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  
  position: 'relative',
};


    return(
        <div className='Home-box'>
        <div id='top-friendsprofile-box' style={boxStyle} >
        <div className='edit-Friend-profile-box' >
       <img src={Fpost.profilepic}
        alt=''
        id='profile-pic'
       
       />
  {
    Fpost.follower?
    <>
            { Fpost.follower.includes(userData._id)? 
     <button class="" id="follow-button" onClick={unfollow}>Unfollow</button>

  : 
  
  <button class="" id ="follow-button" onClick={follow}>Follow</button>

    }
    </>
    :
    <button class="" id="follow-button" onClick={follow}>Follow</button>

  }
   
    </div>

    <div className='d-flex' id="user-follow-box">
      
        <h2 id='username'>{Fpost.input}</h2>
<div className='d-flex' id="box">

<div className='d-flex' id='content'>
    <h5>{Frriendspost ? Frriendspost.length : 0}</h5>
    <h5>Post</h5>
    </div>
    <div className='d-flex' id='content'>
    <h5>{Fpost.follower ? Fpost.follower.length : 0}</h5>
    <h5>Follower</h5>
    </div>
    <div className='d-flex' id="content">
    <h5>{Fpost.followings ? Fpost.followings.length : 0}</h5>
    <h5>Following</h5>
    </div>
    
</div>

</div>
</div>
<div className='line'></div>

{ /* post started from here   */}

< div className='layout'>

    { Frriendspost.map((item)=>{

        return(<div classname="l" key={item._id}>
         <div  id="post-box">
       <div className="profile-top-post-box">
       <div className='profile-text-post-box'>
        <img src={Fpost.profilepic}
         alt="" 
         id="post-profile"
       
         />
         <h5 className="post-username">{Fpost.input}</h5>
      </div>
        
       </div>
       <div className='post-image-box'>
       <img src= {item.pic}
        alt=""
        className="profile-post"
       
       />
       </div>
       <div className="profile-post-icon-box" >
       { item.likes.includes(userData._id)? 
     <>
     <img width="40" height="35" src="https://img.icons8.com/glyph-neue/64/FA5252/like--v1.png" alt="like--v1" onClick={()=>unlikepost(item._id)} />
     <h6>{item.likes.length}</h6>  
  </>
     : 
     <>
    <img width="40" height="35" src="https://img.icons8.com/ios/50/1A1A1A/like--v1.png" alt="like--v1" onClick={()=>likepost(item._id)} /> 
    <h6>{item.likes.length}</h6>  
</>
    }
       <img width="35" height="35" src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/1A1A1A/external-comment-video-interface-inkubators-detailed-outline-inkubators.png" 
       alt=""/>
       <img width="35" height="35" src="https://img.icons8.com/external-creatype-outline-colourcreatype/64/1A1A1A/external-share-user-interface-creatype-outline-colourcreatype.png" 
       alt=""/>
       <img width="35" height="35" class="save" src="https://img.icons8.com/fluency-systems-filled/48/1A1A1A/bookmark-ribbon.png" 
        alt=""/>
       </div>
      
    
    </div>    



</div>)
 })

}
 

       </div>

       </div>
    )
}
