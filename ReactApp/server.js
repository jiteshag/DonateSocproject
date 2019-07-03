const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const nodemailer = require('nodemailer');
app.use(bodyParser.json());
var firebase = require('firebase');
var validator = require("email-validator");
const bcrypt = require('bcrypt');
const saltRounds = 10;

var config = {
   apiKey: "AIzaSyD_BZoGyedQ_MEeOUq4rWJ6MbRPpLveb9E",
   authDomain: "reactnative-e1c19.firebaseapp.com",
   databaseURL: "https://reactnative-e1c19.firebaseio.com",
   projectId: "reactnative-e1c19",
   storageBucket: "reactnative-e1c19.appspot.com",
   messagingSenderId: "108896196107",
   appId: "1:108896196107:web:bbe8f210a885d8f7"
 };
firebase.initializeApp(config);

// let uid ;
let data;

// function makeid(length) {
//   var result           = '';
//   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   var charactersLength = characters.length;
//   for ( var i = 0; i < length; i++ ) {
//      result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

app.get("/verifymail",function(req,res){
  if(req.query.id==data.password){
  firebase.database().ref('/Users').push(data);
  res.send("Verfication Successful");
}
  else {
    res.send("Verfication Unsuccessful");
  }
});
app.post('/adminProjectRequest',function(req,res){
  console.log(hi);
  database= firebase.database();
  var ref = database.ref("uploadProject");
  ref.on("value", gotData, errData); 
  
  function gotData(data) {
    let projects = data.val();
    console.log(hi);
    res.send(projects);
    return;
  };

  function errData(err) {
    res.send(err);
    return;
  };
});



app.post('/login',function(req,res){
  data = {
    email : req.body.email,
    password : req.body.password ,
  }
  database= firebase.database();
  var ref = database.ref("Users");

  ref.on("value", gotData, errData);  

  function gotData(data) {
    let users = data.val();
    let keys = Object.keys(users);
    for(var i=0; i<keys.length; i++){
      if(users[keys[i]].email == req.body.email && users[keys[i]].password == req.body.password ){
        if(users[keys[i]].email=="admin@donate.com"&& users[keys[i]].password == "admin1234" ){
          res.send({val:"admin"});
          return; 
        }
        else 
          {res.send({val:"user"});
          return;
        }
      };
    }
    res.send({val:"nouser"});
    return;
  };

  function errData(err) {
    res.send(err);
    return;
  };
});

app.post('/users',function(req,res){
    data = {
    password : req.body.password ,
    email : req.body.email,
    phoneno : req.body.phoneno,
   };

   if(req.body.email==''||req.body.password==''||req.body.phoneno==''||validator.validate(req.body.email)===false){
    res.send({ val :"dataincomplete"});
    return;
   }
   var exist =0;
   database= firebase.database();
   var ref = database.ref("Users");
   ref.on("value", gotData, errData);  
 
    function gotData(ddata) {
      let users = ddata.val();
      let keys = Object.keys(users);
      for(var i=0; i<keys.length; i++){
         // console.log(req.body.email);
        if(users[keys[i]].email == req.body.email){
          exist = 1;
          return;
        }
      };
     exist = 0; 
     return;
    } 
    function errData(err) {
      res.send(err);
      return ;
    }; 
    bcrypt.hash(data.password, saltRounds, function (err,   hash) {
        data.password = hash;
      console.log(data.password);
      return 1;
      }.then(()=>{

    if(exist==0)
    {
      link="http://"+req.get('host')+"/verifymail?id="+data.password;
       console.log(data.password);
 
      const output = `
      <p>You made a sign up request on ${new Date(Date.now()).toLocaleString()}</p>
      <p>Please Click the link to verify the email </p>
      <a href="${link}">Click here to verify</a>
      <p>**This is an automatically generated mail. Please do not reply. For any further queries contact Donate App core team</p>
      `;
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
      
        auth: {
          user: 'donateappreact@gmail.com',
          pass: 'reactapp1234'
        },
        tls:{
          rejectUnauthorized:false
        }
      });
    
      let mailOptions = {
          from: '"DonateApp" <donateappreact@gmail.com>', 
          to: data.email ,//  list of receivers
          subject: 'Confirmation For Mail',
          html: output
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
      });

      res.send({val :"emailsent"});
      return;
    }else {
      res.send({ val :"alreadyemail"});
    }
  }))
});

app.listen(8000,'0.0.0.0');