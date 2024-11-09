var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var url = "mongodb://localhost:27017";

var app = express();
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000',  
//   methods: ['POST', 'GET']
// }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register-user", (req, res) => {

  var user = {
    UserId: req.body.UserId,
    UserName: req.body.UserName,
    Email: req.body.Email,
    Password: req.body.Password,
    Mobile: req.body.Mobile,
  };
  
  MongoClient.connect(url)
    .then((clientObject) => {

      var Database = clientObject.db("Mainflow-task-4");

      Database.collection("register")
        .insertOne(user)
        .then(() => {
          console.log("User Registered");
          res.status(201).json({ message: "User Registered Successfully" });
        })
        .catch((insertErr) => {
          console.error("Error registering user:", insertErr);
          res.status(500).json({ error: "Failed to register user" });
        })
        .finally(() => {
          clientObject.close();
        });
    })
    .catch((err) => {
      console.error("An error occurred:", err);
      res.status(500).json({ error: "Database connection failed" });
    });
});

app.post("/login-user", (req, res) => {

  var user = {

    UserId: req.body.UserId,
    Password: req.body.Password,

  };

  MongoClient.connect(url)
    .then(clientObject => {

      var Database = clientObject.db("Mainflow-task-4");

      Database.collection("register")
        .findOne({UserId: user.UserId, Password:user.Password})
        .then((foundUser) => {
          if (foundUser) {
            console.log("User logged in");
            res.status(200).json({ message: "User login Successful" });
          } else {
            res.status(401).json({ error: "Invalid UserId or password" });
          }
        })
        .catch((findErr) => {
          console.error("Error finding user:", findErr);
          res.status(500).json({ error: "Failed to login user" });
        })
        .finally(() => {
          clientObject.close();
        });
    })
    .catch((err) => {
      console.error("An error occurred:", err);
      res.status(500).json({ error: "Database connection failed" });
    });


});

app.get("/register" , (req, res) => {

    MongoClient.connect(url).then(clientObject=>{

      var Database = clientObject.db("Mainflow-task-4");
      Database.collection("register").find({}).toArray()
      .then(document => 
        {
          res.send(document); 
          res.end();
      })

    })
  
});

app.get("/login", (req,res)=>{

  MongoClient.connect(url).then(clientObject=>{

    var Database = clientObject.db("Mainflow-task-4");
    Database.collection("register").find({}).toArray()
    .then(document => 
      {
        res.send(document); 
        res.end();
    })

  })


})

app.post('/check-userid', async (req, res) => {

  var user = {

    UserId: req.body.UserId,

  };

  MongoClient.connect(url).then(clientObject=>{

    var Database = clientObject.db("Mainflow-task-4");
    Database.collection("register").findOne({UserId: user.UserId})
    .then((foundUser) => {
      if (foundUser) 
      {
        return res.json({ exists: true });
      } else{
      return res.json({ exists: false });
      }

    })

  })
  
});


app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});



app.listen(4040, () => {
  console.log("Server running on port  http://localhost:4040");
});
