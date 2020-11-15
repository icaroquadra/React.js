const express = require("express");

const server = express();

const users = ["Icaro", "Soren", "Quadra"];

// ================ first route to say Hello World
server.get("/hello", (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello: ${nome}` });
});

// ================ route to return params
server.get("/user/:id", (req, res) => {
  const { id } = req.params;

  return res.json({ message: `search user ${id}` });
});

// ================ route to return by params
server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.listen(30000);
