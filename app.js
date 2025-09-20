const { dirname, join } = require("node:path");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const indexRouter = require("./routes/indexRouter.js");
const messageRouter = require("./routes/messageRouter.js");

const PORT = 8888;
const assetsPath = join(__dirname, "public");
const app = express();

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use("/", indexRouter);
app.use("/message", messageRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
