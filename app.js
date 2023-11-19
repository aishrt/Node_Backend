const express = require("express");
const { json } = require("body-parser");
const routes = require("./routes");

let cors = require("cors");

require('dotenv').config();
// const dotenv = require("dotenv");
// dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.REACT_APP_PORT;
app.listen(port, (req, res) => {
  console.log(`Server is listening at http://localhost:${port}`);
});

require("./config/config");
require("./routes/router")(app);

app.use("/", routes);
