const express = require("express");
const { dbConnect } = require("./config/db");
const Router = require("./routes/routes");
const app = express();
const port = 3000;

app.use(express.json());
app.use(Router)
dbConnect();

// Listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
