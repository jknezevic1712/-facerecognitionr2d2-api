const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "122",
      name: "Annie",
      email: "annie@gmail.com",
      password: "mangos",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  //   Load hash from your password DB.
  //   bcrypt.compare(
  //     "apples",
  //     "$2a$10$.WRFtB8uR6hR5HxTzQYbVOsH36K66AM8.6Dd9id70Zb70ZNl0/X/2",
  //     function (err, res) {
  //       console.log("First guess", res);
  //     }
  //   );

  //   bcrypt.compare(
  //     "veggies",
  //     "$2a$10$.WRFtB8uR6hR5HxTzQYbVOsH36K66AM8.6Dd9id70Zb70ZNl0/X/2",
  //     function (err, res) {
  //       console.log("Second guess", res);
  //     }
  //   );

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  //   bcrypt.hash(password, null, null, function (err, hash) {
  //     console.log(hash);
  //   });

  database.users.push({
    id: "125",
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    return res.status(400).json("User not found!");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    return res.status(400).json("User not found!");
  }
});

app.listen(3001, () => {
  console.log("App is running on port 3001");
});

/* 
! Server planning
? / --> res = this is working
? /signin --> POST = succes/fail 
? /register --> POST = user
? /profile/:userId --> GET = user
? /image --> PUT --> user
*/
