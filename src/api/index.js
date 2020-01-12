const express = require('express');
const mongoose = require('mongoose');
// var uri = "mongodb+srv://gundesh:98123@cluster0-hslz1.mongodb.net/test?retryWrites=true&w=majority";

// var db = mongoose.connect(uri).catch((error) => { console.log(error); });
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gundesh:98123@cluster0-hslz1.mongodb.net/?replicaSet=admin?retryWrites=true&w=majority&wtimeoutMS=5000";
const client = new MongoClient(uri, { useNewUrlParser: true },
  (err, client) => {
    if (err) return console.log(err);

  db = client.db(dbName);
   console.log(`Connected MongoDB: ${url}`);
   console.log(`Database: ${dbName}`);
  }
);


const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - /'
  });
});

//register page
router.post('/register', (req, res) => {
let doc = {
  email : req.body.email,
  name : req.body.name,
  mobile : req.body.mobile,
  password :req.body.password
}
client.connect(err => {
  const collection = client.db("project1").collection("users");
  // perform actions on the collection object

collection.insertOne(doc, function (error, response) {
  if(error) {
      console.log('Error occurred while inserting');
     // return 
  } else {
     console.log('inserted record', response.ops[0]);
    // return 
  }
});
client.close();
});

console.log("/register got", email, name,mobile, password);
});



router.post('/getUser', (req, res) => {

});

//Home Page
router.post('/logTime', (req, res) => {
  let doc = {
    taskname : req.body.taskname,
    projectname : req.body.projectname,
    date : req.body.date,
    time :req.body.time
  }
  client.connect(err => {
    const collection = client.db("project1").collection("projectdetails");
    // perform actions on the collection object
  
  collection.insertOne(doc, function (error, response) {
    if(error) {
        console.log('Error occurred while inserting');
       // return 
    } else {
       console.log('inserted record', response.ops[0]);
      // return 
    }
  });
  client.close();
  });
  
  console.log("/logTime got", taskname, projectname, date, time);
  });
  


router.get('/getLoggedDetails', (req, res) => {
    client.connect(err => {
    const collection = client.db("project1").collection("projectdetails");
    // perform actions on the collection object
     collection.find().toArray(function(err, items) {
      if (err) {
        console.log(err);
      } else {
        console.log(items);
        client.close();
        res.send({
          status: '200',
          message: 'sucess',
          data: items
        });
      }          
    });  

  });      
});
module.exports = router;