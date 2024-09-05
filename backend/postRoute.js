const express = require("express");
const database = require("./connectDb");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let postRoute = express.Router();

// Read (Retrieve All)
postRoute.route("/posts").get(verifyToken, async (request, response) => {
  let db = database.getDb();

  let data = await db.collection("posts").find({}).toArray();

  if (data.length > 0) {
    response.status(200).json(data);
  } else {
    throw new Error("Data was not found");
  }
});

// Read (Retrieve Single)
postRoute.route("/posts/:id").get(verifyToken, async (request, response) => {
  let db = database.getDb();

  let data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(request.params.id) });

  if (data && Object.keys(data).length > 0) {
    response.status(200).json(data);
  } else {
    throw new Error("Data was not found");
  }
});

// Create (Create One)
postRoute.route("/posts").post(verifyToken, async (request, response) => {
  let db = database.getDb();

  let mongoObject = {
    title: request.body.title, // Post title
    description: request.body.description, // Post description
    content: request.body.content, // Post content
    author: request.body.user._id, // Author of the post
    dateCreated: request.body.dateCreated, // Date the post was created
  };

  let data = await db.collection("posts").insertOne(mongoObject);

  response.status(200).json(data);
});

// Update
postRoute.route("/posts/:id").put(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      title: request.body.title,
      description: request.body.description,
      content: request.body.content,
      author: request.body.author,
      dateCreated: request.body.dateCreated,
    },
  };

  let data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.status(200).json(data);
});

// Delete
postRoute.route("/posts/:id").delete(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(request.params.id) });

  response.status(200).json(data);
});

function verifyToken(request, response, next) {
  const authHeaders = request.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    return response
      .status(401)
      .json({ message: "Authentication token is missing" });
  }

  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
      return response.status(403).json({ message: "Invalid Token" });
    }

    request.body.user = user;
    next();
  });
}
module.exports = postRoute;
