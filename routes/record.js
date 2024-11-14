import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
const router = express.Router();

// This section will help you get a list of all the to-do.

router.get("/to-do/", async (req, res) =>{
    let collection = await db.collection("to-do-collection");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// This section will help you get a single to-do by id
router.get("/to-do/:id", async (req,res) => {
    let collection = await db.collection("to-do-collection");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if(!result) res.send("Not found").status(405);
    else res.send(result).status(200);
});


// This section will help you create a new to-do
router.post("/to-do/", async (req, res) => {
  try {
    let newDocument = {
        title : req.body.title,
        completed : req.body.completed,
        description : req.body.description   
    };

    let collection = await db.collection("to-do-collection");
    let result = await collection.insertOne(newDocument);

    // Send a response with the result of the insert operation
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding to-do");
  }
});


// This section will help you update a to-do by id.
router.patch("/to-do/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                title : req.body.title,
                completed : req.body.completed,
                description : req.body.description   
            },
        };

        let collection = await db.collection("to-do-collection");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating to-do");
    }
});

// This section will help you delete a to-do
router.delete("/to-do/:id", async (req,res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("to-do-collection");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting to-do");
    }
});

export default router;
