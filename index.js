// implement your API here
const express = require("express");
const db = require("./data/db.js");
const server = express();
server.use(express.json());
server.use(cors());

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(req.body)
      .then(user => {
        res.status(201).json(req.body);
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." })
      );
  }
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

server.get("/api/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).end();
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be removed" })
    );
});

server.put("/api/users/:id", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    const { id } = req.params;
    db.update(id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(req.body);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The user information could not be modified." })
      );
  }
});

server.listen((port = 5000), () => {
  console.log(`\nListening on ${port}`);
});
