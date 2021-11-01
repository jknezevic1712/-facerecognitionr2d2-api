const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

/*
 * Controllers
 */
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "test123",
    database: "smart-r2d2",
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1 style='text-align: center'>Sucess!<h1>");
});
// app.post("/signin", (req, res) => {
//   signin.handleSignin(req, res, db, bcrypt);
// });
/* 
! Different way of doing routes
*/
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

/*
 * SERVER LISTEN
 */
app.listen(process.env.PORT || 3001, () => {
  console.log(`App is running on port 3001 ${process.env.PORT}`);
});
