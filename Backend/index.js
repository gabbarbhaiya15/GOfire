const express = require('express');
const cors = require('cors');
const mongoose  = require('mongoose');
const  bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const JWTModel = require('./Modules/UserModel');
const  signup = require('./controller/signup');
const Post = require('./controller/Post');
const AllPost = require('./controller/Allpost');
const Mypost = require('./controller/Userpost');
const Like =  require('./controller/Like');
const Unlike = require('./controller/Unlike');
const  Login = require('./controller/Login');
const Deletepost = require('./controller/Deletepost');
const FriendsID = require('./controller/FriendsID');
const Follow  = require('./controller/Follow');
const Unfollow = require('./controller/Unfollow');
const UpdateProfile = require('./controller/Updateprofile');
const Friendspost = require('./controller/FriendsPost');
const Logout = require('./controller/Logout');
const Comment = require('./controller/Comment');
const protected = require('./controller/Protected');
const search = require('./controller/Search');
const userdetail = require('./controller/Userdetail');


const app = express();
app.use(express.json());
mongoose.set("strictQuery", true);
app.use(bodyParser.urlencoded({ extended: true }));
const port =  process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors({credentials: true,
  origin: ['https://gofirebackend.onrender.com']

}));
app.use(cookieParser());
  //  mongodb connection
  mongoose.connect('mongodb+srv://gabbarbhaiya:Shubham123@gabbarbhaiya.2lvenhx.mongodb.net/Users',{

  useNewUrlParser: true,
  useUnifiedTopology: true,
  
  },)
  .then(()=>{console.log('connect')})
  .catch((err)=>{console.log(err)}) ;
app.use(cors());
app.get("/" ,(req, res) =>{
  res.setHeader("Access-Control-Allow-Credentials","true" );
  res.send(" API is running...");
});
app.use('/register', signup);
app.use('/login', Login);
app.use('/userdetail', userdetail);
app.use('/protected',protected)
app.use('/logout', Logout);
app.use('/post',Post);
app.use('/allpost',AllPost);
app.use('/mypost',Mypost);
app.use('/like',Like);
app.use('/unlike',Unlike);
app.use('/comment',Comment);
app.use('/remove',Deletepost);
app.use('/friendsid',FriendsID);
app.use('/follow', Follow);
app.use('/unfollow',Unfollow);
app.use('/updateprofile',UpdateProfile);
app.use('/friendpost',Friendspost);
app.use('/search',search);



  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
