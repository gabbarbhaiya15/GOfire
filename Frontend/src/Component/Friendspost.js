import react ,{useEffect, useState} from 'react';
import axios from 'axios';

export default function Friendspost(){

const [friendpost,setfriendspost]=useState([])
    useEffect(()=>{
  
        axios.get("https://gofirebackend.onrender.com/friendpost",{withCredentials:true})
        .then((res)=>{
          console.log(res.data)
        
        
        
          const picArray = res.data.map(post => post);
        
          
          setfriendspost(picArray);
        
           
        
            
        })
        .catch((err)=>{})
         },[]) 
        
        



return(
<>


{friendpost.map(item=>{
        return(<div classname="d-flex" key={item._id}>
         <div class="m-3" id="post-box">
       <div className="d-flex">
       
        <img src="https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" 
         alt="" 
         id="post-profile"
       
         />
         <h5 className="post-username">Alura</h5>
         <img src="https://miro.medium.com/v2/resize:fit:512/1*Js0Y20MwjcTnVAe7KjDXNg.png"
          alt=""
          id="post-dot"
        
         />
       </div>
       <img src= {item.pic}
        alt=""
        id="post"
       
       />
       <div className="d-flex" >
       <img width="40" height="35" src="https://img.icons8.com/glyph-neue/64/FA5252/like--v1.png" alt="like--v1"/>
       <img width="35" height="35" src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/1A1A1A/external-comment-video-interface-inkubators-detailed-outline-inkubators.png" 
       alt=""/>
       <img width="35" height="35" src="https://img.icons8.com/external-creatype-outline-colourcreatype/64/1A1A1A/external-share-user-interface-creatype-outline-colourcreatype.png" 
       alt=""/>
       <img width="35" height="35" class="save" src="https://img.icons8.com/fluency-systems-filled/48/1A1A1A/bookmark-ribbon.png" 
        alt=""/>
       </div>

       <div class="form">
  <input class="cinput" placeholder="Type your text" required="" type="text"/>
  <span class="cinput-border"></span>
</div>
    
    </div>    



</div>)
 })}



</>

)

}
