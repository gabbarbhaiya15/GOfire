const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const signup = require('./controller/signup');
const Post = require('./controller/Post');
const AllPost = require('./controller/Allpost');
const Mypost = require('./controller/Userpost');
const Like = require('./controller/Like');
const Unlike = require('./controller/Unlike');
const Login = require('./controller/Login');
const Deletepost = require('./controller/Deletepost');
const FriendsID = require('./controller/FriendsID');
const Follow = require('./controller/Follow');
const Unfollow = require('./controller/Unfollow');
const UpdateProfile = require('./controller/Updateprofile');
const Friendspost = require('./controller/FriendsPost');
const Logout = require('./controller/Logout');
const Comment = require('./controller/Comment');
const protected = require('./controller/Protected');
const search = require('./controller/Search');
const userdetail = require('./controller/Userdetail');
const path = require('path');

const app = express();


const port = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect('mongodb+srv://gabbarbhaiya:Shubham123@gabbarbhaiya.2lvenhx.mongodb.net/Users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// CORS configuration
const corsOptions = {
  credentials: true,
  origin: 'https://gofirfrontend.onrender.com',
};

app.use(cors(corsOptions));

// Your routes here
app.use('/register', signup);
app.use('/login', Login);
app.use('/userdetail', userdetail);
app.use('/protected', protected);
app.use('/logout', Logout);
app.use('/post', Post);
app.use('/allpost', AllPost);
app.use('/mypost', Mypost);
app.use('/like', Like);
app.use('/unlike', Unlike);
app.use('/comment', Comment);
app.use('/remove', Deletepost);
app.use('/friendsid', FriendsID);
app.use('/follow', Follow);
app.use('/unfollow', Unfollow);
app.use('/updateprofile', UpdateProfile);
app.use('/friendpost', Friendspost);
app.use('/search', search);

app.use(express.static('Frontend/build'))
    
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'Frontend','build','index.html'))
    })

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
