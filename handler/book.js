const repository = require("../repository/book");
const xlsx = require("xlsx");
const jwt = require("jsonwebtoken");
const postExcel = require("../service/book");

function tokenData(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  return decoded;
}

const GetBooks = (req, res) => {
  const decoded = tokenData(req)

  try {
    repository.queryGetBooks(res, decoded.username);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const GetBookByNo = (req, res) => {
  const no = req.params.no;
  const decoded = tokenData(req)

  try {
    repository.queryGetBookByNo(res, no, decoded.username);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const PostBooks = (req, res) => {
  const body = req.body;
  const decoded = tokenData(req);

  try {
    repository.queryPostBook(res, body, decoded.username);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const PostBooksExcel = (req, res) => {
  const buf = req.file.buffer;
  const workbook = xlsx.read(buf).Sheets.Sheet1;
  const decoded = tokenData(req);

  try {
    postExcel(res, workbook, decoded.username);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const UpdateBook = (req, res) => {
  const no = req.params.no;
  const book = req.body.book;
  const decoded = tokenData(req)

  try {
    repository.queryUpdateBook(res, no, book, decoded.username);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const DeleteBook = (req, res) => {
  const no = req.params.no;
  const decoded = tokenData(req)

  try {
    repository.queryDeleteBook(res, no, decoded.username);
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
