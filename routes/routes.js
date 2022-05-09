const express = require("express");
const multer = require("multer");
const handle = require("../handler/book");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/api/books", handle.GetBooks);
router.get("/api/book/:no", handle.GetBookByNo);
router.post("/api/book", handle.PostBooks);
router.patch("/api/book/:no", handle.UpdateBook);
router.delete("/api/book/:no", handle.DeleteBook);
router.post("/api/books-excel", upload.single("excel"), handle.PostBooksExcel);

module.exports = router;
