//Import necessary packages
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
const routes = require("./routes");

// Set the view engine to "ejs" for rendering dynamic views
app.set("view engine", "ejs");
// Middleware to parse incoming request bodies as urlencoded data
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware to handle user sessions
app.use(
  session({
    secret: "putYourOwnSecret",
    resave: false,
    saveUninitialized: false,
  })
);
// Middleware to serve static files from the "public" directory
app.use(express.static("public"));
// Load environment variables from the ".env" file
dotenv.config();

//Connecting to the database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//GET routes
app.get("/register", routes.register);
app.get("/home", routes.updateUserMiddleware, routes.home);
app.get("/notLoggedIn", routes.notLoggedIn);
app.get("/logOut", routes.logOut);
app.get("/debt", routes.debt);
app.get("/test", (req, res) => {
  res.send(req.session);
});

//POST routes
app.post("/fixer", routes.updateUserMiddleware, routes.fixer);
app.post("/register", routes.signUp);
app.post("/login", routes.signIn);

//Server
app.listen(process.env.PORT || 3000);
