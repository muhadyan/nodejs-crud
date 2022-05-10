const { connection } = require("../db-config/db");

function queryGetBooks(res) {
  connection.query("SELECT * FROM books", (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).send();
    }
    res.status(200).json(results);
  });
}

function queryGetBookByNo(res, no) {
  connection.query(
    "SELECT * FROM books WHERE no = ?",
    [no],
    (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json(results);
    }
  );
}

function queryPostBook(res, body) {
  connection.query(
    "INSERT INTO books (no, book, author, create_by) VALUES (?, ?, ?, ?)",
    [body.no, body.book, body.author, body.createby],
    (err, results, fields) => {
      if (err) {
        console.log("Error while inserting a book into database", err);
        return res.status(400).send();
      }
      return res.status(200).json(results);
    }
  );
}

function queryPostExcel(res, resArr) {
  connection.query(
    "INSERT INTO books (no, book, author) VALUES ?",
    [resArr],
    (err, results, fields) => {
      if (err) {
        console.log("Error while inserting a book into database", err);
        return res.status(400).send();
      }
      return res.status(200).json("Success");
    }
  );
}

function queryUpdateBook(res, no, book) {
  connection.query(
    "UPDATE books SET book = ? WHERE no = ?",
    [book, no],
    (err, results, fields) => {
      if (err) {
        console.log("Error while inserting a book into database", err);
        return res.status(400).send();
      }
      return res.status(200).json(results);
    }
  );
}

function queryDeleteBook(res, no) {
  connection.query(
    "DELETE FROM books WHERE no = ?",
    [no],
    (err, results, fields) => {
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
