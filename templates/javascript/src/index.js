const express = require("express");
const expressSession = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv-safe").config();
require("./config/db");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log("server started at localhost:4000");
});
