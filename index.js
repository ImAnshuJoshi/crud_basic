const express = require('express')
const dotenv = require('dotenv')
const usersRoute = require('./routes/auth.js')
const addRoute = require('./routes/add.js')
const  mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
dotenv.config();    
const app = express();
//some middle wares to handle the body parsing and cross origin connection
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: true,
}))

app.use(passport.initialize())

const connect = async () =>{
    try {
         mongoose.connect(process.env.MONGO ,{
            useUnifiedTopology: true,
            useNewUrlParser: true
          });
        console.log('Connected to mongoDB');
      } catch (error) {
        throw error;
      }
}

mongoose.connection.on("connected",()=>{
    console.log('MongoDB connected');
})

mongoose.connection.on("disconnected",()=>{
  console.log('MongoDB disconnected');
})


app.use('/api/auth',usersRoute);
app.use('/api/add',addRoute);

//error handling middleware
app.use((err,req,res,next)=>{
  const errorStatus = err.status || 400;
  const errorMessage = err.message||"Something went wrong"

  return res.status(errorStatus).json({
      success:false,
      status:errorStatus,
      Message:errorMessage,
      stack:err.stack
  })
})

//HEROKU
if(process.env.NODE_ENV=="production"){
  app.use(express.static("client/build"));
  const path =require('path');
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"client","build","index.html"))
  })
}

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    connect();
    console.log('server is running on PORT',process.env.port);
})
