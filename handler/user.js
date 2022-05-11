const serviceUser = require("../service/user");

const SignUp = (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    serviceUser.CreateUser(username, password, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const LogIn = (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    serviceUser.LoginUser(username, password, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

module.exports = {
  SignUp,
  LogIn,
};
