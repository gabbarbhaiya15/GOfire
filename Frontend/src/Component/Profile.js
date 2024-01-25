import react, { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tippy';
import  {useUser} from  '../UserContext';
import 'react-tippy/dist/tippy.css';
import '../Css/Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



export default function Profile(){
 const [Mypic,setMypic] = useState([]);
const [profilepic,setProfilepic]= useState('');
const [coverpic,setCoverpic]= useState('');
const [picurl,setPicurl] = useState('');
const [coverpicurl,setCoverpicurl] = useState('');
const [data,setData] = useState([])
const [Like,setLike] = useState(false)
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState({});
const [showComments, setShowComments] = useState(false);
const [Aside,setaside] = useState(false);

 
 const {userData} =useUser();
 const navigate = useNavigate();
 console.log(userData);

 function clicked(){
  setaside(prevstate=>!prevstate);
}

 const Logout = async ()=>{
  console.log("Logout");
await axios.get('https://gofirebackend.onrender.com/logout',{withCredentials:true})

.then((user)=>{
console.log("User logged out");
navigate('/')
  }) 
  .catch((error)=>{
      console.log("Error in logging out");
})  




}
 const Deletepost = async (postId)=>{

await axios.delete(`https://gofirebackend.onrender.com/remove/${postId}`,{withCredentials:true})
 .then((Result)=>{
   console.log(Result)
 })
 .catch((error)=>{
   console.log(error)
 })
 
  }
  
  
  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };
  
  
  const makeComment = (postId)=>{
    axios.put("https://gofirebackend.onrender.com/comment",{postId :postId,text:newComment},{withCredentials:true})
    .then((res)=>{
      console.log("commented successful")
     setNewComment('')
    })
    .catch((error)=>{
  console.log("error in client side while making commnent ")
    })
  }





 
 useEffect( ()=>{
  
axios.get("https://gofirebackend.onrender.com/mypost",{withCredentials:true})
.then((res)=>{
   const picArray = res.data.map(post => post);
setMypic(picArray);
    })
.catch((err)=>{})
 },[]) 


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
window.location.reload();

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
window.location.reload();
}).catch(err=>{
console.log(err)
})
  
  .catch(()=>{

  })
 


}





 useEffect(()=>{
 
    
      
  const checkdata = async ()=>{
  
 await axios.get("https://gofirebackend.onrender.com/protected",{withCredentials:true})  
 .then((res)=>{
 console.log(res.data);

 })
 .catch((error)=>{
console.log(" error in checking")

 })

 }

 if(picurl || coverpicurl){
   console.log(picurl)
    
    fetch("https://gofirebackend.onrender.com/updateprofile",{
        method:"put",
        headers:{
            "Content-Type":"application/json",
           withCredentials:true
          
        },
        credentials :'include'
        ,
        body:JSON.stringify({
            
          profilepic: picurl,
          coverpic: coverpicurl,
        }),
      
    }).then(res=>res.json())
    .then(data=>{
    
       if(data.error){
         console.log(" error in uploading profile image")
       }
       else{
        console.log("profile image uploaded successfully")
        window.location.reload()
       }
    }).catch(err=>{
        console.log(err)
    })
  }


},[picurl,coverpicurl]);


const ProfileDetails = async ()=>{
  console.log('updating')
 
  const data = new FormData()
  data.append("file",profilepic)
  
  data.append("upload_preset","insta-clone")
//  data.append("cloud_name","da8gsmpzs")
  await fetch("https://api.cloudinary.com/v1_1/da8gsmpzs/image/upload",{



  method:"post",
      body:data
  })
  .then(res=>res.json())
  .then(data=>{
 
     setPicurl(data.url)
    
     
  })
  .catch(err=>{
      console.log(err)
  })
}
const CoverpicDetails = async ()=>{
  console.log('updating')
 
  const data = new FormData()
  data.append("file",coverpic)
  
  data.append("upload_preset","insta-clone")
//  data.append("cloud_name","da8gsmpzs")
  await fetch("https://api.cloudinary.com/v1_1/da8gsmpzs/image/upload",{



  method:"post",
      body:data
  })
  .then(res=>res.json())
  .then(data=>{
 
     setCoverpicurl(data.url)
    
     
  })
  .catch(err=>{
      console.log(err)
  })
}

  const boxStyle = {
    
    background: `url(${userData.coverpic})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
    position: 'relative',
  };
  const asidecover = {

    background: `url(${userData.coverpic})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
   
  };


    return(
        <div className='Home-box' >
        <div  id='top-profile-box'style={boxStyle}>
      { Aside ? 
      <>
      <div  id="Aside" ><h2 onClick={clicked} >||||</h2></div>
      <div className='aside-box'>
      
       <div className='Aside-box'>
       <span >&times;</span>
       <div className='Aside-coverpic'  style={asidecover}>
       <img 
       src={`${userData.profilepic}?${Math.random()}`}
        alt=''
        id='edit-profile-pic'
        key={userData.profilepic} />
         <input type="file" id="uploads" accept="image/*" required  onChange = {(e)=> setProfilepic(e.target.files[0])} hidden />
      <label htmlFor="uploads" id="upload-profile">
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/sf-black-filled/64/737373/camera.png"
          alt="camera--v1"
          className="icons"
        />
      </label>
     <input type="file" id="upload-cover" accept="image/*" required hidden onChange = {(e)=> setCoverpic(e.target.files[0])} />
      <label htmlFor="upload-cover" id='upload-cover-pic' >
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/sf-black-filled/64/737373/pen.png"
          alt="edit-cover"
          className="icons"
        />
      </label>
</div>
<ul className='edit-box'>
                  <li> <button className='edit-button' onClick={()=>ProfileDetails()}>Edit profile</button></li>
                  <li> <button className='edit-button' onClick={()=>CoverpicDetails()}>Edit cover-pic</button></li>
                  <li> <button className='edit-button'   onClick={Logout}>Logout</button></li>
                
                </ul>

       </div>
      

      </div>
      
      
      </>
      :
        <>
         <div  id="Aside"><h2 onClick={clicked}>||||</h2></div>
        </>
      }

        <div className='edit-profile-box' >
       <img 
       src={`${userData.profilepic}?${Math.random()}`}
        alt=''
        id='profile-pic'
        key={userData.profilepic}
       
       />
        <h2 id='username'>{userData.input} </h2>
    
    </div>

    <div className='d-flex' id="user-follow-box">
        


<div className='d-flex' id='content'>
    <h5>{Mypic ? Mypic.length : 0}</h5>
    <h5>Post</h5>
    </div>
    <div id='line'></div>
    <div className='d-flex' id='content'>
    <h5>{userData.follower ? userData.follower.length : 0}</h5>
    <h5>follower</h5>
    </div>
    <div id='line'></div>
    <div className='d-flex' id="content">
    <h5>{userData.followings ? userData.followings.length : 0}</h5>
    <h5>following</h5>
    </div>


</div>

</div>
<div className='line'></div>

{ /* post started from here   */}


< div className='layout'>

    {Mypic.map(item=>{
           return(
            <div  key={item._id} id="Home-Box" >
          
          <div id="post-card" key={item._id}>
 
  <div className="post-header">
    <img src={userData.profilepic} alt="Profile" className="profile-pic" />
    <p className="username">{item.postedBy.input}</p>
  </div>
 
  <img src={item.pic} alt="Post" id="post-image" />

  <div className="actions">
    <button className="action-button">    
     { item.likes.includes(userData._id)? 
 <span className="d-flex">
  <h6>{item.likes.length}</h6>  
 <img width="40" height="35" src="https://img.icons8.com/arcade/36/filled-like.png" alt="like--v1" onClick={()=>unlikepost(item._id)} id='like-button'/>
 </span>
 : 
 <span className="d-flex">
  <h6>{item.likes.length}</h6>  
<img width="40" height="35" src="https://img.icons8.com/arcade/64/dislike.png" alt="like--v1" onClick={()=>likepost(item._id)} id='like-button' /> 
</span>

}</button>
    <button className="action-button" onClick={() => setShowComments( { ...showComments, [item._id]: !showComments[item._id] })}>
    <img width="36" height="36" src="https://img.icons8.com/fluency/48/speech-bubble-with-dots--v1.png" alt="speech-bubble-with-dots--v1"/>
    </button>
    <button className="action-button" id='like-button'><img width="36" height="36" src="https://img.icons8.com/sf-black-filled/36/1A1A1A/forward-arrow.png" alt="forward-arrow"/></button>
  </div>

  {showComments[item._id] && (
    <div className="comments-section">
      {item.comments.map((comment, index) => (
        <p key={index} className="comment">
        <span> <img src={comment.postedBy.profilepic} alt="Profile" className="comment-profile-pic" /></span>  <span className="comment-username">{comment.postedBy.input}:</span> {comment.text}
        </p>
      ))}
    </div>
  )}

  <div className="comment-form">
    <input
      type="text"
      placeholder="Add a comment..."
      value={newComment[item.postId] }
      className='comment-box'
      onChange={(e) => setNewComment(e.target.value)}
    />
  <button onClick={() => makeComment(item._id)} id='post-button'><img width="36" height="36" src="https://img.icons8.com/arcade/36/sent.png" alt="sent"/></button>
  </div>
  

</div>
   
   </div>
          )
      
 })}
 

       </div>
       </div>
    )
}
