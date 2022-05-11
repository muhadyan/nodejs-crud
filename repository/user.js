const { connection } = require("../config/db");

function validateUsername(username, res, resUsername) {
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      resUsername(results);
    }
  );
}

function inputUser(username, password, res) {
  connection.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json("Input user success");
    }
  );
}

module.exports = {
  validateUsername,
  inputUser,
};
