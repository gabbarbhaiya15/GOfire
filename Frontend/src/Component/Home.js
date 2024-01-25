import React, { useEffect, useState } from "react";
import '../Css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useUser } from "../UserContext";

export  default function Home(){

const [Post,setPost]= useState([])
const [Like,setLike] = useState(false)
const [Comment,setComment] = useState(false)

const [Count, setCount] = useState(0);
const [data,setData] = useState([])
const {userData} = useUser();

const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState({});
const [showComments, setShowComments] = useState(false);

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
axios.get("https://gofirebackend.onrender.com/allpost",{withCredentials:true})
.then((res)=>{
  console.log(res.data);
  const postarray = res.data.map(items=> items);
  setPost(postarray)

})
.catch(()=>{

})


},[])



    return(
        <>
          {
            Post.map(item =>{
           
              return(
                <div  key={item._id} id="Home-Box" >
              
              <div className="post-card" key={item._id}>
     
      <div className="post-header">
        <img src={item.postedBy.profilepic} alt="Profile" className="profile-pic" />
        <p className="username">{item.postedBy.input}</p>
      </div>
     
      <img src={item.pic} alt="Post" className="post-image" />

      <div className="actions">
        <button className="action-button">    
         { item.likes.includes(userData._id)? 
     <span className="d-flex">
      <h6>{item.likes.length}</h6>  
     <img width="40" height="35" src="https://img.icons8.com/arcade/36/filled-like.png" alt="like--v1" onClick={()=>unlikepost(item._id)} />
     </span>
     : 
     <span className="d-flex">
      <h6>{item.likes.length}</h6>  
    <img width="40" height="35" src="https://img.icons8.com/arcade/64/dislike.png" alt="like--v1" onClick={()=>likepost(item._id)} /> 
    </span>

    }</button>
        <button className="action-button" onClick={() => setShowComments( { ...showComments, [item._id]: !showComments[item._id] })}>
        <img width="35" height="35" src="https://img.icons8.com/fluency/48/speech-bubble-with-dots--v1.png" 
              alt=""/>
        </button>
        <button className="action-button"><img width="36" height="36" src="https://img.icons8.com/sf-black-filled/36/1A1A1A/forward-arrow.png" alt="forward-arrow"/></button>
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
      <button onClick={() => makeComment(item._id)} className='post-button'><img width="36" height="36" src="https://img.icons8.com/arcade/36/sent.png" alt="sent"/></button>
      </div>
      

    </div>
       
       </div>
              )
            })
          }
        </>
    )
}
