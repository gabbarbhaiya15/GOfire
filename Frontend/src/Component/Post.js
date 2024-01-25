import React from "react";
import { useState } from "react";
import '../Css/Post.css'
import { useEffect } from "react";
import axios  from "axios";
import  Cookies from 'js-cookie';
export default function Post(){

const [title,settitle]= useState("");
const [body,setbody]= useState("");
const [pic,setpic]= useState("");
const [url,setUrl] = useState("")
useEffect(()=>{
  const token =  Cookies.get('token');
  
    
  const checkdata = async ()=>{
  
 await axios.get("https://gofirebackend.onrender.com/protected",{withCredentials:true})  
 .then((res)=>{
 console.log(res.data);

 })
 .catch((error)=>{
console.log(" error in checking")

 })

 }

 if(url){
    console.log("Loading") 
    console.log(url)
    fetch("https://gofirebackend.onrender.com/post",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
           withCredentials:true
          
        },
        credentials :'include'
        ,
        body:JSON.stringify({
            title,
            body,
            pic:url,
        }),
      
    }).then(res=>res.json())
    .then(data=>{
       console.log(data );
       if(data.error){
         console.log(" error in uploading image")
         alert("Please fill all information 🙄🙄")
         window.location.reload()
       }
       else{
        console.log("file uploaded successfully")

        window.location.reload();
       }
    }).catch(err=>{
        console.log(err)
    })
  }


},[url])

const postDetails = async ()=>{
   const data = new FormData()
   data.append("file",pic)
   data.append("upload_preset","insta-clone")
 //  data.append("cloud_name","da8gsmpzs")
   await fetch("https://api.cloudinary.com/v1_1/da8gsmpzs/image/upload",{



   method:"post",
       body:data
   })
   .then(res=>res.json())
   .then(data=>{
  
      setUrl(data.url)
      console.log(url)
      
   })
   .catch(err=>{
       console.log(err)
   })


}





    return(
        

        <div className="make-post-page">
  
<input type="text" name="text"
 class="input-title"
  placeholder="write title" 
  value={title}
  onChange = {(e)=> settitle(e.target.value)}
  />

<div class="form-control">
  <input class="inputs input-alt"
 placeholder="Type something intelligent" 
 required=""
 type="text"
 value={body}
 onChange = {(e)=> setbody(e.target.value)}
 />
  <span class="input-borders input-border-alts"></span>
</div>


{/* */}
<label for="images" class="drop-container" id="dropcontainer">
  <span class="drop-title">Drop files here</span>
  or
  <input type="file" id="images" accept="image/*" required    onChange = {(e)=> setpic(e.target.files[0])} />
</label>


<button id="buttons" onClick={()=>postDetails()}> POST
</button>





        </div>
    )

}
