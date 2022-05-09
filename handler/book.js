const queryBook = require("../repository/book");
const xlsx = require("xlsx");
const postExcel = require("../service/book");

const handleGetBooks = (req, res) => {
  try {
    queryBook.queryGetBooks(res);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const handleGetBookByNo = (req, res) => {
  const no = req.params.no;

  try {
    queryBook.queryGetBookByNo(res, no);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const handlePostBooks = (req, res) => {
  const body = req.body;

  try {
    queryBook.queryPostBook(res, body);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const handlePostBooksExcel = (req, res) => {
  const buf = req.file.buffer;
  const workbook = xlsx.read(buf).Sheets.Sheet1;

  try {
    postExcel(res, workbook)
    return res.status(200).json("Success");
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const handleUpdateBook = (req, res) => {
  const no = req.params.no;
  const book = req.body.book;

  try {
    queryBook.queryUpdateBook(res, no, book);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const handleDeleteBook = (req, res) => {
  const no = req.params.no;

  try {
    queryBook.queryDeleteBook(res, no);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

module.exports = {
  handleGetBooks,
  handleGetBookByNo,
  handlePostBooks,
  handlePostBooksExcel,
  handleUpdateBook,
  handleDeleteBook,
};
