const express = require("express");
const handleBook = require("../handler/book");
const router = express.Router();

router.get("/api/books", handleBook.handleGetBooks);
router.get("/api/book/:no", handleBook.handleGetBookByNo);
router.post("/api/book", handleBook.handlePostBooks);
router.patch("/api/book/:no", handleBook.handleUpdateBook);
router.delete("/api/book/:no", handleBook.handleDeleteBook);

module.exports = router;
