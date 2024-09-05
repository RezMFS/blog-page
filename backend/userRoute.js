const express = require("express");
const database = require("./connectDb");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let userRoute = express.Router();

// Read (Retrieve All)
userRoute.route("/users").get(async (request, response) => {
  let db = database.getDb();

  let data = await db.collection("users").find({}).toArray();

  if (data.length > 0) {
    response.status(200).json(data);
  } else {
    throw new Error("Data was not found");
  }
});

// Read (Retrieve Single)
userRoute.route("/users/:id").get(async (request, response) => {
  let db = database.getDb();

  let data = await db
    .collection("users")
    .findOne({ _id: new ObjectId(request.params.id) });

  if (data && Object.keys(data).length > 0) {
    response.status(200).json(data);
  } else {
    throw new Error("Data was not found");
  }
});

// Create (Create One)
userRoute.route("/users").post(async (request, response) => {
  let db = database.getDb();

  const hash = await bcrypt.hash(request.body.password, saltRounds);

  const usedEmail = await db
    .collection("users")
    .findOne({ email: request.body.email });

  if (usedEmail) {
    throw new Error("Email already exists");
  } else {
    let mongoObject = {
      name: request.body.name,
      email: request.body.email,
      password: hash,
      joinDate: new Date(),
      posts: [],
    };

    let data = await db.collection("users").insertOne(mongoObject);

    response.status(200).json(data);
  }
});

// Update
userRoute.route("/users/:id").put(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      joinDate: request.body.joinDate,
      posts: request.body.posts,
    },
  };

  let data = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.status(200).json(data);
});

// Delete
userRoute.route("/users/:id").delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(request.params.id) });

  response.status(200).json(data);
});

// Login
userRoute.route("/users/login").post(async (request, response) => {
  let db = database.getDb();

  const user = await db.collection("users").findOne({
    email: request.body.email,
  });

  if (user) {
    let confirmation = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (confirmation) {
      const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: "1h" });
      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: "Incorrect password" });
    }
  } else {
    response.json({ success: false, message: "User not found" });
  }
});

module.exports = userRoute;
