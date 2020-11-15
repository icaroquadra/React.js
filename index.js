const express = require("express");

const server = express();
const PORT = 3000;
const HOST = '0.0.0.0';

server.use(express.json());

const users = ["Icaro", "Soren", "Quadra"];


// ================ local midware verify name body params
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Missing body params" });
  }
  return next();
}

// ================ local midware verify users index
function checkUserInArray(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User dosn't exists" });
  }
  return next();
}

// ================ midware to aways exec
server.use((req, res, next) => {
  console.log(`Method ${req.method}; URL: ${req.url}`);

  return next();
});

// ================ List all users
server.get("/users/:index", (req, res) => {
  return res.json(users);
});

// ================ List one user
server.get("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

// ================ add user
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// ================ change user
server.put("/users/:index", checkUserExists, checkUserInArray,(req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// ================ delete user
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(PORT, HOST);
