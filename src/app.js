const express = require("express");
const app = express();
const { errors } = require("celebrate");
const cors = require("cors");
const Routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(Routes);
app.use(errors());

module.exports = app;
