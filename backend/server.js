const connect = require("./connectDb.js");
const express = require("express");
const cors = require("cors");
const posts = require("./postRoute.js");
const users = require("./userRoute.js");

const app = express();
const PORT = 3000;

// app.use(cors()) - This middleware enables CORS (Cross-Origin Resource Sharing)
// in our server. It allows requests from a different origin (domain, protocol, or port)
// than our server. This is needed because React is running on a different port than
// our Express server. See https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

// app.use(express.json()) - This middleware parses incoming requests with JSON
// payloads and is based on the body-parser library. It populates the req.body
// property with the parsed data. See https://expressjs.com/en/api.html#req.body
app.use(express.json());

app.use(posts);
app.use(users);
// The app.listen() function starts the Express.js server and begins listening
// for incoming requests. It takes an optional argument, the port number, which
// defaults to 3000 if not provided. The callback function is called after the
// server is successfully started. See https://expressjs.com/en/api.html#app.listen
app.listen(PORT, () => {
  connect.connectToServer();
  console.log(`Server is running on port ${PORT}`);
});
