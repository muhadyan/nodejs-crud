const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const handleBook = require("../handler/book");
const router = express.Router();

router.get("/api/books", handleBook.handleGetBooks);
router.get("/api/book/:no", handleBook.handleGetBookByNo);
router.post("/api/book", handleBook.handlePostBooks);
router.patch("/api/book/:no", handleBook.handleUpdateBook);
router.delete("/api/book/:no", handleBook.handleDeleteBook);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/api/books-excel", upload.single("excel"), (req, res) => {
  const buf = req.file.buffer;
  const workbook = xlsx.read(buf).Sheets.Sheet1;

  for (let i = 2; i > 0; i++) {
    A = `A${i}`;
    B = `B${i}`;
    C = `C${i}`;
    const no = workbook[A];
    const book = workbook[B];
    const author = workbook[C];
    if (no === undefined) {
      break;
    } else {
      console.log(no.v);
      console.log(book.v);
      console.log(author.v);
    }
  }

  res.send("success");
});

module.exports = router;
