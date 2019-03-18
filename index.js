// implement your API here
const express = require("express");
const db = require("./data/db.js");
const server = express();
server.use(express.json());

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." })
      );
  }
});

server.get("/api/users", (req, res) => {});

server.get("/api/:id", (req, res) => {});

server.delete("/api/users/:id", (req, res) => {});

server.put("/api/users/:id", (req, res) => {});

server.listen((port = 5000), () => {
  console.log(`\nListening on ${port}`);
});
