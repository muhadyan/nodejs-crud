const { connection } = require("../config/db");

function queryGetBooks(res, username) {
  connection.query(
    "SELECT * FROM books WHERE create_by = ?",
    [username],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json(results);
    }
  );
}

function queryGetBookByNo(res, no, username) {
  connection.query(
    "SELECT * FROM books WHERE no = ? AND create_by = ?",
    [no, username],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json(results);
    }
  );
}

function queryPostBook(res, body, username) {
  connection.query(
    "INSERT INTO books (no, book, author, create_by) VALUES (?, ?, ?, ?)",
    [body.no, body.book, body.author, username],
    (err, results) => {
      if (err) {
        console.log("Error while inserting a book into database", err);
        return res.status(400).send();
      }
      return res.status(200).json("Input data success");
    }
  );
}

function queryPostExcel(res, resArr) {
  connection.query(
    "INSERT INTO books (no, book, author, create_by) VALUES ?",
    [resArr],
    (err, results) => {
      if (err) {
        console.log("Error while inserting a book into database", err);
        return res.status(400).send();
      }
      return res
        .status(200)
        .json("Number of record inserted: " + results.affectedRows);
    }
  );
}

function queryUpdateBook(res, no, book, username) {
  connection.query(
    "UPDATE books SET book = ? WHERE no = ? AND create_by = ?",
    [book, no, username],
    (err, results) => {
      if (err) {
        console.log("Error while inserting a book into database", err);
        return res.status(400).send();
      }
      if (results.affectedRows === 0) {
        return res.status(404).send({ message: "invalid number" });
      }
      return res.status(200).send({ message: "book updated successfully" });
    }
  );
}

function queryDeleteBook(res, no, username) {
  connection.query(
    "DELETE FROM books WHERE no = ? AND create_by = ?",
    [no, username],
    (err, results) => {
      if (err) {
        console.log("Error while inserting a book into database", err);
        return res.status(400).send();
      }
      if (results.affectedRows === 0) {
        return res.status(404).send({ message: "invalid number" });
      }
      return res.status(200).send({ message: "book deleted successfully" });
    }
  );
}

module.exports = {
  queryGetBooks,
  queryGetBookByNo,
  queryPostBook,
  queryPostExcel,
  queryUpdateBook,
  queryDeleteBook,
};
