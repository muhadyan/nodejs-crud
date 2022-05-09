const express = require("express");
const multer = require("multer");
const handleBook = require("../handler/book");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/api/books", handleBook.handleGetBooks);
router.get("/api/book/:no", handleBook.handleGetBookByNo);
router.post("/api/book", handleBook.handlePostBooks);
router.patch("/api/book/:no", handleBook.handleUpdateBook);
router.delete("/api/book/:no", handleBook.handleDeleteBook);
router.post("/api/books-excel", upload.single("excel"), handleBook.handlePostBooksExcel);

module.exports = router;
