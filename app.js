require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { join } = require("node:path");
const app = express();
const messagesRouter = require("./routes/messagesRouter.js");

app.use(helmet());
app.use(morgan("dev"));
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use("/", messagesRouter);

app.use((req, res, next) => {
  res.status(404).render("pages/404", { title: "Page Not Found" });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send("Something went wrong");
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Express app listening on port ${PORT}`);
});
