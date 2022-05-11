const express = require("express");
const multer = require("multer");
const handle = require("../handler/book");
const handleUser = require("../handler/user");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/api/signup", handleUser.SignUp);
router.post("/api/login", handleUser.LogIn);

router.get("/api/books", authenticateToken, handle.GetBooks);
router.get("/api/book/:no", authenticateToken, handle.GetBookByNo);
router.post("/api/book", authenticateToken, handle.PostBooks);
router.patch("/api/book/:no", authenticateToken, handle.UpdateBook);
router.delete("/api/book/:no", authenticateToken, handle.DeleteBook);
router.post("/api/books-excel", authenticateToken, upload.single("excel"), handle.PostBooksExcel);

module.exports = router;
