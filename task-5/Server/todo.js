const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const url = "mongodb://localhost:27017/";

    app.post("/add", (req, res) => {

        const user = {

            userAdd: req.body.userAdd, 
        };

        MongoClient.connect(url).then((clientObject) => {
            var DataBase = clientObject.db("MainFlow-Task-5");

            DataBase.collection("todo")
                .insertOne(user)
                .then(() => {
                    console.log("Task Added");
                    res.status(201).json({ message: "Task Added Successfully" });
                })
                .catch((insertErr) => {
                    console.error("Error adding task:", insertErr);
                    res.status(500).json({ error: "Failed to add task" });
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


    app.get("/add", (req,res) => {

        MongoClient.connect(url).then(clientObject=>{

            var Database = clientObject.db("MainFlow-Task-5");
            Database.collection("todo").find({}).toArray()
            .then(document => 
            {
                res.send(document); 
                res.end();
            })
    
        })
    });

    
    app.delete("/add/:id", (req, res) => {
        console.log("Delete request received for ID:", req.params.id);
    
        MongoClient.connect(url)
            .then(clientObject => {
                const Database = clientObject.db("MainFlow-Task-5");
                const id = req.params.id;
    
                Database.collection("todo")
                    .deleteOne({ _id: new ObjectId(id) })
                    .then(result => {
                        if (result.deletedCount === 1) {
                            console.log("Task deleted");
                            res.send({ message: 'Task deleted' });
                        } else {
                            console.log("Task not found");
                            res.status(404).json({ error: "Task not found" });
                        }
                    })
                    .catch(err => {
                        console.error("Error deleting task:", err);
                        res.status(500).json({ error: "Failed to delete task" });
                    })
                    .finally(() => {
                        clientObject.close();
                    });
            })
            .catch(err => {
                console.error("An error occurred during database connection:", err);
                res.status(500).json({ error: "Database connection failed" });
            });
    });
    
    

    app.listen(4040, () => {

        console.log("Server running on port  http://localhost:4040");

      });
      
