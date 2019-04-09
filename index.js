const express = require("express");
const bodyParser = require("body-parser");
const state = require("./state");

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());

let lastId = state.users[state.users.length - 1]._id;

app.get("/users", (req, res) => res.send(state.users));

// app.get("/users/1", (req, res) => res.send(state.users[0]));

app.get("/users/:userId", (req, res) => {
  const reqUser = state.users.find(user => user._id == req.params.userId);
  if (reqUser) {
    res.send(reqUser);
  } else {
    res.send("not a valid userId");
  }
});

// app.post("/users", (req, res) => {
//   state.users.push({ name: "Fox Mulder" });
//   res.json(state.users[state.users.length - 1]);
// });

app.post("/users", (req, res) => {
  const newUser = req.body;
  lastId++;
  newUser._id = lastId;
  state.users.push(newUser);
  res.json(newUser);
});

// app.put("/users/1", (req, res) => {
//   state.users[0].occupation = "web developer";
//   res.json(state.users[0]);
// });

app.put("/users/:userId", (req, res) => {
  const userIndex = state.users.findIndex(
    user => user._id == req.params.userId
  );
  if (userIndex > -1) {
    state.users[userIndex].occupation = "web developer";
    res.json(state.users[userIndex]);
  } else {
    res.send("not a valid userId");
  }
});

// app.delete("/users/1", (req, res) => {
//   state.users.shift();
//   res.send("deleted");
// });

app.delete("/users/:userId", (req, res) => {
  const userIndex = state.users.findIndex(
    user => user._id == req.params.userId
  );
  if (userIndex > -1) {
    state.users[userIndex].isActive = false;
    res.send("deleted");
  } else {
    res.send("not a valid userId");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
