const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const repository = require("../repository/user");
require("dotenv").config({ path: process.cwd() + "/config/.env" });

function CreateUser(username, password, res) {
  repository.validateUsername(username, res, function (resUsername) {
    if (resUsername[0] !== undefined) {
      return res.status(400).json("User already exist");
    } else {
      cryptPassword(password, (err, hash) => {
        if (err) {
          res.send(err);
        }
        repository.inputUser(username, hash, res);
      });
    }
  });
}

function LoginUser(username, password, res) {
  repository.validateUsername(username, res, function (resUser) {
    if (resUser[0] === undefined) {
      return res.status(404).json("User not found");
    } else {
      comparePassword(password, resUser[0].password, (err) => {
        if (err) {
          console.log(err);
          res.status(404).json("Password does not match");
        }
        const token = generateAccessToken({ username: username});
        resToken = {
          "token": token
        }
        res.json(resToken);
      });
    }
  });
}

const cryptPassword = function (password, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return callback(err);

    bcrypt.hash(password, salt, function (err, hash) {
      return callback(err, hash);
    });
  });
};

const comparePassword = function (plainPass, hashword, callback) {
  bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
    return err == null ? callback(null, isPasswordMatch) : callback(err);
  });
};

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "48h" });
}

module.exports = {
  CreateUser,
  LoginUser,
};
