const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


//connecting to db
//connect to mongoose Server
mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true,  useUnifiedTopology: true }).then(()=> console.log("DB connected"));
mongoose.connection.on("error", err=>{
  console.log("DB connection error:",err);
});



//Bring in routes from routes folder which acts as a middleware
//post routes
const postRoutes = require("./routes/post");
//auth routes
const authRoutes = require("./routes/auth");
//user routes
const userRoutes = require("./routes/user");
//a single route for presenting api docs
app.get("/", (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if(err){
      return res.status(400).json({ error: err });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});



//middleware
//not using .get because we are using as middleware.
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/api", postRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: "Unauthorized!"});
  }
});


const port=process.env.PORT || 8080;
app.listen(port, ()=>{
  console.log("A Node Js API is listening on port:",port);
});
