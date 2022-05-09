const repository = require("../repository/book");
const xlsx = require("xlsx");
const postExcel = require("../service/book");

const GetBooks = (req, res) => {
  try {
    repository.queryGetBooks(res);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const GetBookByNo = (req, res) => {
  const no = req.params.no;

  try {
    repository.queryGetBookByNo(res, no);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const PostBooks = (req, res) => {
  const body = req.body;

  try {
    repository.queryPostBook(res, body);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const PostBooksExcel = (req, res) => {
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

const UpdateBook = (req, res) => {
  const no = req.params.no;
  const book = req.body.book;

  try {
    repository.queryUpdateBook(res, no, book);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const DeleteBook = (req, res) => {
  const no = req.params.no;

  try {
    repository.queryDeleteBook(res, no);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

module.exports = {
  GetBooks,
  GetBookByNo,
  PostBooks,
  PostBooksExcel,
  UpdateBook,
  DeleteBook,
};
