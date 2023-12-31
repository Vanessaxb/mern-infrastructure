const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//create new user in the database
async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);

    //create new token
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code
    // 400 = Bad Request
    console.log(err);
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    //find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();

    //comparing password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();

    //create new tokem
    const token = createJWT(user);
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}

/*-- Helper Functions  to create jwt token--*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" } // token will expire in 24h
  );
}

module.exports = { create, login, checkToken };
