//Import needed packages
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

//GET ROUTES
const home = (req, res) => {
  const user = req.session.user;
  res.render("home", { user });
};
const register = (req, res) => {
  res.render("register");
};
const notLoggedIn = (req, res) => {
  res.render("notLoggedIn");
};
const logOut = (req, res) => {
  //Destroying sessions when user wants to log out
  req.session.destroy();
  res.render("register");
};
const debt = async (req, res) => {
  //Getting user's debt
  const userId = req.session.userId;
  const user = await User.findById(userId); // get user information from database
  const debt = user.debt;
  res.json({ debt }); // return debt amount as JSON data
};

//POST ROUTES
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
  //Setting OPENAI API-key
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
//Creating new prompt
const runPrompt = async (prompt) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Fix the spelling and grammer misstakes of the following text: ${prompt}`,
      max_tokens: 500,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const fixer = async (req, res) => {
  const response = await runPrompt(req.body.prompt);
  try {
    const user = await User.findById(req.session.userId);
    const words = req.body.prompt.split(" ");
    user.wordCount += words.length;
    user.debt += words.length * 2;
    await user.save();
  } catch (error) {
    console.log(error);
  }
  res.send(response);
};

const User = require("./User.js");
const { registerValidation } = require("./validation");
const signUp = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if there is a account with this email
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email aldready exist!");

  //Encypting user's password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //Create a account
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    wordCount: 0,
    debt: 0,
  });
  try {
    const savedUser = await user.save();
    //Session implementing
    req.session.userId = user._id;
    res.render("home", { user });
  } catch (error) {
    res.status(404).send(error);
  }
};

const { loginValidation } = require("./validation");
const signIn = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong!");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send("Email or password is incorrect!");

  req.session.userId = user._id;
  res.render("home", { user });
};

const updateUserMiddleware = async (req, res, next) => {
  try {
    // Check if user is logged in
    const userID = req.session.userId;
    if (!userID) {
      return res.redirect("/notLoggedIn");
    }

    // Update user information and set in session
    const user = await User.findById(req.session.userId);
    req.session.user = user;

    //Check if user has a premium account
    if (!user.premium) {
      return res.send("You have no premium account!");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//Exporting functions
module.exports = {
  home: home,
  register: register,
  notLoggedIn: notLoggedIn,
  logOut: logOut,
  debt: debt,
  fixer: fixer,
  signUp: signUp,
  signIn: signIn,
  updateUserMiddleware: updateUserMiddleware,
};
